import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb'

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Anonymous',
      credentials: {},
      async authorize(credentials, req) {
        // Create a guest user with a random ID
        return { id: 'anon-' + Math.random().toString(36).substring(2, 15), name: 'Guest', email: null }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token, user }) {
      if (token) {
        session.user.id = token.sub
      }
      return session
    },
  },
})

export { handler as GET, handler as POST } 