export default function ComingSoonPage() {
  return (
    <div className="relative grid min-h-[80vh] place-items-center bg-paper px-10 py-20">
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #1A1714 1px, transparent 0)", backgroundSize: "22px 22px" }}
      ></div>
      <div className="relative flex max-w-lg flex-col items-center text-center">
        <span className="chip bg-accent-soft text-accent inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
          </span>
          In progress
        </span>
        
        <h3 className="display mt-5 text-[34px] font-semibold leading-tight text-ink">
          Feature Coming Soon
        </h3>
        
        <p className="mt-3 text-[14px] leading-relaxed text-ink-2">
          We are currently working hard on bringing you this new feature. Want a heads-up when it ships?
        </p>
        
        <form className="mt-6 flex w-full max-w-sm items-center gap-2">
          <input className="field" placeholder="you@velora.store" />
          <button type="button" className="btn-ink shrink-0 rounded-lg px-4 py-2 text-[13px]">
            Notify me
          </button>
        </form>
        
        <div className="mt-7 flex items-center gap-2 text-[12px] text-ink-3">
          <span className="font-mono">ETA</span>
          <span className="h-3 w-px bg-line-2"></span>
          <span>Q3 · 2026</span>
          <span className="h-3 w-px bg-line-2"></span>
          <span className="text-ok font-semibold">62% complete</span>
        </div>
        
        <div className="mt-2 h-1.5 w-full max-w-sm overflow-hidden rounded-full bg-line">
          <div className="h-full w-[62%] rounded-full bg-ok"></div>
        </div>
      </div>
    </div>
  );
}
