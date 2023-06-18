import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

console.log("-> LALALALALALALALALALALALALALA");

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize() {
        return {
          id: 1,
          name: "J Smith",
          email: "jsmith@example.com",
          image: "https://i.pravatar.cc/150?u=jsmith@example.com",
        };
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
