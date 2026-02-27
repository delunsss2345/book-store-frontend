import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "vi"],
  defaultLocale: "vi",
  localePrefix: "as-needed",
  pathnames: {
    // ─── Main pages ─────────────────────────────────
    "/": { vi: "/", en: "/" },

    "/books": { vi: "/sach", en: "/books" },
    "/detail/[...slug]": { vi: "/chi-tiet/[...slug]", en: "/detail/[...slug]" },

    "/cart": { vi: "/gio-hang", en: "/cart" },
    "/checkout": { vi: "/thanh-toan", en: "/checkout" },
    "/checkout/payment": {
      vi: "/thanh-toan/thanh-toan-online",
      en: "/checkout/payment",
    },

    "/orders": { vi: "/don-hang", en: "/orders" },
    "/orders/[orderId]": { vi: "/don-hang/[orderId]", en: "/orders/[orderId]" },

    "/wishlist": { vi: "/yeu-thich", en: "/wishlist" },

    "/categories": { vi: "/danh-muc", en: "/categories" },
    "/categories/[slug]": { vi: "/danh-muc/[slug]", en: "/categories/[slug]" },

    "/coming-soon": { vi: "/sap-ra-mat", en: "/coming-soon" },

    // ─── Auth pages ─────────────────────────────────
    "/login": { vi: "/dang-nhap", en: "/login" },
    "/register": { vi: "/dang-ky", en: "/register" },
    "/forgot-password": { vi: "/quen-mat-khau", en: "/forgot-password" },
    "/reset-password": { vi: "/dat-lai-mat-khau", en: "/reset-password" },
    "/verify-email": { vi: "/xac-thuc-email", en: "/verify-email" },

    "/profile": { vi: "/ho-so", en: "/profile" },
    "/profile/addresses": { vi: "/ho-so/dia-chi", en: "/profile/addresses" },
    "/profile/change-password": {
      vi: "/ho-so/doi-mat-khau",
      en: "/profile/change-password",
    },

    // ────────────────────────────────────────────────
    // Role-scoped Dashboard (IMPORTANT: prefix /[role])
    // ────────────────────────────────────────────────
    "/[role]/dashboard": {
      vi: "/[role]/bang-dieu-khien",
      en: "/[role]/dashboard",
    },
    "/[role]/dashboard/overview": {
      vi: "/[role]/bang-dieu-khien/tong-quan",
      en: "/[role]/dashboard/overview",
    },
    "/[role]/dashboard/statistics": {
      vi: "/[role]/bang-dieu-khien/thong-ke",
      en: "/[role]/dashboard/statistics",
    },
    "/[role]/dashboard/revenue": {
      vi: "/[role]/bang-dieu-khien/doanh-thu",
      en: "/[role]/dashboard/revenue",
    },

    // Products
    "/[role]/dashboard/products": {
      vi: "/[role]/bang-dieu-khien/san-pham",
      en: "/[role]/dashboard/products",
    },
    "/[role]/dashboard/products/new": {
      vi: "/[role]/bang-dieu-khien/san-pham/tao-moi",
      en: "/[role]/dashboard/products/new",
    },
    "/[role]/dashboard/products/[productId]": {
      vi: "/[role]/bang-dieu-khien/san-pham/[productId]",
      en: "/[role]/dashboard/products/[productId]",
    },
    "/[role]/dashboard/products/[productId]/edit": {
      vi: "/[role]/bang-dieu-khien/san-pham/[productId]/chinh-sua",
      en: "/[role]/dashboard/products/[productId]/edit",
    },
    "/[role]/dashboard/products/create": {
      vi: "/[role]/bang-dieu-khien/san-pham/tao-moi",
      en: "/[role]/dashboard/products/create",
    },
    "/[role]/dashboard/products/edit": {
      vi: "/[role]/bang-dieu-khien/san-pham/chinh-sua",
      en: "/[role]/dashboard/products/edit",
    },
    // Catalog
    "/[role]/dashboard/categories": {
      vi: "/[role]/bang-dieu-khien/danh-muc",
      en: "/[role]/dashboard/categories",
    },
    "/[role]/dashboard/authors": {
      vi: "/[role]/bang-dieu-khien/tac-gia",
      en: "/[role]/dashboard/authors",
    },
    "/[role]/dashboard/publishers": {
      vi: "/[role]/bang-dieu-khien/nha-xuat-ban",
      en: "/[role]/dashboard/publishers",
    },

    // Inventory & assets
    "/[role]/dashboard/inventory": {
      vi: "/[role]/bang-dieu-khien/ton-kho",
      en: "/[role]/dashboard/inventory",
    },
    "/[role]/dashboard/book-assets": {
      vi: "/[role]/bang-dieu-khien/tai-nguyen-sach",
      en: "/[role]/dashboard/book-assets",
    },
    "/[role]/dashboard/book-snapshots": {
      vi: "/[role]/bang-dieu-khien/lich-su-sach",
      en: "/[role]/dashboard/book-snapshots",
    },

    // Orders & invoices
    "/[role]/dashboard/orders": {
      vi: "/[role]/bang-dieu-khien/don-hang",
      en: "/[role]/dashboard/orders",
    },
    "/[role]/dashboard/orders/[orderId]": {
      vi: "/[role]/bang-dieu-khien/don-hang/[orderId]",
      en: "/[role]/dashboard/orders/[orderId]",
    },
    "/[role]/dashboard/invoices": {
      vi: "/[role]/bang-dieu-khien/hoa-don",
      en: "/[role]/dashboard/invoices",
    },
    "/[role]/dashboard/invoices/[invoiceId]": {
      vi: "/[role]/bang-dieu-khien/hoa-don/[invoiceId]",
      en: "/[role]/dashboard/invoices/[invoiceId]",
    },
    "/[role]/dashboard/shipping": {
      vi: "/[role]/bang-dieu-khien/van-chuyen",
      en: "/[role]/dashboard/shipping",
    },

    // Users & Access Control
    "/[role]/dashboard/customers": {
      vi: "/[role]/bang-dieu-khien/khach-hang",
      en: "/[role]/dashboard/customers",
    },
    "/[role]/dashboard/customers/[customerId]": {
      vi: "/[role]/bang-dieu-khien/khach-hang/[customerId]",
      en: "/[role]/dashboard/customers/[customerId]",
    },
    "/[role]/dashboard/users": {
      vi: "/[role]/bang-dieu-khien/nguoi-dung",
      en: "/[role]/dashboard/users",
    },
    "/[role]/dashboard/roles": {
      vi: "/[role]/bang-dieu-khien/vai-tro",
      en: "/[role]/dashboard/roles",
    },
    "/[role]/dashboard/permissions": {
      vi: "/[role]/bang-dieu-khien/quyen-han",
      en: "/[role]/dashboard/permissions",
    },
    "/[role]/dashboard/guest-sessions": {
      vi: "/[role]/bang-dieu-khien/phien-khach",
      en: "/[role]/dashboard/guest-sessions",
    },

    // Marketing & Engagement
    "/[role]/dashboard/coupons": {
      vi: "/[role]/bang-dieu-khien/ma-giam-gia",
      en: "/[role]/dashboard/coupons",
    },
    "/[role]/dashboard/reviews": {
      vi: "/[role]/bang-dieu-khien/danh-gia",
      en: "/[role]/dashboard/reviews",
    },
    "/[role]/dashboard/notifications": {
      vi: "/[role]/bang-dieu-khien/thong-bao",
      en: "/[role]/dashboard/notifications",
    },

    // System & Monitoring
    "/[role]/dashboard/email-outbox": {
      vi: "/[role]/bang-dieu-khien/hop-thu-di",
      en: "/[role]/dashboard/email-outbox",
    },
    "/[role]/dashboard/login-attempts": {
      vi: "/[role]/bang-dieu-khien/lich-su-dang-nhap",
      en: "/[role]/dashboard/login-attempts",
    },
    "/[role]/dashboard/devices": {
      vi: "/[role]/bang-dieu-khien/thiet-bi",
      en: "/[role]/dashboard/devices",
    },

    // Settings
    "/[role]/dashboard/settings": {
      vi: "/[role]/bang-dieu-khien/cai-dat",
      en: "/[role]/dashboard/settings",
    },
    "/[role]/dashboard/settings/account": {
      vi: "/[role]/bang-dieu-khien/cai-dat/tai-khoan",
      en: "/[role]/dashboard/settings/account",
    },
    "/[role]/dashboard/settings/appearance": {
      vi: "/[role]/bang-dieu-khien/cai-dat/giao-dien",
      en: "/[role]/dashboard/settings/appearance",
    },
    "/[role]/dashboard/settings/notifications": {
      vi: "/[role]/bang-dieu-khien/cai-dat/thong-bao",
      en: "/[role]/dashboard/settings/notifications",
    },
    "/[role]/dashboard/settings/display": {
      vi: "/[role]/bang-dieu-khien/cai-dat/hien-thi",
      en: "/[role]/dashboard/settings/display",
    },

    // Help
    "/[role]/dashboard/help-center": {
      vi: "/[role]/bang-dieu-khien/tro-giup",
      en: "/[role]/dashboard/help-center",
    },

    // Staff (nếu staff là role riêng thì các route này có thể bỏ; nếu vẫn muốn keep thì để)
    "/[role]/dashboard/staff/orders": {
      vi: "/[role]/bang-dieu-khien/nhan-vien/don-hang",
      en: "/[role]/dashboard/staff/orders",
    },
    "/[role]/dashboard/staff/orders/[orderId]": {
      vi: "/[role]/bang-dieu-khien/nhan-vien/don-hang/[orderId]",
      en: "/[role]/dashboard/staff/orders/[orderId]",
    },
    "/[role]/dashboard/staff/customers": {
      vi: "/[role]/bang-dieu-khien/nhan-vien/khach-hang",
      en: "/[role]/dashboard/staff/customers",
    },
    "/[role]/dashboard/staff/products": {
      vi: "/[role]/bang-dieu-khien/nhan-vien/san-pham",
      en: "/[role]/dashboard/staff/products",
    },
    "/[role]/dashboard/staff/reviews": {
      vi: "/[role]/bang-dieu-khien/nhan-vien/danh-gia",
      en: "/[role]/dashboard/staff/reviews",
    },
    "/[role]/dashboard/staff/coupons": {
      vi: "/[role]/bang-dieu-khien/nhan-vien/ma-giam-gia",
      en: "/[role]/dashboard/staff/coupons",
    },
    "/[role]/dashboard/staff/shipping": {
      vi: "/[role]/bang-dieu-khien/nhan-vien/van-chuyen",
      en: "/[role]/dashboard/staff/shipping",
    },

    // Warehouse
    "/[role]/dashboard/warehouse/inventory": {
      vi: "/[role]/bang-dieu-khien/kho/ton-kho",
      en: "/[role]/dashboard/warehouse/inventory",
    },
    "/[role]/dashboard/warehouse/stock-in": {
      vi: "/[role]/bang-dieu-khien/kho/nhap-kho",
      en: "/[role]/dashboard/warehouse/stock-in",
    },
    "/[role]/dashboard/warehouse/stock-out": {
      vi: "/[role]/bang-dieu-khien/kho/xuat-kho",
      en: "/[role]/dashboard/warehouse/stock-out",
    },
    "/[role]/dashboard/warehouse/products": {
      vi: "/[role]/bang-dieu-khien/kho/san-pham",
      en: "/[role]/dashboard/warehouse/products",
    },
    "/[role]/dashboard/warehouse/shipments": {
      vi: "/[role]/bang-dieu-khien/kho/lo-hang",
      en: "/[role]/dashboard/warehouse/shipments",
    },
    "/[role]/dashboard/warehouse/shipments/[shipmentId]": {
      vi: "/[role]/bang-dieu-khien/kho/lo-hang/[shipmentId]",
      en: "/[role]/dashboard/warehouse/shipments/[shipmentId]",
    },
    "/[role]/dashboard/warehouse/suppliers": {
      vi: "/[role]/bang-dieu-khien/kho/nha-cung-cap",
      en: "/[role]/dashboard/warehouse/suppliers",
    },
    "/[role]/dashboard/warehouse/reports": {
      vi: "/[role]/bang-dieu-khien/kho/bao-cao",
      en: "/[role]/dashboard/warehouse/reports",
    },
  },
});
