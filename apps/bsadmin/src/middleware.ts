import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
const LOGIN_PAGE = '/';
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { matcher } = config;
  //Page url 외의 요청은 Pass한다.
  if (!matcher.includes(pathname)) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const rtToken = token?.refreshToken;

  //로그인 페이지, 토큰이 있으면 대시보드로
  if (pathname === LOGIN_PAGE && rtToken !== undefined) {
    return NextResponse.rewrite(new URL('/clinical', request.url));
  } else if (pathname !== LOGIN_PAGE && rtToken === undefined) {
    return NextResponse.redirect(new URL('/signout', request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/clinical/:path*', '/'],
};