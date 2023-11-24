import NextAuth, { NextAuthOptions } from "next-auth";
import { SanityAdapter } from "next-auth-sanity";
import GoogleProvider from "next-auth/providers/google";
import { sanityClient } from "../../../../sanity";

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: SanityAdapter(sanityClient),
};

export default NextAuth(options);
