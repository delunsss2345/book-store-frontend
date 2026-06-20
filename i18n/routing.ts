import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "vi"],
  defaultLocale: "vi",
  localePrefix: "as-needed",
  pathnames: {
    // ─── Main pages ─────────────────────────────────
    "/": { vi: "/", en: "/" },

    "/books": { vi: "/books", en: "/books" },
    "/detail/[...slug]": { vi: "/detail/[...slug]", en: "/detail/[...slug]" },
    "/detail": { vi: "/detail", en: "/detail" },
    "/cart": { vi: "/cart", en: "/cart" },
    "/checkout": { vi: "/checkout", en: "/checkout" },
    "/checkout/payment": { vi: "/checkout/payment", en: "/checkout/payment" },

    "/orders": { vi: "/orders", en: "/orders" },
    "/orders/[orderId]": { vi: "/orders/[orderId]", en: "/orders/[orderId]" },

    "/wishlist": { vi: "/wishlist", en: "/wishlist" },

    "/categories": { vi: "/categories", en: "/categories" },
    "/categories/[slug]": {
      vi: "/categories/[slug]",
      en: "/categories/[slug]",
    },

    "/coming-soon": { vi: "/coming-soon", en: "/coming-soon" },

    // ─── Auth pages ─────────────────────────────────
    "/login": { vi: "/login", en: "/login" },
    "/register": { vi: "/register", en: "/register" },
    "/forgot-password": { vi: "/forgot-password", en: "/forgot-password" },
    "/reset-password": { vi: "/reset-password", en: "/reset-password" },
    "/verify-email": { vi: "/verify-email", en: "/verify-email" },

    "/profile": { vi: "/profile", en: "/profile" },
    "/profile/addresses": {
      vi: "/profile/addresses",
      en: "/profile/addresses",
    },
    "/profile/change-password": {
      vi: "/profile/change-password",
      en: "/profile/change-password",
    },
    "/profile/settings/session": {
      vi: "/profile/settings/session",
      en: "/profile/settings/session",
    },

    // ────────────────────────────────────────────────
    // Role-scoped Dashboard (IMPORTANT: prefix /[role])
    // ────────────────────────────────────────────────
    "/[role]/dashboard": {
      vi: "/[role]/dashboard",
      en: "/[role]/dashboard",
    },
    "/[role]/dashboard/overview": {
      vi: "/[role]/dashboard/overview",
      en: "/[role]/dashboard/overview",
    },
    "/[role]/dashboard/statistics": {
      vi: "/[role]/dashboard/statistics",
      en: "/[role]/dashboard/statistics",
    },
    "/[role]/dashboard/revenue": {
      vi: "/[role]/dashboard/revenue",
      en: "/[role]/dashboard/revenue",
    },
    "/detail/[slug]": {
      vi: "/detail/[...slug]",
      en: "/detail/[...slug]",
    },

    // Products
    "/[role]/books": {
      vi: "/[role]/books",
      en: "/[role]/books",
    },
    "/[role]/books/[id]/edit": {
      vi: "/[role]/books/[id]/edit",
      en: "/[role]/books/[id]/edit",
    },
    "/[role]/books/new": {
      vi: "/[role]/books/new",
      en: "/[role]/books/new",
    },
    "/[role]/books/[productId]": {
      vi: "/[role]/books/[productId]",
      en: "/[role]/books/[productId]",
    },
    "/[role]/books/[productId]/edit": {
      vi: "/[role]/books/[productId]/edit",
      en: "/[role]/books/[productId]/edit",
    },
    "/[role]/books/create": {
      vi: "/[role]/books/create",
      en: "/[role]/books/create",
    },
    "/[role]/books/edit": {
      vi: "/[role]/books/edit",
      en: "/[role]/books/edit",
    },

    // Catalog
    "/[role]/categories": {
      vi: "/[role]/categories",
      en: "/[role]/categories",
    },
    "/[role]/authors": {
      vi: "/[role]/authors",
      en: "/[role]/authors",
    },
    "/[role]/publishers": {
      vi: "/[role]/publishers",
      en: "/[role]/publishers",
    },

    // Inventory & assets
    "/[role]/inventory": {
      vi: "/[role]/inventory",
      en: "/[role]/inventory",
    },
    "/[role]/book-assets": {
      vi: "/[role]/book-assets",
      en: "/[role]/book-assets",
    },
    "/[role]/book-snapshots": {
      vi: "/[role]/book-snapshots",
      en: "/[role]/book-snapshots",
    },

    // Orders & invoices
    "/[role]/orders": {
      vi: "/[role]/orders",
      en: "/[role]/orders",
    },
    "/[role]/orders/[orderId]": {
      vi: "/[role]/orders/[orderId]",
      en: "/[role]/orders/[orderId]",
    },
    "/[role]/invoices": {
      vi: "/[role]/invoices",
      en: "/[role]/invoices",
    },
    "/[role]/invoices/[invoiceId]": {
      vi: "/[role]/invoices/[invoiceId]",
      en: "/[role]/invoices/[invoiceId]",
    },
    "/[role]/shipping": {
      vi: "/[role]/shipping",
      en: "/[role]/shipping",
    },

    // Users & Access Control
    "/[role]/customers": {
      vi: "/[role]/customers",
      en: "/[role]/customers",
    },
    "/[role]/customers/[customerId]": {
      vi: "/[role]/customers/[customerId]",
      en: "/[role]/customers/[customerId]",
    },
    "/[role]/users": {
      vi: "/[role]/users",
      en: "/[role]/users",
    },
    "/[role]/roles": {
      vi: "/[role]/roles",
      en: "/[role]/roles",
    },
    "/[role]/permissions": {
      vi: "/[role]/permissions",
      en: "/[role]/permissions",
    },
    "/[role]/guest-sessions": {
      vi: "/[role]/guest-sessions",
      en: "/[role]/guest-sessions",
    },

    // Marketing & Engagement
    "/[role]/coupons": {
      vi: "/[role]/coupons",
      en: "/[role]/coupons",
    },
    "/[role]/reviews": {
      vi: "/[role]/reviews",
      en: "/[role]/reviews",
    },
    "/[role]/notifications": {
      vi: "/[role]/notifications",
      en: "/[role]/notifications",
    },

    // System & Monitoring
    "/[role]/email-outbox": {
      vi: "/[role]/email-outbox",
      en: "/[role]/email-outbox",
    },
    "/[role]/login-attempts": {
      vi: "/[role]/login-attempts",
      en: "/[role]/login-attempts",
    },
    "/[role]/devices": {
      vi: "/[role]/devices",
      en: "/[role]/devices",
    },

    // Settings
    "/[role]/settings": {
      vi: "/[role]/settings",
      en: "/[role]/settings",
    },
    "/[role]/settings/account": {
      vi: "/[role]/settings/account",
      en: "/[role]/settings/account",
    },
    "/[role]/settings/appearance": {
      vi: "/[role]/settings/appearance",
      en: "/[role]/settings/appearance",
    },
    "/[role]/settings/notifications": {
      vi: "/[role]/settings/notifications",
      en: "/[role]/settings/notifications",
    },
    "/[role]/settings/display": {
      vi: "/[role]/settings/display",
      en: "/[role]/settings/display",
    },

    // Help
    "/[role]/help-center": {
      vi: "/[role]/help-center",
      en: "/[role]/help-center",
    },

    // Staff
    "/[role]/staff/orders": {
      vi: "/[role]/staff/orders",
      en: "/[role]/staff/orders",
    },
    "/[role]/staff/orders/[orderId]": {
      vi: "/[role]/staff/orders/[orderId]",
      en: "/[role]/staff/orders/[orderId]",
    },
    "/[role]/staff/customers": {
      vi: "/[role]/staff/customers",
      en: "/[role]/staff/customers",
    },
    "/[role]/staff/products": {
      vi: "/[role]/staff/products",
      en: "/[role]/staff/products",
    },
    "/[role]/staff/reviews": {
      vi: "/[role]/staff/reviews",
      en: "/[role]/staff/reviews",
    },
    "/[role]/staff/coupons": {
      vi: "/[role]/staff/coupons",
      en: "/[role]/staff/coupons",
    },
    "/[role]/staff/shipping": {
      vi: "/[role]/staff/shipping",
      en: "/[role]/staff/shipping",
    },

    // Warehouse
    "/[role]/warehouse/inventory": {
      vi: "/[role]/warehouse/inventory",
      en: "/[role]/warehouse/inventory",
    },
    "/[role]/warehouse/stock-in": {
      vi: "/[role]/warehouse/stock-in",
      en: "/[role]/warehouse/stock-in",
    },
    "/[role]/warehouse/stock-out": {
      vi: "/[role]/warehouse/stock-out",
      en: "/[role]/warehouse/stock-out",
    },
    "/[role]/warehouse/products": {
      vi: "/[role]/warehouse/products",
      en: "/[role]/warehouse/products",
    },
    "/[role]/warehouse/shipments": {
      vi: "/[role]/warehouse/shipments",
      en: "/[role]/warehouse/shipments",
    },
    "/[role]/warehouse/shipments/[shipmentId]": {
      vi: "/[role]/warehouse/shipments/[shipmentId]",
      en: "/[role]/warehouse/shipments/[shipmentId]",
    },
    "/[role]/warehouse/suppliers": {
      vi: "/[role]/warehouse/suppliers",
      en: "/[role]/warehouse/suppliers",
    },
    "/[role]/warehouse/reports": {
      vi: "/[role]/warehouse/reports",
      en: "/[role]/warehouse/reports",
    },
  },
});
