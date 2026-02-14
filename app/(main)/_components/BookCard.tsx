import Link from "next/link";

import { cn } from "@/lib/utils";

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
};

const variantStyles: Record<
  BookCardVariant,
  {
    container: string;
    frame: string;
    badge: string;
    title: string;
    subtitle: string;
    price: string;
  }
> = {
  default: {
    container: "max-w-[300px]",
    frame: "h-[430px] w-[270px]",
    badge: "mt-5 text-base font-semibold tracking-wide",
    title: "mt-3 text-[1.9rem] font-semibold leading-tight",
    subtitle: "text-[1.9rem] leading-tight",
    price: "mt-4 text-3xl font-semibold",
  },
  compact: {
    container: "max-w-[220px]",
    frame: "h-[300px] w-[200px]",
    badge: "mt-4 text-sm font-semibold tracking-wide",
    title: "mt-2 text-lg font-semibold leading-tight",
    subtitle: "text-lg leading-tight",
    price: "mt-3 text-xl font-semibold",
  },
};

const formatPrice = (price: number, currency: string) => `${currency} ${price}`;

const BookCard = ({
  title,
  subtitle,
  price,
  currency = "US$",
  badge = "NEW",
  imageUrl,
  href,
  variant = "default",
  className,
}: BookCardProps) => {
  const styles = variantStyles[variant];

  const content = (
    <article className={cn("w-full text-center", styles.container, className)}>
      <div className={cn("mx-auto overflow-hidden border bg-muted/20 shadow-sm", styles.frame)}>
        {imageUrl ? (
          <div
            aria-label={`${title} cover`}
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">
            Book Cover
          </div>
        )}
      </div>

      <p className={styles.badge}>{badge}</p>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.subtitle}>{subtitle}</p>
      <p className={styles.price}>{formatPrice(price, currency)}</p>
    </article>
  );

  if (!href) return content;

  return (
    <Link href={href} className="inline-block">
      {content}
    </Link>
  );
};

export default BookCard;
