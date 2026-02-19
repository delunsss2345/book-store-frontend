import { wishApi } from "@/services/wish.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  selectorClearWish,
  selectorRemoveFromWish
} from "../selector/wish.selector";
import { useWishStore } from "../store/wish.store";

const wishQueryKey = ["wish"] as const;

export const useWishlistQuery = () =>
  useQuery({
    queryKey: wishQueryKey,
    queryFn: wishApi.getWish,
    select: (response) => response.data,
    staleTime: 0,
  });

/** Thêm vào wishlist — optimistic: thêm ngay vào store, rollback khi lỗi */
export const useAddToWishlistMutation = () => {
  const removeFromWish = useWishStore(selectorRemoveFromWish);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookVariantId }: { bookVariantId: number }) => {
      // Optimistic: thêm item tạm vào store để UI phản hồi ngay
      return wishApi.addWishItem({ bookVariantId });
    },
    onSuccess: () => {
      // Lấy dữ liệu chuẩn từ server (có id thật)
      queryClient.invalidateQueries({ queryKey: wishQueryKey });
    },
    onError: (_err, { bookVariantId }) => {
      // Rollback: xoá item tạm khỏi store
      removeFromWish(bookVariantId);
    },
  });
};

/** Xoá khỏi wishlist — optimistic: xoá ngay trong store, rollback bằng refetch nếu lỗi */
export const useRemoveFromWishlistMutation = () => {
  const removeFromWish = useWishStore(selectorRemoveFromWish);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemKey, bookVariantId }: { itemKey: number; bookVariantId: number }) => {
      console.log(itemKey) ; 
      removeFromWish(bookVariantId); // optimistic
      return wishApi.deleteWishItem(itemKey);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishQueryKey });
    },
    onError: () => {
      // Rollback: refetch để lấy lại danh sách thật
      queryClient.invalidateQueries({ queryKey: wishQueryKey });
    },
  });
};

/** Xoá toàn bộ wishlist — optimistic: clear ngay trong store */
export const useClearWishlistMutation = () => {
  const clearWish = useWishStore(selectorClearWish);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      clearWish(); // optimistic
      return wishApi.deleteWish();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishQueryKey });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: wishQueryKey });
    },
  });
};
