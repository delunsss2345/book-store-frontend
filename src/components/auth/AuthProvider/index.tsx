"use client";

import { useQueryMe } from "@/features/auth/hooks/use-query-me";
import { UserResponse } from "@/types/response/auth.response";
import { createContext, useContext } from "react";

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
  const { data, isLoading } = useQueryMe();
  const user = data?.data ?? null;

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
