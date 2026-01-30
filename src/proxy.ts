import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import userService from "./services/user.service";
import { ROLE } from "./constent/role";

export async function proxy(request: NextRequest) {
  let isAuthentication = false;
  let isAdmin = false;

  const session = await userService.getSession();

  if (session?.session) {
    isAuthentication = true;
    isAdmin = session?.user?.role === ROLE.admin;
  }

  if (!isAuthentication) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
