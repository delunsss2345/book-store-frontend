"use client";

import { useQueryMe, ME_QUERY_KEY } from "@/features/auth/hooks/use-query-me";
import { UserResponse } from "@/types/response/auth.response";
import { createContext, useContext, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

type AuthContextType = {
  user: UserResponse | null;
  isLoading: boolean;
  setUser: (user: UserResponse | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useQueryMe();
  const queryClient = useQueryClient();
  const user = data?.data ?? null;

  const setUser = useCallback(
    (newUser: UserResponse | null) => {
      if (newUser) {
        queryClient.setQueryData(ME_QUERY_KEY, { data: newUser });
      } else {
        queryClient.setQueryData(ME_QUERY_KEY, null);
      }
    },
    [queryClient]
  );

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
