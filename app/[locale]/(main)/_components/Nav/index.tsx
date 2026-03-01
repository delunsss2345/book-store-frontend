"use client";

import useTranslator from "@/hooks/use-translator";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCategoriesQuery } from "@/features/category/hooks/use-categories-query";
import { useCategoryStore } from "@/features/category/store/category.store";
import type { CategoryItemData } from "@/types/response/category.response";

type NavItem = {
  key: string;
  to: string;
};

const navItems: NavItem[] = [
  {
    key: "books",
    to: "/books",
  },
];

const PARENT_PLACEHOLDER_COUNT = 6;

const Nav = () => {
  const { t } = useTranslator();
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [activeParentId, setActiveParentId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data, isPending, isError } = useCategoriesQuery();
  const storedCategories = useCategoryStore((state) => state.categories);
  const setCategories = useCategoryStore((state) => state.setCategories);

  const categories = data?.items ?? storedCategories ?? [];

  useEffect(() => {
    if (data?.items) {
      setCategories(data.items);
    }
  }, [data?.items, setCategories]);

  const parentCategories = useMemo(() => {
    return categories
      .filter((category) => category.parentId === null)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [categories]);

  const childrenByParent = useMemo(() => {
    const map = new Map<string, CategoryItemData[]>();
    categories.forEach((category) => {
      if (!category.parentId) {
        return;
      }
      const list = map.get(category.parentId) ?? [];
      list.push(category);
      map.set(category.parentId, list);
    });
    map.forEach((list) => list.sort((a, b) => a.sortOrder - b.sortOrder));
    return map;
  }, [categories]);

  useEffect(() => {
    if (!parentCategories.length) {
      setActiveParentId(null);
      return;
    }
    if (!activeParentId || !parentCategories.some((parent) => parent.id === activeParentId)) {
      setActiveParentId(parentCategories[0].id);
    }
  }, [parentCategories, activeParentId]);

  const activeParent =
    parentCategories.find((parent) => parent.id === activeParentId) ?? parentCategories[0];
  const childrenForActiveParent = activeParent ? childrenByParent.get(activeParent.id) ?? [] : [];
  const isDropdownLoading = isPending && categories.length === 0;
  const isDropdownError = isError && categories.length === 0;
  const showDropdown = activeNav === "books";

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

  const handleParentHover = (parentId: string) => {
    setActiveParentId(parentId);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center justify-between py-4">
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <div
              key={item.key}
              onMouseEnter={() => handleMouseEnter(item.key)}
              onMouseLeave={handleMouseLeave}
              className="relative py-2"
            >
              <Link
                href={item.to}
                className={`nav-link text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 ${
                  activeNav === item.key ? "opacity-100" : "opacity-60 hover:opacity-100"
                }`}
              >
                {t(`nav.${item.key}`)}
              </Link>
            </div>
          ))}
        </nav>

        <button
          className="lg:hidden p-2 text-zinc-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {showDropdown && (
        <div
          className="fixed left-0 right-0 z-50 hidden border-b border-zinc-100 bg-white shadow-xl lg:block"
          onMouseEnter={clearHideTimeout}
          onMouseLeave={handleMouseLeave}
        >
          <div className="container-main mx-auto max-w-7xl px-6 py-10">
            {isDropdownLoading ? (
              <div className="grid grid-cols-[240px_1fr] gap-8">
                <div className="space-y-3">
                  {Array.from({ length: PARENT_PLACEHOLDER_COUNT }).map((_, index) => (
                    <div
                      key={`parent-loading-${index}`}
                      className="h-4 w-32 animate-pulse rounded-md bg-zinc-100"
                    />
                  ))}
                </div>
                <div className="space-y-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={`child-loading-${index}`}
                      className="h-3 w-full animate-pulse rounded-md bg-zinc-100"
                    />
                  ))}
                </div>
              </div>
            ) : isDropdownError ? (
              <div className="py-10 text-sm text-rose-600">Unable to load categories.</div>
            ) : parentCategories.length === 0 ? (
              <div className="py-10 text-sm text-zinc-500">No categories available.</div>
            ) : (
              <div className="grid grid-cols-[240px_1fr] gap-8">
                <div className="flex flex-col gap-3 border-r border-zinc-100 pr-4">
                  {parentCategories.map((parent) => (
                    <Link
                      key={parent.id}
                      href={`/books/${parent.slug ?? parent.id}`}
                      onMouseEnter={() => handleParentHover(parent.id)}
                      onClick={() => setActiveNav(null)}
                      className={`text-sm transition-colors ${
                        activeParent?.id === parent.id ? "text-black font-semibold" : "text-zinc-500 hover:text-black"
                      }`}
                    >
                      {parent.name}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Subcategories</p>
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {activeParent?.name ?? "Explore topics"}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {childrenForActiveParent.length > 0 ? (
                      childrenForActiveParent.map((child) => (
                        <Link
                          key={child.id}
                          href={`/books/${child.slug ?? child.id}`}
                          onClick={() => setActiveNav(null)}
                          className="text-sm font-medium text-zinc-600 transition-colors hover:text-black"
                        >
                          {child.name}
                        </Link>
                      ))
                    ) : (
                      <p className="text-sm text-zinc-500">No subcategories yet.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] z-[100] bg-white lg:hidden overflow-y-auto">
          <div className="flex flex-col p-6 gap-6">
            {navItems.map((item) => (
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
                {item.key === "books" && (
                  <div className="space-y-6">
                    {isPending && categories.length === 0 ? (
                      <p className="text-sm text-zinc-500">Loading categories…</p>
                    ) : isError && categories.length === 0 ? (
                      <p className="text-sm text-rose-600">Unable to load categories.</p>
                    ) : parentCategories.length === 0 ? (
                      <p className="text-sm text-zinc-500">No categories available.</p>
                    ) : (
                      parentCategories.map((parent) => (
                        <div key={parent.id} className="space-y-2">
                          <Link
                            href={`/books/${parent.slug ?? parent.id}`}
                            className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-800"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {parent.name}
                          </Link>
                          <div className="space-y-1 pl-4 text-sm text-zinc-500">
                            {(childrenByParent.get(parent.id) ?? []).map((child) => (
                              <Link
                                key={child.id}
                                href={`/books/${child.slug ?? child.id}`}
                                className="block text-sm text-zinc-500 transition-colors hover:text-zinc-900"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))
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
