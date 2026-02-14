'use client'
import AuthGuard from "@/app/(auth)/_components/AuthGuard";
import { LogoAuth } from "@/app/(auth)/_components/LogoAuth";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard>
      <div className="min-h-screen w-full bg-white flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <LogoAuth />
            <div className="mb-4" />
            {children}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

export default Layout; 
