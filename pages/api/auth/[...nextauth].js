import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import connectDb from "db/config/index";
import User from "db/models/User.model";
import Business from "db/models/Business.model";

export const authOptions = {
  secret: "process.env.JWT_SECRET",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(cred, req) {
        const signupData = JSON.parse(cred.email);
        const { userData, businessData } = signupData;
        await connectDb();

        let user = await User.findOne({ email: userData.email });

        if (!user) {
          const business = await new Business(businessData);
          business.save();
          user = await new User({ ...userData, businessId: business.id });
          user.save();
        }

        if (user) {
          const userData = {
            email: user.email,
            name: user.firstname,
            id: user.id,
          };
          return userData;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.token,
          refreshToken: user.refreshToken,
          user,
        };
      }

      return token;
    },

    async session(data) {
      const { session, token } = data;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires;
      session.user = token.user;

      return session;
    },
  },
  secret: "Kos6GwAvJb1Fs+UB7zRSNN1TuUa5MCk4YMncUCu2OhY=",
};

export default NextAuth(authOptions);
