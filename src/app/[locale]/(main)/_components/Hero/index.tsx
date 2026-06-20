"use client";

import useTranslator from "@/hooks/use-translator";
import { A11y, Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

type SlideItem = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  bgImage: string;
};

const slides: SlideItem[] = [
  {
    id: "1",
    subtitle: "Featured Edition",
    title: "Massimo Listri.\nItalian Palaces",
    cta: "Discover Now",
    href: "/detail/1",
    bgImage: "https://images.unsplash.com/photo-1545989253-02cc26577f88?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "2",
    subtitle: "Just in",
    title: "New Releases",
    cta: "Shop Now",
    href: "/detail/2",
    bgImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "3",
    subtitle: "Collector's shelf",
    title: "Limited Editions",
    cta: "Explore",
    href: "/detail/3",
    bgImage: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1400&q=80",
  },
];

const Hero = () => {
  const { t } = useTranslator();

  return (
    <section className="relative w-full overflow-hidden border-b border-zinc-100">
      <style jsx global>{`
        .hero-swiper .swiper-pagination {
          text-align: left;
          padding-left: 2.5rem;
          padding-bottom: 1rem;
        }
        @media (min-width: 768px) {
          .hero-swiper .swiper-pagination {
            padding-left: 4rem;
          }
        }
        .hero-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #fff;
          opacity: 0.4;
          transition: opacity 0.3s ease;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: #fff;
        }
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          display: none;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>

      {/* Marquee announcement strip */}
      <div className="overflow-hidden bg-zinc-950 py-3 text-white">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...Array(2)].map((_, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-10 px-5 text-xs font-semibold uppercase tracking-[0.22em]"
              aria-hidden={i !== 0}
            >
              <span>Free shipping over US$ 200</span>
              <Sparkles className="h-3 w-3 text-primary" />
              <span>New arrivals every Thursday</span>
              <Sparkles className="h-3 w-3 text-primary" />
              <span>Limited editions restocked</span>
              <Sparkles className="h-3 w-3 text-primary" />
              <span>Books for Optimists since 1980</span>
              <Sparkles className="h-3 w-3 text-primary" />
            </span>
          ))}
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay, EffectFade]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        loop
        className="hero-swiper relative h-[440px] w-full lg:h-[600px]"
      >
        {slides.map((s) => (
          <SwiperSlide key={s.id}>
            <div className="relative h-full w-full overflow-hidden group">
              <img
                src={s.bgImage}
                alt={s.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[10000ms] ease-linear scale-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/40 to-transparent"></div>
              
              <div className="absolute inset-0 flex flex-col justify-center px-10 text-white md:px-16 container-main">
                <span className="text-sm font-semibold tracking-wider text-white/70 uppercase">
                  {s.subtitle}
                </span>
                <h2 className="mt-3 max-w-xl text-4xl font-medium leading-[1.05] sm:text-5xl whitespace-pre-line">
                  {s.title}
                </h2>
                <Link
                  href={s.href}
                  className="mt-8 inline-flex h-12 w-fit items-center border border-white px-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-zinc-950"
                >
                  {s.cta}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}

      </Swiper>
    </section>
  );
};

export default Hero;