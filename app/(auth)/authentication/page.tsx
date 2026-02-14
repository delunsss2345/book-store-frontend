"use client";

import AuthenticationForm, {
    type LoginValues,
} from "@/app/(auth)/_components/AuthentiocationForm";
import { useLoginMutation } from "@/features/auth/hooks/use-login-mutation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Authentication() {
    const router = useRouter();
    const loginMutation = useLoginMutation();
    const isLoading = loginMutation.isPending;

    const onSubmit = async (values: LoginValues) => {
        toast.promise(loginMutation.mutateAsync(values), {
            loading: "Đang gửi mã...",
            success: () => {
                router.push(`/verify?email=${encodeURIComponent(values.email)}`);
                return "Đã gửi mã xác thực";
            },
            error: "Gửi mã thất bại",
        });
    };

    return (
        <div>
            <h1 className="text-[21px] font-semibold tracking-tight text-neutral-900">
                Sign in
            </h1>
            <p className="mt-2 text-lg text-neutral-600">
                Sign in or create an account
            </p>

            <button
                type="button"
                className="mt-8 h-14 w-full rounded-xl bg-violet-600 text-[18px] font-semibold text-white hover:bg-violet-700"
            >
                Continue with shop
            </button>

            <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-neutral-200" />
                <span className="text-[14px] text-neutral-500">or</span>
                <div className="h-px flex-1 bg-neutral-200" />
            </div>

            <AuthenticationForm isLoading={isLoading} onSubmit={onSubmit} />

            <p className="mt-6 text-center text-[14px] text-neutral-600">
                Chưa có tài khoản?{" "}
                <Link
                    href="/register"
                    className="font-medium text-neutral-900 underline underline-offset-4"
                >
                    Đăng ký
                </Link>
            </p>
        </div>
    );
}
