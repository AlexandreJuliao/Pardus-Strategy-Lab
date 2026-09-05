import { NextResponse, type NextRequest } from "next/server";
import { ROOT_DOMAIN, VERTICAL_SLUGS } from "@/lib/verticals";

// Subdomínios por vertical: <slug>.pardus-lab.com serve a landing page dessa
// vertical (app/(lp)/lp/[slug]). Em produção, o path /lp/<slug> no domínio
// principal redireciona para o subdomínio (um único URL canónico); em dev e
// preview fica acessível diretamente e <slug>.localhost:3020 também funciona.

const HOST_RE = new RegExp(`^(${VERTICAL_SLUGS.join("|")})\\.(${ROOT_DOMAIN.replace(".", "\\.")}|localhost)(:\\d+)?$`);
const IS_PROD = process.env.VERCEL_ENV === "production";

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

  if (IS_PROD && pathname.startsWith("/lp/")) {
    const slug = pathname.split("/")[2];
    if (slug && VERTICAL_SLUGS.includes(slug)) {
      const rest = pathname.slice(`/lp/${slug}`.length) || "/";
      return NextResponse.redirect(`https://${slug}.${ROOT_DOMAIN}${rest}`, 308);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|img|.*\\..*).*)"],
};
