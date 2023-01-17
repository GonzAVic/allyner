import { NextResponse } from "next/server";

export default function middleware(req) {
  const { pathname } = req.nextUrl;
  const hostname = req.headers.get("host");

  const currentHost =
    process.env.NODE_ENV === "production"
      ? hostname?.replace(`.domain.com`, "")
      : hostname?.replace(`.localhost:3001`, "");

  if (pathname.startsWith(`/_sites`)) {
    return new Response(null, { status: 404 });
  }

  if (!pathname.includes(".") && !pathname.startsWith("/api")) {
    // For clients
    if (currentHost === "app") {
      const nextUrl = req.nextUrl.clone();
      const newPathname = `/app${pathname}`;
      console.log("-> newPathname: ", newPathname);
      nextUrl.pathname = newPathname;
      return NextResponse.rewrite(nextUrl);
    }

    if (currentHost === "localhost:3000") {
      const nextUrl = req.nextUrl.clone();
      const newPathname = `${pathname}`;
      nextUrl.pathname = newPathname;
      return NextResponse.rewrite(nextUrl);
    }

    // For users
    const newPathname = `/_sites/${currentHost}${pathname}`;
    console.log("-> newPathname: ", newPathname);
    const nextUrl = req.nextUrl.clone();
    nextUrl.pathname = newPathname;
    return NextResponse.rewrite(nextUrl);
  }
}
