import mem from 'mem';
import { RetrunRefreshAccessToken } from './type/next-auth';
import type { NextAuthOptions } from 'next-auth';
import { NextApiRequest } from 'next';
import CredentialsProvider from 'next-auth/providers/credentials';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

export const TOKEN_EALRY_EXPIRE_MINUTE = 60;

export const refreshAccessToken = mem(
  (refreshToken: string, email: string, uid: number, authorities: string): Promise<RetrunRefreshAccessToken> => {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token/accessToken`, {
          method: 'GET',
          headers: {
            emSW: refreshToken,
            'Accept-Language': 'ko',
          },
        }).then((res) => res.json());

        console.log('토큰 갱신 response > ', response);

        if (response.data.status === 401) {
          return resolve({
            refreshToken,
            error: 'RefreshAccessTokenError',
          });
        }

        const data = response.data;

        const newToken: RetrunRefreshAccessToken = {
          email,
          uid,
          authorities,
          ...data,
        };
        console.log('토큰 갱신됌! ^^');

        return resolve(newToken);
      } catch (error) {
        console.log('ERROR => ', error);
        return resolve({
          refreshToken,
          error: 'RefreshAccessTokenError',
        });
      }
    });
  },
  { maxAge: 500 },
);

const updateToken = (token: any, setObject: any) => {
  token.accessToken = setObject.accessToken;
  token.atExpires = setObject.atExpires;
  token.refreshToken = setObject.refreshToken;
  token.rtExpires = setObject.rtExpires;
  token.needInfo = setObject.needInfo;
  token.email = setObject.email;
  token.uid = setObject.userId;
  token.authorities = setObject.authorities;
  return token;
};

export const authOptions = (req: NextApiRequest): NextAuthOptions => ({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const email = credentials?.email;
          const password = credentials?.password;
          if (!email || !password) {
            return null;
          }

          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/authenticate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept-Language': 'ko',
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }).then((res) => res.json());

          if (response.success) {
            return response.data;
          } else {
            throw new Error(response.message);
          }
        } catch (e: any) {
          console.log('e > ', e);

          throw new Error(e);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        const tokenDto = user.tokenDto;
        token.accessToken = tokenDto.accessToken;
        token.atExpires = tokenDto.atExpires;
        token.refreshToken = tokenDto.refreshToken;
        token.rtExpires = tokenDto.rtExpires;
        token.needInfo = tokenDto.needInfo;
        token.email = user.email;
        token.uid = user.userId;
        token.authorities = user.authorities;
      }

      let isAutoRefresh = false;
      const url = req.url ? req.url : '';

      if (url.indexOf('/api/auth/session?update') > -1) {
        //업데이트로 실행되면 토큰부터 바로 갱신한다.
        isAutoRefresh = true;
      }
      const atExpires = user && user.tokenDto.atExpires ? user.tokenDto.atExpires : token.atExpires;
      var expiredDate = dayjs.unix(atExpires! * 0.001).tz('Asia/Seoul');
      var nowDate = dayjs();

      const diffMinute = expiredDate.diff(nowDate, 's');

      if ((diffMinute && diffMinute <= TOKEN_EALRY_EXPIRE_MINUTE) || isAutoRefresh) {
        const email: string = user && user.email ? user.email : token.email ? token.email : '';
        const uid: number = user && user.userId ? user.userId : token.uid;
        const authorities: string = user && user.authorities ? user.authorities : token.authorities;

        const newToken = await refreshAccessToken(token.refreshToken!, email, uid, authorities);

        return updateToken(token, newToken);
      } else {
        return token;
      }
      // If the call arrives after 23 hours have passed, we allow to refresh the token.
    },
    session: async ({ session, token }) => {
      // Here we pass accessToken to the client to be used in authentication with your API
      session.needInfo = token.needInfo;
      session.accessToken = token.accessToken!;
      session.atExpires = token.atExpires!;
      session.uid = token.uid;
      session.authorities = token.authorities;
      return session;
    },
  },
  pages: {
    signIn: '/',
    signOut: '/signout',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
});