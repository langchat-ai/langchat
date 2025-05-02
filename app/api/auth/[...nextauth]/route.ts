import NextAuth from "next-auth";
import AzureEntraIDProvider from "next-auth/providers/microsoft-entra-id";

const handler = NextAuth({
  providers: [
    AzureEntraIDProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid profile email",
          tenant: process.env.AZURE_AD_TENANT_ID,
        },
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
        };
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };