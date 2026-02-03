import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // const sessionToken = request.cookies.get(
  //   "__Secure-better-auth.session_token",
  // );

  // const sessionToken = request.cookies.get("better-auth.session_token");

  // console.log(sessionToken);
  const token = await cookies();
  //* User is not authenticated at all
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow access if session exists
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
