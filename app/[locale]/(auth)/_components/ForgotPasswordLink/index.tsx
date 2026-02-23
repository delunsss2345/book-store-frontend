import Link from "next/link";

export default function ForgotPasswordLink() {
  return (
    <div className="flex justify-end mt-2">
      <Link
        href="/forgot-password"
        className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
      >
        Quên mật khẩu?
      </Link>
    </div>
  );
}
