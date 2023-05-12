import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export { default } from "next-auth/middleware"

import { signOut } from 'next-auth/react'

// This function can be marked `async` if using `await` inside
const LOGIN_PAGE = '/'
export async function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl 
  const { matcher } = config 
    //Page url 외의 요청은 Pass한다.
  if (!matcher.includes(pathname)) {
    return NextResponse.next()
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  //로그인 페이지, 토큰이 있으면 대시보드로
  if (request.nextUrl.pathname.startsWith('/')) {
    if(token?.accessToken){
      return NextResponse.rewrite(new URL('/dashboard', request.url));
    }
  }
  

  if(!token?.accessToken){
    await signOut({ callbackUrl: "/" });
    //return NextResponse.redirect(new URL(LOGIN_PAGE, request.url))
  }

  return NextResponse.next()

}


export const config = {
  matcher: [
    '/dashboard', 
    '/'
  ], 
}
