import { hooksApi } from "@/services/hooks.service";
import { useMutation } from "@tanstack/react-query";

export const useSePayPaymentMutation = () =>
  useMutation({
    mutationFn: hooksApi.sePayPayment,
  });
