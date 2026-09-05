/**
 * Janela de browser estilizada para embrulhar as mini-UIs das landing pages.
 * Só apresentação: chrome escuro, três pontos, barra de endereço opcional.
 */
export default function MockFrame({
  url,
  children,
  className = "",
}: {
  url?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[12px] border border-white/[0.08] bg-[#0b0f1a] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8),0_0_0_1px_rgba(212,175,96,0.06)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5">
        <span className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
          <i className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
          <i className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
        </span>
        {url && (
          <span className="mx-auto flex h-6 w-full max-w-[280px] items-center justify-center rounded-[4px] border border-white/[0.06] bg-black/30 font-sans text-[10.5px] tracking-wide text-text-muted">
            <span className="mr-1 text-[#5fd0a8]">🔒</span>
            {url}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
