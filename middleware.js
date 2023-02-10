import { NextResponse } from "next/server";

export default function middleware(req) {
  const { pathname } = req.nextUrl;
  const hostname = req.headers.get("host");

  const currentHost =
    process.env.NODE_ENV === "production"
      ? hostname?.replace(`.allyner.vercel.app`, "")
      : hostname?.replace(`.localhost:3001`, "");

  if (pathname.startsWith(`/_sites`)) {
    return new Response(null, { status: 404 });
  }

  if (!pathname.includes(".") && !pathname.startsWith("/api")) {
    // For clients
    console.log("---");
    console.log("-> pathname: ", pathname);
    console.log("-> hostname: ", hostname);
    console.log("-> currentHost: ", currentHost);
    if (pathname.startsWith("/app") || hostname === "allyner.vercel.app") {
      const nextUrl = req.nextUrl.clone();
      const newPathname = `${pathname}`;
      nextUrl.pathname = newPathname;
      return NextResponse.rewrite(nextUrl);
    }

    // For users
    const newPathname = `/_sites/${currentHost}${pathname}`;
    const nextUrl = req.nextUrl.clone();
    nextUrl.pathname = newPathname;
    return NextResponse.rewrite(nextUrl);
  }
}
