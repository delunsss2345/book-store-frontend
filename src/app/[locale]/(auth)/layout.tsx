"use client";

import AuthGuard from "./_components/AuthGuard";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard>
      <div className="min-h-screen w-full bg-surface">
        {children}
      </div>
    </AuthGuard>
  );
};

export default Layout;
