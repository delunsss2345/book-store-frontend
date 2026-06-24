"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const t = useTranslations("success");
  const searchParams = useSearchParams();
  const orderCode = searchParams.get("orderCode");

  return (
    <main className="success-page">
      {/* Ambient background blobs */}
      <div className="success-blob success-blob--tl" aria-hidden="true" />
      <div className="success-blob success-blob--br" aria-hidden="true" />

      <div className="success-container">
        {/* Eyebrow label */}
        <p className="success-eyebrow">{t("eyebrow")}</p>

        {/* Check icon */}
        <div className="success-icon-wrap" aria-hidden="true">
          <div className="success-icon-ring" />
          <svg
            className="success-icon-svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="success-heading">{t("title")}</h1>

        {/* Order code (optional) */}
        {orderCode && (
          <div className="success-order-badge">
            <span className="success-order-label">{t("orderLabel")}</span>
            <span className="success-order-code">{orderCode}</span>
          </div>
        )}

        {/* Description */}
        <p className="success-description">{t("description")}</p>

        {/* Divider */}
        <div className="success-divider" aria-hidden="true" />

        {/* CTA buttons */}
        <div className="success-actions">
          <Link href="/orders" className="success-btn-primary" id="view-orders-btn">
            {t("viewOrders")}
          </Link>
          <Link href="/" className="success-btn-secondary" id="back-home-btn">
            {t("backHome")}
          </Link>
        </div>

        {/* Subtle note */}
        <p className="success-note">{t("note")}</p>
      </div>

      <style>{`
        /* ── Page shell ── */
        .success-page {
          position: relative;
          min-height: calc(100vh - 80px);
          background-color: #F7F5F0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 64px 20px;
          overflow: hidden;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        /* ── Ambient blobs ── */
        .success-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .success-blob--tl {
          top: -120px;
          left: -120px;
          width: 480px;
          height: 480px;
          background: radial-gradient(circle, rgba(163, 200, 178, 0.28) 0%, transparent 70%);
          animation: blobDrift 12s ease-in-out infinite alternate;
        }
        .success-blob--br {
          bottom: -100px;
          right: -100px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(244, 231, 228, 0.55) 0%, transparent 70%);
          animation: blobDrift 15s ease-in-out infinite alternate-reverse;
        }
        @keyframes blobDrift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(24px, 18px) scale(1.06); }
        }
        @media (prefers-reduced-motion: reduce) {
          .success-blob { animation: none; }
        }

        /* ── Center card ── */
        .success-container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 480px;
          background: #FFFFFF;
          border: 1px solid #C8C2B8;
          border-radius: 24px;
          padding: 56px 48px 48px;
          text-align: center;
          box-shadow:
            0 2px 4px -1px rgba(26, 23, 20, 0.04),
            0 12px 32px -8px rgba(26, 23, 20, 0.10),
            0 40px 80px -20px rgba(26, 23, 20, 0.08);
          animation: cardIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── Eyebrow ── */
        .success-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #3F6F52;
          margin: 0 0 28px;
          animation: fadeUp 0.5s 0.05s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* ── Icon ── */
        .success-icon-wrap {
          position: relative;
          width: 72px;
          height: 72px;
          margin: 0 auto 28px;
          animation: fadeUp 0.5s 0.1s cubic-bezier(0.16,1,0.3,1) both;
        }
        .success-icon-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #EAF0EC;
          /* subtle pulse on load */
          animation: ringPulse 1s 0.4s cubic-bezier(0.36,0.07,0.19,0.97) both;
        }
        @keyframes ringPulse {
          0%   { transform: scale(0.7); opacity: 0; }
          60%  { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .success-icon-svg {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 32px;
          height: 32px;
          color: #3F6F52;
          /* draw-on animation */
          stroke-dasharray: 40;
          stroke-dashoffset: 40;
          animation: drawCheck 0.45s 0.55s ease-out forwards;
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .success-icon-ring { animation: none; }
          .success-icon-svg  { stroke-dashoffset: 0; animation: none; }
        }

        /* ── Heading ── */
        .success-heading {
          font-family: 'Fraunces', Georgia, 'Times New Roman', serif;
          font-size: 34px;
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: #1A1714;
          margin: 0 0 16px;
          animation: fadeUp 0.5s 0.15s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* ── Order badge ── */
        .success-order-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #F7F5F0;
          border: 1px solid #E7E2D8;
          border-radius: 8px;
          padding: 6px 14px;
          margin-bottom: 16px;
          animation: fadeUp 0.5s 0.18s cubic-bezier(0.16,1,0.3,1) both;
        }
        .success-order-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #938A7E;
        }
        .success-order-code {
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 13px;
          font-weight: 600;
          color: #1A1714;
        }

        /* ── Description ── */
        .success-description {
          font-size: 14px;
          line-height: 1.7;
          color: #57514A;
          margin: 0 0 28px;
          animation: fadeUp 0.5s 0.2s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* ── Divider ── */
        .success-divider {
          height: 1px;
          background: #C8C2B8;
          margin: 0 0 28px;
          animation: fadeUp 0.4s 0.25s ease both;
        }

        /* ── Action buttons ── */
        .success-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          animation: fadeUp 0.5s 0.28s cubic-bezier(0.16,1,0.3,1) both;
        }
        .success-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 48px;
          border-radius: 10px;
          background: #1A1714;
          color: #FFFFFF;
          font-size: 13.5px;
          font-weight: 600;
          letter-spacing: 0.01em;
          text-decoration: none;
          transition: background 0.18s ease, transform 0.14s ease, box-shadow 0.18s ease;
          box-shadow: 0 2px 8px -2px rgba(26, 23, 20, 0.28);
        }
        .success-btn-primary:hover {
          background: rgba(26, 23, 20, 0.88);
          transform: translateY(-1px);
          box-shadow: 0 6px 18px -4px rgba(26, 23, 20, 0.32);
        }
        .success-btn-primary:active {
          transform: scale(0.985);
        }
        .success-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 48px;
          border-radius: 10px;
          background: transparent;
          border: 1.5px solid #B0A89E;
          color: #57514A;
          font-size: 13.5px;
          font-weight: 600;
          text-decoration: none;
          transition: border-color 0.18s ease, color 0.18s ease, background 0.18s ease, transform 0.14s ease;
        }
        .success-btn-secondary:hover {
          border-color: #1A1714;
          color: #1A1714;
          background: #F7F5F0;
          transform: translateY(-1px);
        }
        .success-btn-secondary:active {
          transform: scale(0.985);
        }

        /* ── Note ── */
        .success-note {
          font-size: 12px;
          color: #938A7E;
          margin: 20px 0 0;
          animation: fadeUp 0.5s 0.34s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* ── Shared enter animation ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Responsive ── */
        @media (max-width: 520px) {
          .success-container {
            padding: 44px 28px 40px;
          }
          .success-heading {
            font-size: 28px;
          }
        }
      `}</style>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
