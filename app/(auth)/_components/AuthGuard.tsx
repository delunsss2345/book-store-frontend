"use client";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { selectorCurrentUser } from "@/features/selector";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type AuthGuardProps = {
    children: React.ReactNode;
};


const AuthGuard = ({ children }: AuthGuardProps) => {
    const currentUser = useAuthStore(selectorCurrentUser);
    const router = useRouter();

    useEffect(() => {
        if (currentUser) {
            router.push('/');
        }
    }, [currentUser, router]);

    if (currentUser) {
        return null;
    }

    return <>{children}</>;
};

export default AuthGuard;
