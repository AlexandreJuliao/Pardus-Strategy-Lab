import LpLockup from "@/components/lp/LpLockup";
import { ROOT_DOMAIN } from "@/lib/verticals";

export default function LpFooter({ name, logo }: { name: string; logo?: string }) {
  const site = `https://${ROOT_DOMAIN}`;
  return (
    <footer className="border-t border-line bg-bg-2/60">
      <div className="shell flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <LpLockup name={name} src={logo} height={54} />
          <p className="mt-5 max-w-sm font-sans text-[13.5px] leading-relaxed text-text-secondary">
            {name} é uma vertical da Pardus Strategy Lab, agência de sites, automação e
            inteligência artificial em Lisboa.{" "}
            <a href={site} className="text-gold underline-offset-4 hover:underline">
              Vê tudo o que fazemos
            </a>
            .
          </p>
        </div>
        <div className="flex flex-col gap-2 font-sans text-[13px] text-text-secondary md:items-end">
          <a href="mailto:geral@pardus-lab.com" className="hover:text-text-primary">geral@pardus-lab.com</a>
          <div className="flex gap-5">
            <a href={`${site}/privacidade`} className="hover:text-text-primary">Privacidade</a>
            <a href={`${site}/termos`} className="hover:text-text-primary">Termos</a>
          </div>
          <p className="text-text-muted">© {new Date().getFullYear()} Pardus Strategy Lab</p>
        </div>
      </div>
    </footer>
  );
}
