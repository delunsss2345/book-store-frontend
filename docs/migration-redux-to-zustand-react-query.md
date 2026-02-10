# Migration Redux Toolkit -> Zustand + TanStack Query (cho `book-store-fe-nest`)

## Muc tieu
- Loai bo Redux Toolkit + redux-persist de giam do phuc tap.
- Tach ro:
  - `TanStack Query`: quan ly server state (books, auth API calls, cache, loading, retry).
  - `Zustand`: quan ly client state nho gon (user, access token, flags UI).
- Giam bug runtime va giam coupling giua state + side effects.

## Hien trang (bug/van de dang co trong code)
1. Runtime crash khi destructuring sai:
   - `pages/Login.tsx`: `const { authLoading } = useAppSelector(selectAuthLoading)`
   - `app/(auth)/register/page.tsx`: tuong tu.
   - `selectAuthLoading` tra ve `boolean`, khong phai object.
2. Side effect trong reducer:
   - `features/auth/slice.ts` dang `localStorage.setItem(...)` trong `login.fulfilled`.
   - Reducer nen pure function.
3. Token flow khong nhat quan:
   - `app/api/auth/login/route.ts` set `refreshToken` vao cookie.
   - `utils/http.ts` lai doc `refreshToken` tu `localStorage`.
   - Ket qua: refresh logic de huong den fail.
4. Selector khong pure:
   - `features/auth/selector.ts` doc `localStorage` trong selector (`selectIsAuthenticated`).
5. Mat type-safety:
   - `store/index.ts` + `persistReducer` lam type suy giam, de lot loi nhu muc (1) ma TypeScript khong canh bao.
6. Error typing khong dung:
   - `features/book/slice.ts`: `rejectWithValue({ message: ... })` nhung reducer cast `action.payload as string`.
7. Nuot mat thong tin loi:
   - `utils/http.ts`: `catch` roi `throw new Error(String(error))`, lam mat `status`, `response.data`.
8. Dang ton tai 2 co che auth song song:
   - custom auth API + NextAuth Google (`components/auth/LoginWithGoogle.tsx`).
   - Chua co quy uoc "single source of truth" cho session.

## Kien truc muc tieu (gon + it bug)
- Server state:
  - `books`, `book by id`, `login/register mutation state`, `profile query`.
  - Quan ly boi TanStack Query.
- Client state:
  - `user`, `accessToken`, `isHydrated`, cac UI flags nho.
  - Quan ly boi Zustand.
- HTTP layer:
  - 1 axios instance.
  - Request interceptor lay token tu Zustand store.
  - 401 -> goi `/api/auth/refresh` (cookie HttpOnly) -> cap nhat token -> retry request.

## Chia thu muc theo `features` (khuyen nghi)
Dung, thay du dung: du Redux, Zustand hay React Query thi van nen chia theo feature de de scale.

Nguyen tac:
- Moi feature tu chua:
  - API cua no.
  - Query/mutation hooks cua no.
  - Client store cua no (neu can).
  - Component dung rieng cho no.
  - Types/mapper cua no.
- `shared`/`lib` chi chua thu dung chung toan app (http client, query keys global, utils).

Cau truc de xuat:
```text
app/
components/
lib/
  http/
    axios.ts
features/
  auth/
    api/
      auth.api.ts
    hooks/
      use-login-mutation.ts
      use-register-mutation.ts
      use-current-user-query.ts
    store/
      auth.store.ts
    components/
      auth-guard.tsx
    types/
      auth.types.ts
    index.ts
  book/
    api/
      book.api.ts
    hooks/
      use-books-query.ts
      use-book-by-id-query.ts
    components/
      book-card.tsx
    types/
      book.types.ts
    index.ts
```

Ghi chu:
- Neu feature khong can client state rieng, co the khong tao `store/`.
- File `index.ts` dung de export public API cho feature (tranh import loang xoang).

---

## Lo trinh migration chi tiet (lam theo tung PR de an toan)

## B1. Cai dat package moi (chua xoa Redux ngay)
```bash
npm i @tanstack/react-query @tanstack/react-query-devtools zustand
```

Chua xoa Redux o buoc nay de migration feature-by-feature.

## B2. Tao Query Client + cap nhat `app/providers.tsx`
### Tao file `lib/query-client.ts`
```ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      retry: 0,
    },
  },
});
```

### Sua `app/providers.tsx`
- Bo `ReduxProvider`.
- Them `QueryClientProvider`.
- (Tuỳ chon) them `ReactQueryDevtools` o dev mode.

Mau:
```tsx
"use client";

import i18n from "@/i18n";
import { queryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { I18nextProvider } from "react-i18next";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster position="bottom-center" />
          {children}
          {process.env.NODE_ENV === "development" ? <ReactQueryDevtools /> : null}
        </QueryClientProvider>
      </SessionProvider>
    </I18nextProvider>
  );
}
```

## B3. Tao Zustand store cho auth (`features/auth/store/auth.store.ts`)
```ts
import type { UserLoginResponse } from "@/types/response/auth.response";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthStore = {
  user: UserLoginResponse | null;
  accessToken: string | null;
  isHydrated: boolean;
  setSession: (payload: { user: UserLoginResponse; accessToken: string }) => void;
  clearSession: () => void;
  setHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isHydrated: false,
      setSession: ({ user, accessToken }) => set({ user, accessToken }),
      clearSession: () => set({ user: null, accessToken: null }),
      setHydrated: (value) => set({ isHydrated: value }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, accessToken: state.accessToken }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
```

## B4. Refactor HTTP client (`utils/http.ts`)
Muc tieu:
1. Khong doc `refreshToken` tu `localStorage` nua.
2. Khong throw mat thong tin axios error.
3. Lay `accessToken` tu Zustand store.

Huong:
- Request interceptor:
  - `const accessToken = useAuthStore.getState().accessToken`
- Refresh:
  - Goi `POST /api/auth/refresh` (cookie HttpOnly).
- Error:
  - `if (axios.isAxiosError(error)) throw error;`

Goi y bat buoc:
- Khong set/get `refreshToken` o client nua.
- Neu refresh fail: `useAuthStore.getState().clearSession()`.

## B5. Migrate feature Books sang TanStack Query
### Tao `lib/query-keys.ts`
```ts
export const queryKeys = {
  books: ["books"] as const,
  bookById: (id: number) => ["books", id] as const,
};
```

### Tao hooks query
`features/book/hooks/use-books-query.ts` va `features/book/hooks/use-book-by-id-query.ts`
```ts
import { queryKeys } from "@/lib/query-keys";
import { bookApi } from "@/services/bookService";
import { useQuery } from "@tanstack/react-query";

export const useBooksQuery = () =>
  useQuery({
    queryKey: queryKeys.books,
    queryFn: () => bookApi.getBooks(),
    select: (res) => res.data,
  });

export const useBookByIdQuery = (id: number) =>
  useQuery({
    queryKey: queryKeys.bookById(id),
    queryFn: () => bookApi.getBookById(id),
    select: (res) => res.data,
    enabled: Number.isFinite(id) && id > 0,
  });
```

### Sua `pages/Home.tsx`
- Bo `dispatch(fetchBooks())`.
- Dung `const { data: books = [], isLoading } = useBooksQuery()`.

Sau khi chay on, xoa:
- `features/book/slice.ts`
- `features/book/selector.ts`
- `features/book/index.ts`

## B6. Migrate feature Auth sang React Query + Zustand
### Tao auth mutations
`features/auth/hooks/use-login-mutation.ts` (tuong tu cho register)
```ts
import { authApi } from "@/services/authService";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (res) => {
      setSession({
        user: res.data.user,
        accessToken: res.data.accessToken,
      });
    },
  });
};

export const useRegisterMutation = () =>
  useMutation({
    mutationFn: authApi.register,
  });
```

### Sua `pages/Login.tsx`
- Dung `useLoginMutation`.
- `isLoading` = `loginMutation.isPending`.
- Bo het `dispatch`.

### Sua `app/(auth)/register/page.tsx`
- Dung `useRegisterMutation`.
- `isLoading` = `registerMutation.isPending`.
- Bo het `dispatch`.

### Sua cac cho doc user
- `pages/ProfilePage.tsx`, `components/auth/AuthGuard.tsx`:
  - thay `useAppSelector(selectCurrentUser)` bang `useAuthStore((s) => s.user)`.

### Tao public exports cho feature auth/book
Vi du `features/auth/index.ts`:
```ts
export * from "./hooks/use-login-mutation";
export * from "./hooks/use-register-mutation";
export * from "./store/auth.store";
```

Vi du `features/book/index.ts`:
```ts
export * from "./hooks/use-books-query";
export * from "./hooks/use-book-by-id-query";
```

## B7. Dinh nghia ro auth boundary voi NextAuth
Hien tai co Google OAuth qua NextAuth va login thuong qua custom API.

Nen chot 1 trong 2 huong:
1. Giu NextAuth cho Google-only, custom auth cho email/password (de xong nhanh).
2. Hop nhat het vao NextAuth (dai han, sach hon nhung ton cong).

De migration nhanh: chon huong (1), nhung bat buoc:
- Viet adapter map `session.user` vao `useAuthStore` khi login Google.
- `signOut` phai clear Zustand session.

## B8. Go bo Redux Toolkit sau khi da migrate xong
Xoa files:
- `store/index.ts`
- `store/hooks.ts`
- cac file Redux cu trong feature:
  - `features/auth/slice.ts`
  - `features/auth/selector.ts`
  - `features/book/slice.ts`
  - `features/book/selector.ts`

Sua import toan project:
- Tim `@/store`, `@/features/auth`, `@/features/book` va thay sang hooks/query/store moi.

Xoa package:
```bash
npm remove @reduxjs/toolkit react-redux redux-persist
```

## B9. Kiem thu sau migration
Checklist toi thieu:
1. Login email/password thanh cong, reload trang van giu user.
2. Register thanh cong, toast + redirect dung.
3. Danh sach books load duoc, co cache (vao/ra page khong refetch lien tuc).
4. Neu access token het han:
   - request dau tien 401,
   - refresh duoc qua cookie,
   - request retry thanh cong.
5. Logout (neu co):
   - clear Zustand state,
   - clear token phia client,
   - UI quay ve guest state.
6. Google sign-in/sign-out khong conflict voi auth thuong.

---

## Thu tu PR de lam thuc te (de merge an toan)
1. PR1: Them TanStack Query + Provider.
2. PR2: Them Zustand auth store + HTTP refactor.
3. PR3: Migrate Books feature.
4. PR4: Migrate Login/Register/Profile/AuthGuard.
5. PR5: Remove Redux deps + clean imports + dead code.
6. PR6: E2E/manual regression check + cap nhat README.

## Dinh nghia "xong"
- Khong con import `react-redux`, `@reduxjs/toolkit`, `redux-persist`.
- Khong con `dispatch`, `createSlice`, `createAsyncThunk`.
- Server state di qua TanStack Query.
- Client auth state di qua Zustand.
- TypeScript bat loi dung (khong bi mat type nhu hien tai).

## Ghi chu quan trong cho codebase nay
- Truoc khi migrate, fix ngay loi runtime o:
  - `pages/Login.tsx`
  - `app/(auth)/register/page.tsx`
- Neu chua kip migration full, hotfix nhanh:
  - doi `const { authLoading } = ...` thanh `const authLoading = ...`.
- Tranh dat side-effect (`localStorage`, redirect) trong reducer/store callbacks.
