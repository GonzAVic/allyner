import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import connectDb from "db/config/index";

export const authOptions = {
  secret: "process.env.JWT_SECRET",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("-> credentials: ", credentials);
        await connectDb();
        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  // events: {
  //   async signIn(props) {
  //     await connectDb();
  //     const { user, account, profile } = props;
  //   },
  // },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.token,
          refreshToken: user.refreshToken,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires;

      return session;
    },
  },
  secret: "Kos6GwAvJb1Fs+UB7zRSNN1TuUa5MCk4YMncUCu2OhY=",
};

export default NextAuth(authOptions);
