import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
var ObjectId = require("mongoose").Types.ObjectId;

import connectDb from "db/config/index";
import User from "db/models/User.model";
import Business from "db/models/Business.model";

// OTHER
import { subdomainFromName } from "utils/utils";

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

          console.log("-> userData: ", userData);

          let user = null;

          // REQUESTER IS A CLIENT USER
          if (userData.userType === "CLIENT") {
            user = await User.findOne({
              email: userData.email,
              businessId: new ObjectId(userData.businessId),
            });

            if (!user) {
              user = await new User(userData);
              user.save();
            }

            // REQUESTER IS A BUSINESS USER
          } else if (userData.userType === "BUSINESS") {
            user = await User.findOne({
              email: userData.email,
            });

            if (!user) {
              // TODO: add a subdomain in here
              const subdomain = subdomainFromName(businessData.name);
              const business = await new Business({
                ...businessData,
                subdomain,
              });
              business.save();
              user = await new User({ ...userData, businessId: business.id });
              user.save();
            }
          }

          if (user) {
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
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
