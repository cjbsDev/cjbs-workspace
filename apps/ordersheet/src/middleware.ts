import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
const LOGIN_PAGE = '/';
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { matcher } = config;

  console.log("$$$", process.env.NEXTAUTH_SECRET)

  //Page url 외의 요청은 Pass한다.
  if (!matcher.includes(pathname)) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // console.log('token > ', token?.error);

  const rtToken = token?.refreshToken;

  if (
    pathname === LOGIN_PAGE &&
    rtToken !== undefined &&
    token?.error !== 'RefreshAccessTokenError'
  ) {
    return NextResponse.rewrite(new URL('/main', request.url));
  } else if (
    pathname !== LOGIN_PAGE &&
    (rtToken === undefined || token?.error === 'RefreshAccessTokenError')
  ) {
    return NextResponse.redirect(new URL('/signout', request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/clinical/:path*', '/clinical/subject/:path*', '/'],
};
