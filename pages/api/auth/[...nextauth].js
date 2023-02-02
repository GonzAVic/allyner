import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import connectDb from "db/config/index";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  events: {
    async signIn(props) {
      await connectDb();
      console.log("-> events props: ", props);
      const { user, account, profile } = props;
    },
  },
  secret: "Kos6GwAvJb1Fs+UB7zRSNN1TuUa5MCk4YMncUCu2OhY=",
};

export default NextAuth(authOptions);
