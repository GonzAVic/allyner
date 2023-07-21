import NextAuth from "next-auth";
import CryptoJS from "crypto-js";
import CredentialsProvider from "next-auth/providers/credentials";
var ObjectId = require("mongoose").Types.ObjectId;

import connectDb from "db/config/index";
import User from "db/models/User.model";
import Business from "db/models/Business.model";

// OTHER
import { subdomainFromName } from "utils/utils";

const encryptText = (textValue) => {
  const ecnryptedText = CryptoJS.AES.encrypt(
    String(textValue),
    "secret key 123"
  ).toString();
  return ecnryptedText;
};

const decryptText = (encryptedText) => {
  const bytes = CryptoJS.AES.decrypt(encryptedText, "secret key 123");
  const originalText = bytes.toString(CryptoJS.enc.Utf8);

  return originalText;
};

const createUserDataObj = (data) => {
  return {
    email: data.email,
    name: data.firstname,
    id: data.id,
  };
};

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
          const { userData, businessData, action } = signupData;
          await connectDb();

          let user = null;

          // REQUESTER IS A CLIENT USER
          if (userData.userType === "CLIENT") {
            user = await User.findOne({
              email: userData.email,
              businessId: new ObjectId(userData.businessId),
            });

            // SIGN IN
            if (action === "SIGNIN") {
              if (!user) return null;
              else {
                if (userData.password !== decryptText(user.passwordEncrypted)) {
                  return null;
                }
                return createUserDataObj(user);
              }
            } else {
              if (user) return null;
              else {
                const passwordEncrypted = encryptText(userData.password);
                user = await new User({ ...userData, passwordEncrypted });
                user.save();
                return createUserDataObj(user);
              }
            }

            // REQUESTER IS A BUSINESS USER
          } else if (userData.userType === "BUSINESS") {
            user = await User.findOne({
              email: userData.email,
            });

            // SIGN IN
            if (action === "SIGNIN") {
              if (!user) return null;
              else {
                if (userData.password !== decryptText(user.passwordEncrypted)) {
                  return null;
                }
                return createUserDataObj(user);
              }
            } else {
              if (user) return null;
              else {
                const subdomain = subdomainFromName(businessData.name);
                const business = await new Business({
                  ...businessData,
                  subdomain,
                });
                business.save();
                const passwordEncrypted = encryptText(userData.password);
                user = await new User({
                  ...userData,
                  businessId: business.id,
                  passwordEncrypted,
                });
                user.save();
                return createUserDataObj(user);
              }
            }
          }

          return null;
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
