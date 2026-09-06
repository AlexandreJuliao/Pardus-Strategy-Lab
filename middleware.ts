import { NextResponse, type NextRequest } from "next/server";
import { ROOT_DOMAIN, VERTICAL_SLUGS } from "@/lib/verticals";

// Subdomínios por vertical: <slug>.pardus-lab.com serve a landing page dessa
// vertical (app/(lp)/lp/[slug]), e <slug>.localhost:3030 faz o mesmo em dev.
//
// O path /lp/<slug> no domínio principal serve a mesma página, em vez de
// redirecionar para o subdomínio: enquanto o DNS do subdomínio não existir, é
// este o URL que os anúncios podem usar. Não há risco de conteúdo duplicado
// porque a LP é noindex. Quando o DNS estiver de pé, volta-se a pôr aqui o
// redirecionamento para haver um único URL canónico.

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

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|img|.*\\..*).*)"],
};
