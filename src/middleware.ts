import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./actions/AuthService";
import { BASEURL, FRONTENDURL } from "./lib/URL";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"]; // 🌎 Public Access

const userRoutes = [
  "/", // user রোলের জন্য
];

const adminRoutes = [
  "/", // admin রোলের জন্য
];

const superadminRoutes = [
  "/", // হোমপেজ superadmin রোলের জন্য
  "/users",
];

// রেগুলার এক্সপ্রেশন তৈরির ফাংশন
const createRoutePattern = (route: string): RegExp => {
  if (route === "/") {
    return /^\/$/;
  }
  if (route.includes(":page")) {
    return new RegExp(`^${route.replace(":page", "[^/]+")}(/.*)?$`);
  }
  return new RegExp(`^${route}$`);
};

// ডায়নামিকভাবে roleBasedPrivateRoutes তৈরি
const roleBasedPrivateRoutes = {
  user: userRoutes.map((route) => createRoutePattern(route)),
  admin: adminRoutes.map((route) => createRoutePattern(route)),
  superadmin: superadminRoutes.map((route) => createRoutePattern(route)),
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const userInfo = await getCurrentUser(); // 👤 Current User Info
  const normalizedRole = userInfo?.role.toLowerCase() as Role;

  // লগইন না থাকলে
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`${FRONTENDURL}/login?redirectPath=${pathname}`, request.url)
      );
    }
  }

  // লগইন থাকলে রোল চেক
  if (normalizedRole && roleBasedPrivateRoutes[normalizedRole]) {
    const routes = roleBasedPrivateRoutes[normalizedRole];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  // অননুমোদিত পেজে গেলে লগইন পেজে রিডাইরেক্ট
  return NextResponse.redirect(new URL("/login", request.url));
};

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/no-routes-for-user",
    "/no-routes-for-admin",
    "/users",
    "/success", // superadmin এর জন্য রিডাইরেক্ট টেস্ট করার জন্য
  ],
};
