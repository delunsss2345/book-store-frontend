import { publisherApi } from "@/services/publisher.service";
import { useMutation } from "@tanstack/react-query";

export const useCreatePublisherMutation = () =>
  useMutation({
    mutationFn: publisherApi.createPublisher,
  });
