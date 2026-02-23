"use client";
import useTranslator from "@/hooks/use-translator";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

interface DropdownColumn {
  items: { label: string; href: string }[];
}

interface NavItem {
  key: string;
  to: string;
  dropdown?: DropdownColumn[];
}

const nav: NavItem[] = [
  {
    key: "books",
    to: "/books",
    dropdown: [
      {
        items: [
          { label: "All Titles", href: "/books" },
          { label: "New & Upcoming", href: "/books?sort=new" },
          { label: "Bestsellers", href: "/books?sort=bestseller" },
        ],
      },
      {
        items: [
          {
            label: "Architecture & Design",
            href: "/books/architecture-design",
          },
          { label: "Art", href: "/books/art" },
          { label: "Classics", href: "/books/classics" },
          { label: "Comics", href: "/books/comics" },
          { label: "Esoterica", href: "/books/esoterica" },
          { label: "Fashion", href: "/books/fashion" },
          { label: "Film", href: "/books/film" },
          { label: "Graphic Design", href: "/books/graphic-design" },
        ],
      },
      {
        items: [
          { label: "Kids", href: "/books/kids" },
          { label: "Music", href: "/books/music" },
          { label: "Photography", href: "/books/photography" },
          { label: "Pop Culture", href: "/books/pop-culture" },
          { label: "Sexy Books", href: "/books/sexy-books" },
          { label: "Style, Food & Travel", href: "/books/style-food-travel" },
          { label: "Sports", href: "/books/sports" },
        ],
      },
      {
        items: [
          { label: "45th Edition Series", href: "/books/45th-edition" },
          { label: "Basic Art Series", href: "/books/basic-art" },
          {
            label: "Bibliotheca Universalis",
            href: "/books/bibliotheca-universalis",
          },
          { label: "Clothbound Classics", href: "/books/clothbound-classics" },
          { label: "Fantastic Price", href: "/books/fantastic-price" },
          { label: "Icons", href: "/books/icons" },
          { label: "Source Books", href: "/books/source-books" },
          { label: "XL Books", href: "/books/xl-books" },
        ],
      },
    ],
  },
  {
    key: "limitedEditions",
    to: "/limited-editions",
    dropdown: [
      {
        items: [
          { label: "All Limited Editions", href: "/limited-editions" },
          { label: "New Releases", href: "/limited-editions?sort=new" },
          {
            label: "Collector's Editions",
            href: "/limited-editions/collectors",
          },
        ],
      },
      {
        items: [
          { label: "Art Editions", href: "/limited-editions/art" },
          { label: "Photography", href: "/limited-editions/photography" },
          { label: "SUMO", href: "/limited-editions/sumo" },
        ],
      },
    ],
  },
  {
    key: "gifts",
    to: "/gifts",
    dropdown: [
      {
        items: [
          { label: "All Gifts", href: "/gifts" },
          { label: "Gift Cards", href: "/gifts/cards" },
          { label: "Under $25", href: "/gifts?price=under-25" },
          { label: "Under $50", href: "/gifts?price=under-50" },
        ],
      },
      {
        items: [
          { label: "For Him", href: "/gifts/for-him" },
          { label: "For Her", href: "/gifts/for-her" },
          { label: "For Kids", href: "/gifts/for-kids" },
          { label: "For Couples", href: "/gifts/for-couples" },
        ],
      },
    ],
  },
  { key: "stores", to: "/stores" },
  { key: "about", to: "/about" },
];

const Nav = () => {
  const { t } = useTranslator();
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHideTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const handleMouseEnter = (key: string) => {
    clearHideTimeout();
    setActiveNav(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveNav(null), 150);
  };

  const activeItem = nav.find((item) => item.key === activeNav);
  const showDropdown = activeItem?.dropdown && activeItem.dropdown.length > 0;

  return (
    <div className="relative w-full">
      <div className="flex items-center justify-between py-4">
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((item) => (
            <div
              key={item.key}
              onMouseEnter={() => handleMouseEnter(item.key)}
              onMouseLeave={handleMouseLeave}
              className="relative py-2"
            >
              <Link
                href={item.to}
                className={`nav-link text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 ${
                  activeNav === item.key
                    ? "opacity-100"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                {t(`nav.${item.key}`)}
              </Link>
            </div>
          ))}
        </nav>

        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden p-2 text-zinc-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Mega Menu Dropdown */}
      {showDropdown && (
        <div
          className="fixed left-0 right-0 z-50 hidden border-b border-zinc-100 bg-white shadow-xl lg:block"
          onMouseEnter={clearHideTimeout}
          onMouseLeave={handleMouseLeave}
        >
          <div className="container-main mx-auto max-w-7xl px-6 py-10">
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
              {activeItem.dropdown!.map((col, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-3">
                  {col.items.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-[13px] text-zinc-500 transition-colors duration-200 hover:text-black hover:underline underline-offset-4"
                      onClick={() => setActiveNav(null)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] z-[100] bg-white lg:hidden overflow-y-auto">
          <div className="flex flex-col p-6 gap-6">
            {nav.map((item) => (
              <div key={item.key} className="border-b border-zinc-100 pb-4">
                <div className="flex justify-between items-center mb-4">
                  <Link
                    href={item.to}
                    className="text-sm font-bold uppercase tracking-widest"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </div>
                {item.dropdown && (
                  <div className="grid grid-cols-1 gap-4 pl-4">
                    {item.dropdown
                      .flatMap((d) => d.items)
                      .slice(0, 6)
                      .map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="text-sm text-zinc-500"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    {item.dropdown.flatMap((d) => d.items).length > 6 && (
                      <Link
                        href={item.to}
                        className="text-xs font-bold underline"
                      >
                        View All
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
