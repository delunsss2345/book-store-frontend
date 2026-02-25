import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "vi"],
  defaultLocale: "vi",
  localePrefix: "as-needed",
  pathnames: {
    // ─── Main pages ─────────────────────────────────
    "/": {
      vi: "/",
      en: "/",
    },
    "/books": {
      vi: "/sach",
      en: "/books",
    },
    "/detail/[...slug]": {
      vi: "/chi-tiet/[...slug]",
      en: "/detail/[...slug]",
    },
    "/cart": {
      vi: "/gio-hang",
      en: "/cart",
    },
    "/checkout": {
      vi: "/thanh-toan",
      en: "/checkout",
    },
    "/checkout/payment": {
      vi: "/thanh-toan/thanh-toan-online",
      en: "/checkout/payment",
    },
    "/orders": {
      vi: "/don-hang",
      en: "/orders",
    },
    "/orders/[orderId]": {
      vi: "/don-hang/[orderId]",
      en: "/orders/[orderId]",
    },
    "/wishlist": {
      vi: "/yeu-thich",
      en: "/wishlist",
    },
    "/categories": {
      vi: "/danh-muc",
      en: "/categories",
    },
    "/categories/[slug]": {
      vi: "/danh-muc/[slug]",
      en: "/categories/[slug]",
    },
    "/coming-soon": {
      vi: "/sap-ra-mat",
      en: "/coming-soon",
    },
    "/admin/dashboard/products/create": {
      vi: "/admin/bang-dieu-khien/san-pham/tao-moi",
      en: "/admin/dashboard/products/create",
    },
    "/products/create": {
      vi: "/admin/bang-dieu-khien/san-pham/tao-moi",
      en: "/admin/dashboard/products/create",
    },
    "/admin/dashboard/products/edit": {
      vi: "/admin/bang-dieu-khien/san-pham/chinh-sua",
      en: "/admin/dashboard/products/edit",
    },
    create: {
      vi: "tao-moi",
      en: "/create",
    },
    // ─── Auth pages ─────────────────────────────────
    "/login": {
      vi: "/dang-nhap",
      en: "/login",
    },
    "/register": {
      vi: "/dang-ky",
      en: "/register",
    },
    "/forgot-password": {
      vi: "/quen-mat-khau",
      en: "/forgot-password",
    },
    "/reset-password": {
      vi: "/dat-lai-mat-khau",
      en: "/reset-password",
    },
    "/verify-email": {
      vi: "/xac-thuc-email",
      en: "/verify-email",
    },

    "/profile": {
      vi: "/ho-so",
      en: "/profile",
    },
    "/profile/addresses": {
      vi: "/ho-so/dia-chi",
      en: "/profile/addresses",
    },
    "/profile/change-password": {
      vi: "/ho-so/doi-mat-khau",
      en: "/profile/change-password",
    },

    "/dashboard": {
      vi: "/bang-dieu-khien",
      en: "/dashboard",
    },
    "/dashboard/overview": {
      vi: "/bang-dieu-khien/tong-quan",
      en: "/dashboard/overview",
    },
    "/dashboard/statistics": {
      vi: "/bang-dieu-khien/thong-ke",
      en: "/dashboard/statistics",
    },
    "/dashboard/revenue": {
      vi: "/bang-dieu-khien/doanh-thu",
      en: "/dashboard/revenue",
    },

    // ─── Dashboard: Products & Catalog ──────────────
    "/dashboard/products": {
      vi: "/bang-dieu-khien/san-pham",
      en: "/dashboard/products",
    },
    "/dashboard/products/new": {
      vi: "/bang-dieu-khien/san-pham/tao-moi",
      en: "/dashboard/products/new",
    },
    "/dashboard/products/[productId]": {
      vi: "/bang-dieu-khien/san-pham/[productId]",
      en: "/dashboard/products/[productId]",
    },
    "/dashboard/products/[productId]/edit": {
      vi: "/bang-dieu-khien/san-pham/[productId]/chinh-sua",
      en: "/dashboard/products/[productId]/edit",
    },
    "/dashboard/categories": {
      vi: "/bang-dieu-khien/danh-muc",
      en: "/dashboard/categories",
    },
    "/dashboard/authors": {
      vi: "/bang-dieu-khien/tac-gia",
      en: "/dashboard/authors",
    },
    "/dashboard/publishers": {
      vi: "/bang-dieu-khien/nha-xuat-ban",
      en: "/dashboard/publishers",
    },
    "/dashboard/inventory": {
      vi: "/bang-dieu-khien/ton-kho",
      en: "/dashboard/inventory",
    },
    "/dashboard/book-assets": {
      vi: "/bang-dieu-khien/tai-nguyen-sach",
      en: "/dashboard/book-assets",
    },
    "/dashboard/book-snapshots": {
      vi: "/bang-dieu-khien/lich-su-sach",
      en: "/dashboard/book-snapshots",
    },

    // ─── Dashboard: Orders & Invoices ───────────────
    "/dashboard/orders": {
      vi: "/bang-dieu-khien/don-hang",
      en: "/dashboard/orders",
    },
    "/dashboard/orders/[orderId]": {
      vi: "/bang-dieu-khien/don-hang/[orderId]",
      en: "/dashboard/orders/[orderId]",
    },
    "/dashboard/invoices": {
      vi: "/bang-dieu-khien/hoa-don",
      en: "/dashboard/invoices",
    },
    "/dashboard/invoices/[invoiceId]": {
      vi: "/bang-dieu-khien/hoa-don/[invoiceId]",
      en: "/dashboard/invoices/[invoiceId]",
    },
    "/dashboard/shipping": {
      vi: "/bang-dieu-khien/van-chuyen",
      en: "/dashboard/shipping",
    },

    // ─── Dashboard: Users & Access Control ──────────
    "/dashboard/customers": {
      vi: "/bang-dieu-khien/khach-hang",
      en: "/dashboard/customers",
    },
    "/dashboard/customers/[customerId]": {
      vi: "/bang-dieu-khien/khach-hang/[customerId]",
      en: "/dashboard/customers/[customerId]",
    },
    "/dashboard/users": {
      vi: "/bang-dieu-khien/nguoi-dung",
      en: "/dashboard/users",
    },
    "/dashboard/roles": {
      vi: "/bang-dieu-khien/vai-tro",
      en: "/dashboard/roles",
    },
    "/dashboard/permissions": {
      vi: "/bang-dieu-khien/quyen-han",
      en: "/dashboard/permissions",
    },
    "/dashboard/guest-sessions": {
      vi: "/bang-dieu-khien/phien-khach",
      en: "/dashboard/guest-sessions",
    },

    // ─── Dashboard: Marketing & Engagement ──────────
    "/dashboard/coupons": {
      vi: "/bang-dieu-khien/ma-giam-gia",
      en: "/dashboard/coupons",
    },
    "/dashboard/reviews": {
      vi: "/bang-dieu-khien/danh-gia",
      en: "/dashboard/reviews",
    },
    "/dashboard/notifications": {
      vi: "/bang-dieu-khien/thong-bao",
      en: "/dashboard/notifications",
    },

    // ─── Dashboard: System & Monitoring ─────────────
    "/dashboard/email-outbox": {
      vi: "/bang-dieu-khien/hop-thu-di",
      en: "/dashboard/email-outbox",
    },
    "/dashboard/login-attempts": {
      vi: "/bang-dieu-khien/lich-su-dang-nhap",
      en: "/dashboard/login-attempts",
    },
    "/dashboard/devices": {
      vi: "/bang-dieu-khien/thiet-bi",
      en: "/dashboard/devices",
    },

    // ─── Dashboard: Settings ────────────────────────
    "/dashboard/settings": {
      vi: "/bang-dieu-khien/cai-dat",
      en: "/dashboard/settings",
    },
    "/dashboard/settings/account": {
      vi: "/bang-dieu-khien/cai-dat/tai-khoan",
      en: "/dashboard/settings/account",
    },
    "/dashboard/settings/appearance": {
      vi: "/bang-dieu-khien/cai-dat/giao-dien",
      en: "/dashboard/settings/appearance",
    },
    "/dashboard/settings/notifications": {
      vi: "/bang-dieu-khien/cai-dat/thong-bao",
      en: "/dashboard/settings/notifications",
    },
    "/dashboard/settings/display": {
      vi: "/bang-dieu-khien/cai-dat/hien-thi",
      en: "/dashboard/settings/display",
    },

    // ─── Dashboard: Help ────────────────────────────
    "/dashboard/help-center": {
      vi: "/bang-dieu-khien/tro-giup",
      en: "/dashboard/help-center",
    },

    // ─── Staff ──────────────────────────────────────
    "/dashboard/staff/orders": {
      vi: "/bang-dieu-khien/nhan-vien/don-hang",
      en: "/dashboard/staff/orders",
    },
    "/dashboard/staff/orders/[orderId]": {
      vi: "/bang-dieu-khien/nhan-vien/don-hang/[orderId]",
      en: "/dashboard/staff/orders/[orderId]",
    },
    "/dashboard/staff/customers": {
      vi: "/bang-dieu-khien/nhan-vien/khach-hang",
      en: "/dashboard/staff/customers",
    },
    "/dashboard/staff/products": {
      vi: "/bang-dieu-khien/nhan-vien/san-pham",
      en: "/dashboard/staff/products",
    },
    "/dashboard/staff/reviews": {
      vi: "/bang-dieu-khien/nhan-vien/danh-gia",
      en: "/dashboard/staff/reviews",
    },
    "/dashboard/staff/coupons": {
      vi: "/bang-dieu-khien/nhan-vien/ma-giam-gia",
      en: "/dashboard/staff/coupons",
    },
    "/dashboard/staff/shipping": {
      vi: "/bang-dieu-khien/nhan-vien/van-chuyen",
      en: "/dashboard/staff/shipping",
    },

    // ─── Warehouse ──────────────────────────────────
    "/dashboard/warehouse/inventory": {
      vi: "/bang-dieu-khien/kho/ton-kho",
      en: "/dashboard/warehouse/inventory",
    },
    "/dashboard/warehouse/stock-in": {
      vi: "/bang-dieu-khien/kho/nhap-kho",
      en: "/dashboard/warehouse/stock-in",
    },
    "/dashboard/warehouse/stock-out": {
      vi: "/bang-dieu-khien/kho/xuat-kho",
      en: "/dashboard/warehouse/stock-out",
    },
    "/dashboard/warehouse/products": {
      vi: "/bang-dieu-khien/kho/san-pham",
      en: "/dashboard/warehouse/products",
    },
    "/dashboard/warehouse/shipments": {
      vi: "/bang-dieu-khien/kho/lo-hang",
      en: "/dashboard/warehouse/shipments",
    },
    "/dashboard/warehouse/shipments/[shipmentId]": {
      vi: "/bang-dieu-khien/kho/lo-hang/[shipmentId]",
      en: "/dashboard/warehouse/shipments/[shipmentId]",
    },
    "/dashboard/warehouse/suppliers": {
      vi: "/bang-dieu-khien/kho/nha-cung-cap",
      en: "/dashboard/warehouse/suppliers",
    },
    "/dashboard/warehouse/reports": {
      vi: "/bang-dieu-khien/kho/bao-cao",
      en: "/dashboard/warehouse/reports",
    },
  },
});
