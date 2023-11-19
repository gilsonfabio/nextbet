import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const nextAuthOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' }
			},

			async authorize(credentials, req) {
				const response = await fetch('http://localhost:3333/signIn', {
					method: 'POST',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify({
						email: credentials?.email,
						password: credentials?.password
					})
				})

				const user = await response.json()
                console.log('Dados do usuário:',user)
				if (user && response.ok) {
					//console.log(user)
					return user
				}

				return null
			},
		})
	],
	pages: {
		signIn: '/'
	},
	callbacks: {
		//async jwt({ token, user }) {
		//	user && (token.user = user)
		//	return token
		//},

		async jwt({ token, user }) {
			const customUser = user as unknown as any
	  
			if (user) {        
			  return {
				...token,
				id: user.id,
				role: 'admin'   //customUser.role
			  }
			}
	  
			return token
		},
		
		async session({ session, token }) {
			session.user = token as any;
			return session;
		},
	}
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }