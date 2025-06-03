import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./actions/AuthService";
import { FRONTENDURL } from "./lib/URL";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"]; // 🌎 Public Access

const userRoutes = ["/"];

const adminRoutes = ["/", "/blogs", "/messages", "/projects"];

const superadminRoutes = ["/", "/users"];

const createRoutePattern = (route: string): RegExp => {
  if (route === "/") {
    return /^\/$/;
  }
  if (route.includes(":page")) {
    return new RegExp(`^${route.replace(":page", "[^/]+")}(/.*)?$`);
  }
  return new RegExp(`^${route}$`);
};

const roleBasedPrivateRoutes = {
  user: userRoutes.map((route) => createRoutePattern(route)),
  admin: adminRoutes.map((route) => createRoutePattern(route)),
  superadmin: superadminRoutes.map((route) => createRoutePattern(route)),
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const userInfo = await getCurrentUser();
  const normalizedRole = userInfo?.role.toLowerCase() as Role;

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`${FRONTENDURL}/login`, request.url)
      );
    }
  }

  if (normalizedRole && roleBasedPrivateRoutes[normalizedRole]) {
    const routes = roleBasedPrivateRoutes[normalizedRole];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/login", request.url));
};

export const config = {
  matcher: ["/", "/projects", "/blogs", "/messages", "/users", "/success"],
};
