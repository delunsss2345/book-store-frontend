import { useAddToCartMutation } from "@/features/cart/hooks";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type BookCardVariant = "default" | "compact";

type BookCardProps = {
  title: string;
  description: string;
  price: number;
  currency?: string;
  badge?: string;
  imageUrl?: string;
  href?: string;
  variant?: BookCardVariant;
  className?: string;
  bookVariantId: number;
};

const formatPrice = (price: number, currency: string) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: currency === "US$" ? "USD" : "VND",
  }).format(price);

const S: Record<
  BookCardVariant,
  { title: string; subtitle: string; price: string }
> = {
  default: {
    title: "text-[18px]",
    subtitle: "text-[14px]",
    price: "text-[16px]",
  },
  compact: {
    title: "text-[16px]",
    subtitle: "text-[13px]",
    price: "text-[14px]",
  },
};

function CardInner({
  title,
  description,
  price,
  currency = "US$",
  badge,
  imageUrl,
  variant = "default",
  className,
  bookVariantId,
}: BookCardProps) {
  const mutationAddToCardItem = useAddToCartMutation();
  const style = S[variant];
  const t = useTranslations();

  return (
    <article
      className={cn("group/card block transition-all duration-300", className)}
    >
      <div className="aspect-[3/4] overflow-hidden rounded-md bg-surface relative">
        {imageUrl ? (
          <img
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
            src={imageUrl}
            alt={`${title} cover`}
            loading="lazy"
            draggable={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[13px] text-ink-3">
            No image
          </div>
        )}

        {badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-ink shadow-sm border border-line rounded-full">
              {badge}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 text-center">
        <h3
          className={cn(
            "display font-semibold leading-tight text-ink line-clamp-2",
            style.title,
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "mt-0.5 italic text-ink-3 line-clamp-1",
            style.subtitle,
          )}
        >
          {description}
        </p>

        <p className={cn("mt-2 font-medium text-ink", style.price)}>
          {formatPrice(price, currency)}
        </p>
      </div>

      {/* Nút bấm: Hiệu ứng Hover hiện đại hơn */}
      <div className="mt-6 overflow-hidden">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toast.promise(
              mutationAddToCardItem.mutateAsync({ bookVariantId }),
              {
                loading: t("cart.toast.addItemLoading"),
                success: t("cart.toast.addItemSuccess"),
                error: t("cart.toast.addItemError"),
              },
            );
          }}
          className={cn(
            "cursor-pointer w-full py-3 px-6 text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300",
            "border border-ink bg-transparent text-ink",
            "hover:bg-ink hover:text-white",
            "translate-y-4 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100",
          )}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default function BookCard(props: BookCardProps) {
  const router = useRouter();
  const { href, title, description } = props;
  const locale = useLocale();
  const inner = <CardInner {...props} />;

  if (!href) return <div className="h-full">{inner}</div>;

  return (
    <div
      onClick={() => setTimeout(() => router.push(`/${locale}${href}`), 200)}
      className="group block cursor-pointer"
      aria-label={`${title} ${description}`}
    >
      {inner}
    </div>
  );
}
