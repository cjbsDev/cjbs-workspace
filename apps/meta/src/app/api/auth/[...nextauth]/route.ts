import NextAuth from "next-auth"
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "next-auth-it";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    return NextAuth(req, res, authOptions(req))
}

// const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

