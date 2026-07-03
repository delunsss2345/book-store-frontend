"use client";

import { useVerifyEmailMutation } from "@/features/auth";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

type VerifyState = "verifying" | "success" | "failed";

interface VerifyPageClientProps {
  token: string;
}

export default function VerifyPageClient({ token }: VerifyPageClientProps) {
  const t = useTranslations("auth");
  const router = useRouter();
  const locale = useLocale();
  const verifyEmailMutation = useVerifyEmailMutation();
  const hasTriggeredRef = useRef(false);

  const [state, setState] = useState<VerifyState>("verifying");

  useEffect(() => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    verifyEmailMutation.mutate(token, {
      onSuccess: () => {
        setState("success");
        toast.success(t("success.verify"));
        setTimeout(() => {
          router.replace(`/${locale}/login`);
        }, 2800);
      },
      onError: () => {
        setState("failed");
        toast.error(t("errors.verifyTokenInvalid"));
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="verify-page">
      {/* Ambient blobs */}
      <div className="verify-blob verify-blob--tl" aria-hidden="true" />
      <div className="verify-blob verify-blob--br" aria-hidden="true" />

      <div className="verify-container">
        {/* Eyebrow */}
        <p className="verify-eyebrow">Velora · Email verification</p>

        {/* Icon */}
        <div className="verify-icon-wrap" aria-hidden="true">
          <div
            className={`verify-icon-ring ${state === "success" ? "verify-icon-ring--success" : state === "failed" ? "verify-icon-ring--failed" : "verify-icon-ring--pending"}`}
          />
          {state === "verifying" && (
            <svg
              className="verify-icon-spinner"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="40"
                strokeDashoffset="20"
              />
            </svg>
          )}
          {state === "success" && (
            <svg
              className="verify-icon-svg verify-icon-svg--success"
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
          )}
          {state === "failed" && (
            <svg
              className="verify-icon-svg verify-icon-svg--failed"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </div>

        {/* Heading */}
        <h1 className="verify-heading">
          {state === "verifying" && t("verifyingToken")}
          {state === "success" && t("success.verify")}
          {state === "failed" && t("errors.verifyTokenInvalid")}
        </h1>

        {/* Description */}
        <p className="verify-description">
          {state === "verifying" &&
            "Please wait while we confirm your email address."}
          {state === "success" &&
            "Your email has been confirmed. You will be redirected to the login page shortly."}
          {state === "failed" &&
            "The verification link may have expired or already been used."}
        </p>

        <div className="verify-divider" aria-hidden="true" />

        {/* Actions */}
        <div className="verify-actions">
          {state === "success" && (
            <Link
              href={`/${locale}/login`}
              className="verify-btn-primary"
              id="go-login-btn"
            >
              Go to Login
            </Link>
          )}
          {state === "failed" && (
            <>
              <Link
                href={`/${locale}/verify-email`}
                className="verify-btn-primary"
                id="resend-verify-btn"
              >
                Resend verification email
              </Link>
              <Link
                href={`/${locale}`}
                className="verify-btn-secondary"
                id="back-home-verify-btn"
              >
                Back to Home
              </Link>
            </>
          )}
          {state === "verifying" && (
            <div className="verify-progress-bar">
              <div className="verify-progress-fill" />
            </div>
          )}
        </div>

        <p className="verify-note">
          {state === "success" && "Redirecting automatically in a few seconds…"}
          {state === "failed" &&
            "If you continue to experience issues, contact our support team."}
          {state === "verifying" && "This may take a moment."}
        </p>
      </div>

      <style>{`
        /* ── Page shell ── */
        .verify-page {
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
        .verify-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .verify-blob--tl {
          top: -120px;
          left: -120px;
          width: 480px;
          height: 480px;
          background: radial-gradient(circle, rgba(163, 200, 178, 0.28) 0%, transparent 70%);
          animation: blobDrift 12s ease-in-out infinite alternate;
        }
        .verify-blob--br {
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
          .verify-blob { animation: none; }
        }

        /* ── Center card ── */
        .verify-container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 460px;
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
        .verify-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #3F6F52;
          margin: 0 0 28px;
          animation: fadeUp 0.5s 0.05s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* ── Icon ── */
        .verify-icon-wrap {
          position: relative;
          width: 72px;
          height: 72px;
          margin: 0 auto 28px;
          animation: fadeUp 0.5s 0.1s cubic-bezier(0.16,1,0.3,1) both;
        }
        .verify-icon-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          transition: background 0.4s ease;
        }
        .verify-icon-ring--pending {
          background: #EFF1F3;
        }
        .verify-icon-ring--success {
          background: #EAF0EC;
          animation: ringPulse 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
        .verify-icon-ring--failed {
          background: #FDECEA;
          animation: ringPulse 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
        @keyframes ringPulse {
          0%   { transform: scale(0.85); opacity: 0; }
          60%  { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        /* Spinner */
        .verify-icon-spinner {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 32px;
          height: 32px;
          color: #938A7E;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Check / X */
        .verify-icon-svg {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 32px;
          height: 32px;
          stroke-dasharray: 40;
          stroke-dashoffset: 40;
          animation: drawIcon 0.45s 0.1s ease-out forwards;
        }
        .verify-icon-svg--success { color: #3F6F52; }
        .verify-icon-svg--failed  { color: #C0392B; }
        @keyframes drawIcon {
          to { stroke-dashoffset: 0; }
        }

        /* ── Heading ── */
        .verify-heading {
          font-family: 'Fraunces', Georgia, 'Times New Roman', serif;
          font-size: 26px;
          font-weight: 600;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: #1A1714;
          margin: 0 0 12px;
          animation: fadeUp 0.5s 0.15s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* ── Description ── */
        .verify-description {
          font-size: 14px;
          line-height: 1.7;
          color: #57514A;
          margin: 0 0 28px;
          animation: fadeUp 0.5s 0.2s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* ── Divider ── */
        .verify-divider {
          height: 1px;
          background: #C8C2B8;
          margin: 0 0 28px;
          animation: fadeUp 0.4s 0.25s ease both;
        }

        /* ── Actions ── */
        .verify-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          animation: fadeUp 0.5s 0.28s cubic-bezier(0.16,1,0.3,1) both;
        }

        .verify-btn-primary {
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
        .verify-btn-primary:hover {
          background: rgba(26, 23, 20, 0.88);
          transform: translateY(-1px);
          box-shadow: 0 6px 18px -4px rgba(26, 23, 20, 0.32);
        }
        .verify-btn-primary:active { transform: scale(0.985); }

        .verify-btn-secondary {
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
        .verify-btn-secondary:hover {
          border-color: #1A1714;
          color: #1A1714;
          background: #F7F5F0;
          transform: translateY(-1px);
        }
        .verify-btn-secondary:active { transform: scale(0.985); }

        /* ── Progress bar (verifying state) ── */
        .verify-progress-bar {
          height: 3px;
          background: #E7E2D8;
          border-radius: 99px;
          overflow: hidden;
          margin: 4px 0;
        }
        .verify-progress-fill {
          height: 100%;
          width: 40%;
          background: #3F6F52;
          border-radius: 99px;
          animation: progressPulse 1.6s ease-in-out infinite;
        }
        @keyframes progressPulse {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(320%); }
        }

        /* ── Note ── */
        .verify-note {
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
          .verify-container {
            padding: 44px 28px 40px;
          }
          .verify-heading {
            font-size: 22px;
          }
        }
      `}</style>
    </main>
  );
}
