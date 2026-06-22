"use client";

import { useQueryMe } from "@/features/auth/hooks/use-query-me";
import { UserResponse } from "@/types/response/auth.response";
import { createContext, useContext, useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { Loader2 } from "lucide-react";

type AuthContextType = {
  user: UserResponse | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, isError } = useQueryMe();
  const router = useRouter();

  const user = data?.data ?? null;

  useEffect(() => {
    if (!isLoading && (isError || !user)) {
      router.push("/login");
    }
  }, [isLoading, isError, user, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-ink-3" />
      </div>
    );
  }

  if (isError || !user) {
    return null; // Prevent rendering children while redirecting
  }

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
