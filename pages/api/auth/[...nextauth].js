import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import connectDb from "db/config/index";
import User from "db/models/User.model";
import Business from "db/models/Business.model";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(cred, req) {
        try {
          const signupData = JSON.parse(cred.email);
          const { userData, businessData } = signupData;
          await connectDb();

          let user = await User.findOne({ email: userData.email });

          // REQUESTER IS A CLIENT USER
          if (userData.userType === "CLIENT") {
            console.log("-> userData: ", userData);
            user = await new User(userData);
            console.log("-> user: ", user);
            user.save();

            // REQUESTER IS A BUSINESS USER
          } else if (userData.userType === "BUSINESS") {
            const business = await new Business(businessData);
            business.save();
            user = await new User({ ...userData, businessId: business.id });
            user.save();
          }

          if (user) {
            console.log("-> user: ", user);
            const userData = {
              email: user.email,
              name: user.firstname,
              id: user.id,
            };
            return userData;
          } else {
            console.log("-> no user");
            // If you return null then an error will be displayed advising the user to check their details.
            return null;

            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } catch (error) {
          console.log("-> error: ", error);
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
  secret: "mysimplesecretkey",
};

export default NextAuth(authOptions);
