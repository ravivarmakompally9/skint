import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  trustHost: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: false,
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = (user as any).id || (user as any).email || ''
        token.role = (user as any).role || 'student'
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        (session.user as any).id = (token.id as string) || ''
        ;(session.user as any).role = (token.role as string) || 'student'
      }
      return session
    },
    async signIn({ user, account, profile }) {
      // Allow OAuth sign-in without database persistence
      return true
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  secret: process.env.NEXTAUTH_SECRET || 'dev-secret-change-me',
}

export default authOptions
