import { useAddToCartMutation, useCartMutation } from "@/features/cart/hooks";
import { cn } from "@/lib/utils";
import Link from "next/link";

type BookCardVariant = "default" | "compact";

type BookCardProps = {
  title: string;
  subtitle: string;
  price: number;
  currency?: string;
  badge?: string;
  imageUrl?: string;
  href?: string;
  variant?: BookCardVariant;
  className?: string;
  bookVariantId: bigint
};

const formatPrice = (price: number, currency: string) => `${currency} ${price}`;

const S: Record<
  BookCardVariant,
  {
    wrap: string;
    figure: string;
    img: string;
    badgeWrap: string;
    badge: string;
    title: string;
    subtitle: string;
    price: string;
  }
> = {
  default: {
    wrap: "w-full ",
    figure: "mx-auto w-full h-[360px]",
    img: "h-full w-full object-contain",
    badgeWrap: "mt-6",
    badge: "inline-flex items-center justify-center rounded-sm border border-neutral-300 text-[1.2rem] tracking-widest text-neutral-700",
    title: "mt-5 font-serif text-[20px] leading-[1.15] tracking-tight text-neutral-900",
    subtitle: "mt-1 text-[20px] leading-[1.15] tracking-tight text-neutral-700",
    price: "mt-6 text-[18px] font-semibold tracking-widest text-neutral-600 opacity-70",
  },
  compact: {
    wrap: "w-full ",
    figure: "mx-auto w-full h-[300px]",
    img: "h-full w-full object-contain",
    badgeWrap: "mt-5",
    badge: "inline-flex items-center justify-center rounded-sm border border-neutral-300 text-[1.1rem] tracking-widest text-neutral-700",
    title: "mt-4 font-serif text-[20px] leading-[1.15] tracking-tight text-neutral-900",
    subtitle: "mt-1 text-[20px] leading-[1.15] tracking-tight text-neutral-700",
    price: "mt-5 text-[18px] font-semibold tracking-widest text-neutral-600 opacity-70",
  },
};

function CardInner({
  title,
  subtitle,
  price,
  currency,
  badge,
  imageUrl,
  variant,
  className,
  bookVariantId
}: BookCardProps) {
  const mutationAddToCardItem = useAddToCartMutation();

  return (
    <article
      className={cn(
        "group/card text-center bg-transparent",
        "select-none",
        className
      )}
    >
      <figure
        className={cn(
          "relative",
          "mx-auto"
        )}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${title} cover`}
            loading="lazy"
            draggable={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-neutral-400">
            No image
          </div>
        )}
      </figure>

      {badge && <div className="mt-5">
        <span className={badge}>{badge}</span>
      </div>}

      <div className="mx-auto mt-2 max-w-[26ch]">
        <h3 className="mt-4 font-serif text-[20px] leading-[1.15] tracking-tight text-neutral-900">
          <strong className="font-semibold">{title}</strong>
        </h3>
        <p className="mt-1 text-[20px] leading-[1.15] tracking-tight text-neutral-700">{subtitle}</p>
      </div>

      <p className="mt-5 text-[18px] font-semibold tracking-widest text-neutral-600 opacity-70">{formatPrice(price, currency ?? 'vi')}</p>

      <div className="mt-5 opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover/card:opacity-100 group-hover/card:translate-y-0">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            mutationAddToCardItem.mutateAsync({ bookVariantId })
          }}
          className={cn(
            "inline-flex items-center justify-center",
            "rounded-sm border border-neutral-900",
            "px-4 py-2 text-[13px] font-medium tracking-widest uppercase",
            "text-neutral-900 bg-transparent",
            "transition-colors duration-200",
            "hover:bg-neutral-900 hover:text-white",
            "cursor-pointer"
          )}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default function BookCard({
  title,
  subtitle,
  price,
  currency = "US$",
  badge,
  imageUrl,
  href,
  variant = "default",
  className,
  bookVariantId
}: BookCardProps) {
  const inner = (
    <CardInner
      title={title}
      subtitle={subtitle}
      price={price}
      currency={currency}
      badge={badge}
      imageUrl={imageUrl}
      variant={variant}
      className={className}
      bookVariantId={bookVariantId}
    />
  );

  if (!href) return inner;

  return (
    <Link
      href={href}
      className={cn(
        "group block",
        "transition-transform duration-200 ease-out",
        "hover:-translate-y-[2px]"
      )}
      aria-label={`${title} ${subtitle}`}
    >
      {inner}
    </Link>
  );
}
