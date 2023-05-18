import { getToken } from 'next-auth/jwt';
import { signOut } from 'next-auth/react';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export { default } from 'next-auth/middleware';

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

  const atToken = token?.accessToken;

  //로그인 페이지, 토큰이 있으면 대시보드로
  if (pathname === LOGIN_PAGE && atToken !== undefined) {
    return NextResponse.rewrite(new URL('/dashboard', request.url));
  } else if (pathname !== LOGIN_PAGE && atToken === undefined) {
    return NextResponse.redirect(new URL('/signout', request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/dashboard', '/'],
};
