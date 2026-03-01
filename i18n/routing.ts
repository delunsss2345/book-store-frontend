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

    // Products
    "/[role]/dashboard/products": {
      vi: "/[role]/dashboard/products",
      en: "/[role]/dashboard/products",
    },
    "/[role]/dashboard/products/new": {
      vi: "/[role]/dashboard/products/new",
      en: "/[role]/dashboard/products/new",
    },
    "/[role]/dashboard/products/[productId]": {
      vi: "/[role]/dashboard/products/[productId]",
      en: "/[role]/dashboard/products/[productId]",
    },
    "/[role]/dashboard/products/[productId]/edit": {
      vi: "/[role]/dashboard/products/[productId]/edit",
      en: "/[role]/dashboard/products/[productId]/edit",
    },
    "/[role]/dashboard/products/create": {
      vi: "/[role]/dashboard/products/create",
      en: "/[role]/dashboard/products/create",
    },
    "/[role]/dashboard/products/edit": {
      vi: "/[role]/dashboard/products/edit",
      en: "/[role]/dashboard/products/edit",
    },

    // Catalog
    "/[role]/dashboard/categories": {
      vi: "/[role]/dashboard/categories",
      en: "/[role]/dashboard/categories",
    },
    "/[role]/dashboard/authors": {
      vi: "/[role]/dashboard/authors",
      en: "/[role]/dashboard/authors",
    },
    "/[role]/dashboard/publishers": {
      vi: "/[role]/dashboard/publishers",
      en: "/[role]/dashboard/publishers",
    },

    // Inventory & assets
    "/[role]/dashboard/inventory": {
      vi: "/[role]/dashboard/inventory",
      en: "/[role]/dashboard/inventory",
    },
    "/[role]/dashboard/book-assets": {
      vi: "/[role]/dashboard/book-assets",
      en: "/[role]/dashboard/book-assets",
    },
    "/[role]/dashboard/book-snapshots": {
      vi: "/[role]/dashboard/book-snapshots",
      en: "/[role]/dashboard/book-snapshots",
    },

    // Orders & invoices
    "/[role]/dashboard/orders": {
      vi: "/[role]/dashboard/orders",
      en: "/[role]/dashboard/orders",
    },
    "/[role]/dashboard/orders/[orderId]": {
      vi: "/[role]/dashboard/orders/[orderId]",
      en: "/[role]/dashboard/orders/[orderId]",
    },
    "/[role]/dashboard/invoices": {
      vi: "/[role]/dashboard/invoices",
      en: "/[role]/dashboard/invoices",
    },
    "/[role]/dashboard/invoices/[invoiceId]": {
      vi: "/[role]/dashboard/invoices/[invoiceId]",
      en: "/[role]/dashboard/invoices/[invoiceId]",
    },
    "/[role]/dashboard/shipping": {
      vi: "/[role]/dashboard/shipping",
      en: "/[role]/dashboard/shipping",
    },

    // Users & Access Control
    "/[role]/dashboard/customers": {
      vi: "/[role]/dashboard/customers",
      en: "/[role]/dashboard/customers",
    },
    "/[role]/dashboard/customers/[customerId]": {
      vi: "/[role]/dashboard/customers/[customerId]",
      en: "/[role]/dashboard/customers/[customerId]",
    },
    "/[role]/dashboard/users": {
      vi: "/[role]/dashboard/users",
      en: "/[role]/dashboard/users",
    },
    "/[role]/dashboard/roles": {
      vi: "/[role]/dashboard/roles",
      en: "/[role]/dashboard/roles",
    },
    "/[role]/dashboard/permissions": {
      vi: "/[role]/dashboard/permissions",
      en: "/[role]/dashboard/permissions",
    },
    "/[role]/dashboard/guest-sessions": {
      vi: "/[role]/dashboard/guest-sessions",
      en: "/[role]/dashboard/guest-sessions",
    },

    // Marketing & Engagement
    "/[role]/dashboard/coupons": {
      vi: "/[role]/dashboard/coupons",
      en: "/[role]/dashboard/coupons",
    },
    "/[role]/dashboard/reviews": {
      vi: "/[role]/dashboard/reviews",
      en: "/[role]/dashboard/reviews",
    },
    "/[role]/dashboard/notifications": {
      vi: "/[role]/dashboard/notifications",
      en: "/[role]/dashboard/notifications",
    },

    // System & Monitoring
    "/[role]/dashboard/email-outbox": {
      vi: "/[role]/dashboard/email-outbox",
      en: "/[role]/dashboard/email-outbox",
    },
    "/[role]/dashboard/login-attempts": {
      vi: "/[role]/dashboard/login-attempts",
      en: "/[role]/dashboard/login-attempts",
    },
    "/[role]/dashboard/devices": {
      vi: "/[role]/dashboard/devices",
      en: "/[role]/dashboard/devices",
    },

    // Settings
    "/[role]/dashboard/settings": {
      vi: "/[role]/dashboard/settings",
      en: "/[role]/dashboard/settings",
    },
    "/[role]/dashboard/settings/account": {
      vi: "/[role]/dashboard/settings/account",
      en: "/[role]/dashboard/settings/account",
    },
    "/[role]/dashboard/settings/appearance": {
      vi: "/[role]/dashboard/settings/appearance",
      en: "/[role]/dashboard/settings/appearance",
    },
    "/[role]/dashboard/settings/notifications": {
      vi: "/[role]/dashboard/settings/notifications",
      en: "/[role]/dashboard/settings/notifications",
    },
    "/[role]/dashboard/settings/display": {
      vi: "/[role]/dashboard/settings/display",
      en: "/[role]/dashboard/settings/display",
    },

    // Help
    "/[role]/dashboard/help-center": {
      vi: "/[role]/dashboard/help-center",
      en: "/[role]/dashboard/help-center",
    },

    // Staff
    "/[role]/dashboard/staff/orders": {
      vi: "/[role]/dashboard/staff/orders",
      en: "/[role]/dashboard/staff/orders",
    },
    "/[role]/dashboard/staff/orders/[orderId]": {
      vi: "/[role]/dashboard/staff/orders/[orderId]",
      en: "/[role]/dashboard/staff/orders/[orderId]",
    },
    "/[role]/dashboard/staff/customers": {
      vi: "/[role]/dashboard/staff/customers",
      en: "/[role]/dashboard/staff/customers",
    },
    "/[role]/dashboard/staff/products": {
      vi: "/[role]/dashboard/staff/products",
      en: "/[role]/dashboard/staff/products",
    },
    "/[role]/dashboard/staff/reviews": {
      vi: "/[role]/dashboard/staff/reviews",
      en: "/[role]/dashboard/staff/reviews",
    },
    "/[role]/dashboard/staff/coupons": {
      vi: "/[role]/dashboard/staff/coupons",
      en: "/[role]/dashboard/staff/coupons",
    },
    "/[role]/dashboard/staff/shipping": {
      vi: "/[role]/dashboard/staff/shipping",
      en: "/[role]/dashboard/staff/shipping",
    },

    // Warehouse
    "/[role]/dashboard/warehouse/inventory": {
      vi: "/[role]/dashboard/warehouse/inventory",
      en: "/[role]/dashboard/warehouse/inventory",
    },
    "/[role]/dashboard/warehouse/stock-in": {
      vi: "/[role]/dashboard/warehouse/stock-in",
      en: "/[role]/dashboard/warehouse/stock-in",
    },
    "/[role]/dashboard/warehouse/stock-out": {
      vi: "/[role]/dashboard/warehouse/stock-out",
      en: "/[role]/dashboard/warehouse/stock-out",
    },
    "/[role]/dashboard/warehouse/products": {
      vi: "/[role]/dashboard/warehouse/products",
      en: "/[role]/dashboard/warehouse/products",
    },
    "/[role]/dashboard/warehouse/shipments": {
      vi: "/[role]/dashboard/warehouse/shipments",
      en: "/[role]/dashboard/warehouse/shipments",
    },
    "/[role]/dashboard/warehouse/shipments/[shipmentId]": {
      vi: "/[role]/dashboard/warehouse/shipments/[shipmentId]",
      en: "/[role]/dashboard/warehouse/shipments/[shipmentId]",
    },
    "/[role]/dashboard/warehouse/suppliers": {
      vi: "/[role]/dashboard/warehouse/suppliers",
      en: "/[role]/dashboard/warehouse/suppliers",
    },
    "/[role]/dashboard/warehouse/reports": {
      vi: "/[role]/dashboard/warehouse/reports",
      en: "/[role]/dashboard/warehouse/reports",
    },
  },
});
