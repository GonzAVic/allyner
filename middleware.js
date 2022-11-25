import { NextResponse } from "next/server";

export default function middleware(req) {
  const { pathname } = req.nextUrl;
  const hostname = req.headers.get("host");

  const currentHost =
    process.env.NODE_ENV === "production"
      ? hostname?.replace(`.domain.com`, "")
      : hostname?.replace(`.localhost:3000`, "");

  if (pathname.startsWith(`/_sites`)) {
    return new Response(null, { status: 404 });
  }

  if (!pathname.includes(".") && !pathname.startsWith("/api")) {
    if (currentHost === "app") {
      const nextUrl = req.nextUrl.clone();
      const newPathname = `/app${pathname}`;
      nextUrl.pathname = newPathname;
      return NextResponse.rewrite(nextUrl);
    }

    if (currentHost === "localhost:3000") {
      const nextUrl = req.nextUrl.clone();
      const newPathname = `${pathname}`;
      nextUrl.pathname = newPathname;
      return NextResponse.rewrite(nextUrl);
    }

    const newPathname = `/_sites/${currentHost}${pathname}`;
    const nextUrl = req.nextUrl.clone();
    nextUrl.pathname = newPathname;
    return NextResponse.rewrite(nextUrl);
  }
}
