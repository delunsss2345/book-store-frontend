"use client";

import useTranslator from "@/hooks/use-translator";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type SlideItem = {
  id: string;
  title: string;
  cta: string;
  href: string;
  bookImage: string;
  bgGradient: string;
};

const slides: SlideItem[] = [
  {
    id: "1",
    title: "The Gourmand's Mushroom",
    cta: "Discover Now",
    href: "/detail/1",
    bookImage:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80",
    bgGradient: "linear-gradient(180deg, #e87b1c 0%, #f5a623 60%, #f5c86e 100%)",
  },
  {
    id: "2",
    title: "Frida Kahlo. The Complete Paintings",
    cta: "Discover Now",
    href: "/detail/2",
    bookImage:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
    bgGradient: "linear-gradient(180deg, #1a3a5c 0%, #2d6a9f 60%, #4a90c4 100%)",
  },
  {
    id: "3",
    title: "Caravaggio. The Complete Works",
    cta: "Discover Now",
    href: "/detail/3",
    bookImage:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80",
    bgGradient: "linear-gradient(180deg, #2d1b38 0%, #5c3d6e 60%, #8b5fa8 100%)",
  },
  {
    id: "4",
    title: "Leonardo da Vinci. Complete Paintings",
    cta: "Discover Now",
    href: "/detail/4",
    bookImage:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80",
    bgGradient: "linear-gradient(180deg, #8b2500 0%, #c44b2a 60%, #e8734c 100%)",
  },
  {
    id: "5",
    title: "Helmut Newton. SUMO",
    cta: "Discover Now",
    href: "/detail/5",
    bookImage:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
    bgGradient: "linear-gradient(180deg, #1a1a1a 0%, #333333 60%, #4d4d4d 100%)",
  },
];

const Hero = () => {
  const { t } = useTranslator();

  return (
    <section className="w-full">
      <style jsx global>{`
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: rgba(255, 255, 255, 0.7);
          width: 48px;
          height: 48px;
          transition: color 0.2s;
        }
        .hero-swiper .swiper-button-next:hover,
        .hero-swiper .swiper-button-prev:hover {
          color: rgba(255, 255, 255, 1);
        }
        .hero-swiper .swiper-button-next::after,
        .hero-swiper .swiper-button-prev::after {
          font-size: 24px;
          font-weight: 300;
        }
        .hero-swiper .swiper-pagination {
          bottom: 24px !important;
        }
        .hero-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          background: #fff;
          width: 10px;
          height: 10px;
        }
      `}</style>

      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="hero-swiper w-full"
      >
        {slides.map((s) => (
          <SwiperSlide key={s.id}>
            <div className="w-full">
              {/* Banner area with gradient background */}
              <div
                className="relative flex h-[520px] w-full items-end justify-center overflow-hidden sm:h-[580px]"
                style={{ background: s.bgGradient }}
              >
                {/* Book cover — centered with perspective/shadow */}
                <div className="relative mb-6 flex items-end justify-center">
                  <div
                    className="relative h-[340px] w-[240px] overflow-hidden shadow-2xl sm:h-[400px] sm:w-[280px]"
                    style={{
                      transform: "perspective(1200px) rotateY(-8deg)",
                      boxShadow:
                        "12px 12px 40px rgba(0,0,0,0.35), -2px 0 8px rgba(0,0,0,0.15)",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.bookImage}
                      alt={s.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Book spine shadow */}
                  <div
                    className="absolute bottom-0 left-1/2 h-[8px] w-[260px] -translate-x-1/2 sm:w-[300px]"
                    style={{
                      background:
                        "radial-gradient(ellipse, rgba(0,0,0,0.25) 0%, transparent 70%)",
                    }}
                  />
                </div>
              </div>

              {/* Title + CTA below banner */}
              <div className="border-t bg-white">
                <div className="mx-auto flex max-w-[var(--container-main)] flex-col items-center justify-center gap-3 px-6 py-8">
                  <h2 className="text-center text-xl font-bold tracking-tight text-zinc-900">
                    {s.title}
                  </h2>
                  <a
                    href={s.href}
                    className="inline-flex h-9 items-center justify-center border border-zinc-300 px-6 text-xs uppercase tracking-wider text-zinc-900 transition-colors hover:bg-zinc-50"
                  >
                    {s.cta}
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
