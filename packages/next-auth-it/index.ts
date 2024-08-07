import mem from "mem";
import { RetrunRefreshAccessToken } from "./type/next-auth";
import type { NextAuthOptions } from "next-auth";
import { NextApiRequest } from "next";
import CredentialsProvider from "next-auth/providers/credentials";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

export const TOKEN_EALRY_EXPIRE_MINUTE = 10;

export const refreshAccessToken = mem(
  async (
    refreshToken: string,
    email: string,
    uid: number,
    authorities: string,
    serviceType: string,
  ): Promise<RetrunRefreshAccessToken> => {
    console.log("refreshAccessToken > ", refreshToken);
    console.log("serviceType > ", serviceType);

    let defaultUrl =
      serviceType === "orsh"
        ? `${process.env.NEXT_PUBLIC_API_URL_ORSH}/token/accessToken`
        : `${process.env.NEXT_PUBLIC_API_URL}/token/accessToken`;

    try {
      console.log("refreshToken@@@@", refreshToken);
      console.log("defaultUrl@@@@@", defaultUrl);

      const response = await fetch(defaultUrl, {
        method: "GET",
        headers: {
          emSW: refreshToken,
          "Accept-Language": "ko",
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      console.log("RESPONSE$$$$", responseData);

      if (!responseData.success) {
        console.log("실패!!!!!!!!!!!");

        return {
          refreshToken,
          error: "RefreshAccessTokenError",
        };
      }

      const data = responseData.data;

      const newToken: RetrunRefreshAccessToken = {
        email,
        uid,
        authorities,
        ...data,
      };
      console.log("토큰 갱신됨! ^^");
      return newToken;
    } catch (error) {
      console.log("ERROR => ", error);
      return {
        refreshToken,
        error: "RefreshAccessTokenError",
      };
    }
  },
  { maxAge: 500 },
);

// export const refreshAccessToken = mem(
//   (
//     refreshToken: string,
//     email: string,
//     uid: number,
//     authorities: string,
//     serviceType: string,
//   ): Promise<RetrunRefreshAccessToken> => {
//     console.log("refreshAccessToken > ", refreshToken);
//     console.log("serviceType > ", serviceType);
//
//     let defaultUrl = "";
//     if (serviceType && serviceType === "orsh") {
//       defaultUrl = `${process.env.NEXT_PUBLIC_API_URL_ORSH}/token/accessToken`;
//     } else {
//       defaultUrl = `${process.env.NEXT_PUBLIC_API_URL}/token/accessToken`;
//     }
//
//     return new Promise(async function (resolve, reject) {
//       try {
//         console.log("refreshToken@@@@", refreshToken);
//         console.log("defaultUrl@@@@@", defaultUrl);
//
//         const response = await fetch(defaultUrl, {
//           method: "GET",
//           headers: {
//             emSW: refreshToken,
//             "Accept-Language": "ko",
//             "Content-Type": "application/json",
//           },
//         });
//         //   .then((res) => {
//         //   console.log("res>> ", res);
//         //   res.json();
//         // });
//
//         const responseData = await response.json();
//
//         console.log("RESPONSE$$$$", responseData);
//
//         if (!responseData.success) {
//           console.log("실패!!!!!!!!!!!");
//
//           return resolve({
//             refreshToken,
//             error: "RefreshAccessTokenError",
//           });
//         }
//
//         const data = responseData.data;
//
//         const newToken: RetrunRefreshAccessToken = {
//           email,
//           uid,
//           authorities,
//           ...data,
//         };
//         console.log("�좏겙 媛깆떊��! ^^");
//         return resolve(newToken);
//       } catch (error) {
//         console.log("ERROR => ", error);
//         return resolve({
//           refreshToken,
//           error: "RefreshAccessTokenError",
//         });
//       }
//     });
//   },
//   { maxAge: 500 },
// );

// const updateToken = (token: any, setObject: any) => {
//   token.accessToken = setObject.accessToken;
//   token.atExpires = setObject.atExpires;
//   token.refreshToken = setObject.refreshToken;
//   token.rtExpires = setObject.rtExpires;
//   token.needInfo = setObject.needInfo;
//   token.email = setObject.email;
//   token.uid = setObject.userId;
//   token.authorities = setObject.authorities;
//   return token;
// };

const updateToken = (token: any, setObject: any) => {
  return {
    ...token,
    accessToken: setObject.accessToken,
    atExpires: setObject.atExpires,
    refreshToken: setObject.refreshToken,
    rtExpires: setObject.rtExpires,
    needInfo: setObject.needInfo,
    email: setObject.email,
    uid: setObject.userId,
    authorities: setObject.authorities,
  };
};

export const authOptions = (req: NextApiRequest): NextAuthOptions => ({
  providers: [
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "text" },
    //     password: { label: "Password", type: "password" },
    //     serviceType: { label: "", type: "text" },
    //   },
    //   async authorize(credentials, req) {
    //     console.log(credentials);
    //     try {
    //       const email = credentials?.email;
    //       const password = credentials?.password;
    //       const serviceType = credentials?.serviceType;
    //       if (!email || !password) {
    //         return null;
    //       }
    //       let defaultUrl = "";
    //       if (serviceType && serviceType === "orsh") {
    //         defaultUrl = `${process.env.NEXT_PUBLIC_API_URL_ORSH}/user/authenticate`;
    //       } else {
    //         defaultUrl = `${process.env.NEXT_PUBLIC_API_URL}/user/authenticate`;
    //       }
    //
    //       const response = await fetch(defaultUrl, {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //           "Accept-Language": "ko",
    //         },
    //         body: JSON.stringify({
    //           email,
    //           password,
    //         }),
    //       })
    //         .then((res) => {
    //           // console.log(res)
    //           return res.json();
    //         })
    //         .then((res) => {
    //           console.log(res);
    //           return res;
    //         });
    //
    //       // console.log('&&&&&&&&&&&&&', response)
    //       if (response.success) {
    //         return { ...response.data, serviceType };
    //       } else {
    //         throw new Error(response.message);
    //       }
    //     } catch (e: any) {
    //       console.log("e > ", e);
    //       throw new Error(e);
    //     }
    //   },
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        serviceType: { label: "Service Type", type: "text" },
      },
      async authorize(credentials) {
        const { email, password, serviceType } = credentials || {};

        if (!email || !password) {
          return null;
        }

        const defaultUrl =
          serviceType === "orsh"
            ? `${process.env.NEXT_PUBLIC_API_URL_ORSH}/user/authenticate`
            : `${process.env.NEXT_PUBLIC_API_URL}/user/authenticate`;

        try {
          const response = await fetch(defaultUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept-Language": "ko",
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (data.success) {
            return { ...data.data, serviceType };
          } else {
            throw new Error(data.message);
          }
        } catch (error) {
          console.log("Authorization error: ", error);
          throw new Error("Failed to authorize");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // if (user) {
      //   const tokenDto = user.tokenDto;
      //   token.accessToken = tokenDto.accessToken;
      //   token.atExpires = tokenDto.atExpires;
      //   token.refreshToken = tokenDto.refreshToken;
      //   token.rtExpires = tokenDto.rtExpires;
      //   token.needInfo = tokenDto.needInfo;
      //   token.email = user.email;
      //   token.uid = user.userId;
      //   token.serviceType = user.serviceType;
      //   token.authorities = user.authorities;
      // }

      if (user) {
        const tokenDto = user.tokenDto;
        token = {
          ...token,
          accessToken: tokenDto.accessToken,
          atExpires: tokenDto.atExpires,
          refreshToken: tokenDto.refreshToken,
          rtExpires: tokenDto.rtExpires,
          needInfo: tokenDto.needInfo,
          email: user.email,
          uid: user.userId,
          serviceType: user.serviceType,
          authorities: user.authorities,
        };
      }

      // let isAutoRefresh = false;
      // const url = req.url ? req.url : "";
      // if (url.indexOf("/api/auth/session?update") > -1) {
      //   console.log("force refresh run!");
      //
      //   isAutoRefresh = true;
      // }
      // const atExpires =
      //   user && user.tokenDto.atExpires
      //     ? user.tokenDto.atExpires
      //     : token.atExpires;
      // var expiredDate = dayjs.unix(atExpires! * 0.001).tz("Asia/Seoul");
      // var nowDate = dayjs();
      // const diffMinute = expiredDate.diff(nowDate, "s");

      const url = req.url || "";
      const isAutoRefresh = url.includes("/api/auth/session?update");

      // console.log("token.atExpires", token.atExpires);

      const atExpires = token.atExpires;
      const nowDate = dayjs();
      const expiredDate = dayjs(atExpires * 1000).tz("Asia/Seoul");
      // console.log("expiredDate", expiredDate);
      // const expiredDate2 = dayjs.unix(atExpires! * 0.001).tz("Asia/Seoul");
      // console.log("expiredDate2", expiredDate2);

      const diffMinutes = expiredDate.diff(nowDate, "minute");

      // if (
      //   (diffMinute && diffMinute <= TOKEN_EALRY_EXPIRE_MINUTE) ||
      //   isAutoRefresh
      // ) {
      //   const email: string =
      //     user && user.email ? user.email : token.email ? token.email : "";
      //   const uid: number = user && user.userId ? user.userId : token.uid;
      //   const authorities: string =
      //     user && user.authorities ? user.authorities : token.authorities;
      //   const serviceType: string =
      //     user && user.serviceType
      //       ? user.serviceType
      //       : token.serviceType
      //         ? token.serviceType
      //         : "";
      //
      //   const newToken = await refreshAccessToken(
      //     token.refreshToken!,
      //     email,
      //     uid,
      //     authorities,
      //     serviceType,
      //   );
      //
      //   if (newToken.error) {
      //     return newToken;
      //   }
      //
      //   return updateToken(token, newToken);
      // } else {
      //   return token;
      // }
      if (diffMinutes <= TOKEN_EALRY_EXPIRE_MINUTE || isAutoRefresh) {
        try {
          const newToken = await refreshAccessToken(
            token.refreshToken!,
            token.email!,
            token.uid!,
            token.authorities!,
            token.serviceType!,
          );

          if (newToken.error) {
            console.error("Token refresh error:", newToken.error);
            return newToken;
          }

          return updateToken(token, newToken);
        } catch (error) {
          console.error("Error refreshing token:", error);
          return {
            ...token,
            error: "TokenRefreshError",
          };
        }
      }

      return token;
    },
    async session({ session, token }) {
      session = {
        ...session,
        needInfo: token.needInfo,
        accessToken: token.accessToken!,
        atExpires: token.atExpires!,
        uid: token.uid,
        authorities: token.authorities,
      };
      return session;
    },
    // session: async ({ session, token }) => {
    //   // Here we pass accessToken to the client to be used in authentication with your API
    //   session.needInfo = token.needInfo;
    //   session.accessToken = token.accessToken!;
    //   session.atExpires = token.atExpires!;
    //   session.uid = token.uid;
    //   session.authorities = token.authorities;
    //   return session;
    // },
  },
  pages: {
    signIn: "/sign-in",
    signOut: "/signout",
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});
