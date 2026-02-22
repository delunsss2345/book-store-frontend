"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  useAuthStore,
  useResetPasswordValidateMutation,
} from "@/features/auth";
import { useRouter } from "next/navigation";

export default function VerifyOtpForm() {
  const [otp, setOtp] = useState<string[]>(new Array(5).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: validateOtpMutation } =
    useResetPasswordValidateMutation();
  const setIsResetPassword = useAuthStore((state) => state.setIsResetPassword);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const setIsSendOTP = useAuthStore((state) => state.setIsSendOTP);
  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value.substring(element.value.length - 1);
    setOtp(newOtp);

    if (element.value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const data = e.clipboardData.getData("text").slice(0, 5).split("");
    if (data.length === 5 && data.every((char) => !isNaN(Number(char)))) {
      setOtp(data);
      inputRefs.current[4]?.focus();
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length < 5) {
      toast.error("Vui lòng nhập đầy đủ 5 số");
      return;
    }
    try {
      setIsLoading(true);
      const validateOtp = await validateOtpMutation({ token: otpValue });
      if (validateOtp.valid) {
        toast.success("Xác thực thành công!");
        setIsSendOTP(false);
        setIsResetPassword(true);
        router.push("/reset-password");
      } else {
        toast.error("Xác thực thất bại!");
      }
    } catch (error) {
      toast.error("Xác thực thất bại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Xác thực mã OTP</h1>
        <p className="text-sm text-muted-foreground">
          Chúng tôi đã gửi mã 5 số đến email của bạn.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="flex justify-center gap-2" onPaste={handlePaste}>
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              ref={(el) => (inputRefs.current[index] = el)}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-14 text-center text-xl font-bold border-2 rounded-lg bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50"
              disabled={isLoading}
            />
          ))}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || otp.some((v) => v === "")}
        >
          {isLoading ? "Đang xác thực..." : "Xác nhận"}
        </Button>
      </form>

      <div className="text-center">
        <button
          type="button"
          className="text-sm text-primary hover:underline underline-offset-4"
          onClick={() => toast.info("Đã gửi lại mã mới")}
        >
          Gửi lại mã
        </button>
      </div>
    </div>
  );
}
