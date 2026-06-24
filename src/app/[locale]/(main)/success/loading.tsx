export default function SuccessLoading() {
  return (
    <main className="success-sk-page">
      {/* Ambient blobs (same as real page so layout is identical) */}
      <div className="success-blob success-blob--tl" aria-hidden="true" />
      <div className="success-blob success-blob--br" aria-hidden="true" />

      <div className="success-sk-card" aria-busy="true" aria-label="Loading…">
        {/* Eyebrow */}
        <div className="sk success-sk-eyebrow" />

        {/* Icon circle */}
        <div className="success-sk-icon-wrap">
          <div className="sk success-sk-icon" />
        </div>

        {/* Heading */}
        <div className="sk success-sk-heading" />

        {/* Description lines */}
        <div className="success-sk-desc-block">
          <div className="sk success-sk-desc-line" style={{ width: "92%" }} />
          <div className="sk success-sk-desc-line" style={{ width: "78%" }} />
          <div className="sk success-sk-desc-line" style={{ width: "60%" }} />
        </div>

        {/* Divider */}
        <div className="sk success-sk-divider" />

        {/* Buttons */}
        <div className="success-sk-actions">
          <div className="sk success-sk-btn" />
          <div className="sk success-sk-btn" />
        </div>

        {/* Note */}
        <div className="sk success-sk-note" />
      </div>

      <style>{`
        /* ── Shimmer keyframe ── */
        @keyframes sk-shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }
        .sk {
          border-radius: 6px;
          background: linear-gradient(
            90deg,
            #EDE9E1 0%,
            #F5F2EE 40%,
            #F5F2EE 60%,
            #EDE9E1 100%
          );
          background-size: 600px 100%;
          animation: sk-shimmer 1.4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .sk { animation: none; background: #EDE9E1; }
        }

        /* ── Page shell — mirrors success-page exactly ── */
        .success-sk-page {
          position: relative;
          min-height: calc(100vh - 80px);
          background-color: #F7F5F0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 64px 20px;
          overflow: hidden;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        /* ── Ambient blobs (reused from page) ── */
        .success-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .success-blob--tl {
          top: -120px; left: -120px;
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(163,200,178,0.20) 0%, transparent 70%);
        }
        .success-blob--br {
          bottom: -100px; right: -100px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(244,231,228,0.40) 0%, transparent 70%);
        }

        /* ── Card shell ── */
        .success-sk-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 480px;
          background: #FFFFFF;
          border: 1px solid #E7E2D8;
          border-radius: 24px;
          padding: 56px 48px 48px;
          text-align: center;
          box-shadow:
            0 2px 4px -1px rgba(26,23,20,0.04),
            0 12px 32px -8px rgba(26,23,20,0.10),
            0 40px 80px -20px rgba(26,23,20,0.08);
        }

        /* ── Skeleton pieces ── */
        .success-sk-eyebrow {
          height: 10px;
          width: 120px;
          border-radius: 999px;
          margin: 0 auto 28px;
        }

        .success-sk-icon-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 28px;
        }
        .success-sk-icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
        }

        .success-sk-heading {
          height: 36px;
          width: 200px;
          border-radius: 8px;
          margin: 0 auto 20px;
        }

        .success-sk-desc-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-bottom: 28px;
        }
        .success-sk-desc-line {
          height: 13px;
          border-radius: 999px;
        }

        .success-sk-divider {
          height: 1px;
          width: 100%;
          border-radius: 0;
          margin-bottom: 28px;
        }

        .success-sk-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .success-sk-btn {
          height: 48px;
          border-radius: 10px;
          width: 100%;
        }

        .success-sk-note {
          height: 10px;
          width: 180px;
          border-radius: 999px;
          margin: 20px auto 0;
        }

        /* ── Responsive ── */
        @media (max-width: 520px) {
          .success-sk-card {
            padding: 44px 28px 40px;
          }
          .success-sk-heading {
            height: 30px;
            width: 160px;
          }
        }
      `}</style>
    </main>
  );
}
