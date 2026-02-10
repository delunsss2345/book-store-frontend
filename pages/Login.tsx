import LoginForm, { type LoginValues } from "@/components/auth/LoginForm";
import { LoginButtons } from "@/components/auth/LoginWithGoogle";
import { useLoginMutation } from "@/features/auth/hooks/use-login-mutation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Login = () => {
  const router = useRouter();

  const loginMutation = useLoginMutation();
  const isLoading = loginMutation.isPending;

  const onSubmit = async (values: LoginValues) => {
    toast.promise(loginMutation.mutateAsync(values), {
      loading: "Đang đăng nhập",
      success: () => {
        router.push("/");
        return "Đăng nhập thành công";
      },
      error: "Đăng nhập thất bại",
    });
  };

  return (
    <>
      <LoginForm isLoading={isLoading} onSubmit={onSubmit} />
      <LoginButtons />
    </>
  );
};

export default Login;
