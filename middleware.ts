import { NextResponse, type NextRequest } from "next/server";
import { ROOT_DOMAIN, VERTICAL_SLUGS } from "@/lib/verticals";

// Subdomínios por vertical: <slug>.pardus-lab.com serve a landing page dessa
// vertical (app/(lp)/lp/[slug]), e <slug>.localhost:3030 faz o mesmo em dev.
//
// Enquanto o DNS do subdomínio não existir, a página vive também no domínio
// principal, em pardus-lab.com/<slug> — sem "lp" à vista, para o URL do
// anúncio ler como uma secção do site. É uma reescrita e não uma rota nova:
// uma rota dinâmica na raiz apanharia tudo o que não fosse estático e ficaria
// a competir com /servicos, /projetos e companhia. O /lp/<slug> antigo
// redireciona para cá, para haver um só URL. Não há conteúdo duplicado porque
// a LP é noindex. Com o DNS de pé, repõe-se o redirecionamento para o
// subdomínio.

const HOST_RE = new RegExp(`^(${VERTICAL_SLUGS.join("|")})\\.(${ROOT_DOMAIN.replace(".", "\\.")}|localhost)(:\\d+)?$`);

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  const { pathname } = req.nextUrl;
  const m = host.match(HOST_RE);

  if (m) {
    const slug = m[1];
    if (pathname === "/" || pathname === "/obrigado") {
      const url = req.nextUrl.clone();
      url.pathname = `/lp/${slug}${pathname === "/" ? "" : pathname}`;
      return NextResponse.rewrite(url);
    }
    if (pathname.startsWith("/lp/")) return NextResponse.next();
    // A LP não duplica o site: tudo o resto vai para o domínio principal.
    return NextResponse.redirect(`https://${ROOT_DOMAIN}${pathname}${req.nextUrl.search}`, 308);
  }

  // pardus-lab.com/<slug> → a landing page, sem "lp" no URL
  const seg = pathname.split("/").filter(Boolean);
  if (seg.length && VERTICAL_SLUGS.includes(seg[0])) {
    if (seg.length === 1 || (seg.length === 2 && seg[1] === "obrigado")) {
      const url = req.nextUrl.clone();
      url.pathname = `/lp/${pathname.replace(/^\//, "")}`;
      return NextResponse.rewrite(url);
    }
  }

  // o URL antigo com /lp continua a funcionar, mas manda para o novo
  if (pathname.startsWith("/lp/")) {
    const slug = seg[1];
    if (slug && VERTICAL_SLUGS.includes(slug)) {
      const rest = pathname.slice(`/lp/${slug}`.length);
      return NextResponse.redirect(
        new URL(`/${slug}${rest}${req.nextUrl.search}`, req.url),
        308,
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|img|.*\\..*).*)"],
};
