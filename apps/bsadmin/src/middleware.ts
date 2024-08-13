import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const LOGIN_PAGE = "/sign-in";
const DASHBOARD_PAGE = "/dashboard";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // eslint-disable-next-line turbo/no-undeclared-env-vars
  console.log("process.env.NEXTAUTH_URL", process.env.NEXTAUTH_URL);

  // Get the token
  const token = await getToken({
    req: request,
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  });

  const rtToken = token?.refreshToken;

  // Redirect from "/" to "/dashboard" if not already on "/dashboard"
  if (
    pathname === "/" &&
    rtToken !== undefined &&
    token?.error !== "RefreshAccessTokenError"
  ) {
    return NextResponse.redirect(new URL(DASHBOARD_PAGE, request.url));
  }

  // Handle sign-in page redirection based on the token
  if (
    pathname === LOGIN_PAGE &&
    rtToken !== undefined &&
    token?.error !== "RefreshAccessTokenError"
  ) {
    return NextResponse.rewrite(new URL("/", request.url));
  } else if (
    pathname !== LOGIN_PAGE &&
    (rtToken === undefined || token?.error === "RefreshAccessTokenError")
  ) {
    return NextResponse.redirect(new URL(LOGIN_PAGE, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/sign-in",
    "/order-list/:path*",
    "/order-reg/:path*",
    "/agnc-pi-list/:path*",
    "/agnc-pi-add/:path*",
    "/agnc-pi-modify/:path*",
    "/cust-list/:path*",
    "/cust-modify/:path*",
    "/inst-info-list/:path*",
    "/inst-info-add/:path*",
    "/inst-info-modify/:path*",
    "/contact-list/:path*",
    "/es-pr-list/:path*",
    "/machine-kit-list/:path*",
    "/master-code-list/:path*",
    "/project-list/:path*",
    "/svc-cate-add/:path*",
    "/svc-cate-list/:path*",
    "/svc-std-price-list/:path*",
    "/svc-type-list/:path*",
  ],
};

// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";
//
// // This function can be marked `async` if using `await` inside
// const LOGIN_PAGE = "/sign-in";
// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const { matcher } = config;
//
//   // eslint-disable-next-line turbo/no-undeclared-env-vars
//   // console.log("$$$", process.env.NEXT_PUBLIC_NEXTAUTH_SECRET)
//   // eslint-disable-next-line turbo/no-undeclared-env-vars
//   console.log("process.env.NEXTAUTH_URL", process.env.NEXTAUTH_URL);
//
//   //Page url 외의 요청은 Pass한다.
//   // if (!matcher.includes(pathname)) {
//   //   return NextResponse.next();
//   // }
//
//   const token = await getToken({
//     req: request,
//     // eslint-disable-next-line turbo/no-undeclared-env-vars
//     secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
//   });
//
//   // console.log('token > ', token?.error);
//
//   const rtToken = token?.refreshToken;
//
//   if (
//     pathname === LOGIN_PAGE &&
//     rtToken !== undefined &&
//     token?.error !== "RefreshAccessTokenError"
//   ) {
//     return NextResponse.rewrite(new URL("/", request.url));
//   } else if (
//     pathname !== LOGIN_PAGE &&
//     (rtToken === undefined || token?.error === "RefreshAccessTokenError")
//   ) {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   } else {
//     return NextResponse.next();
//   }
// }
//
// export const config = {
//   matcher: [
//     "/",
//     "/dashboard",
//     "/sign-in",
//     "/order-list/:path*",
//     "/order-reg/:path*",
//     "/agnc-pi-list/:path*",
//     "/agnc-pi-add/:path*",
//     "/agnc-pi-modify/:path*",
//     "/cust-list/:path*",
//     "/cust-modify/:path*",
//     "/inst-info-list/:path*",
//     "/inst-info-add/:path*",
//     "/inst-info-modify/:path*",
//     "/contact-list/:path*",
//     "/es-pr-list/:path*",
//     "/machine-kit-list/:path*",
//     "/master-code-list/:path*",
//     "/project-list/:path*",
//     "/svc-cate-add/:path*",
//     "/svc-cate-list/:path*",
//     "/svc-std-price-list/:path*",
//     "/svc-type-list/:path*",
//   ],
// };
