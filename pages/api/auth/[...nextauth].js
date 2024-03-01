import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch(process.env.NEXTAUTH_URL + "/api/login", {
                    method: 'POST',
                    body: JSON.stringify({ username: credentials.username, password: credentials.password }),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
                // console.log("Hellos", user)
                if (res.ok && user) {
                    return user
                }
                return null
            }
        })
    ],
    session: {
        jwt: true
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    secret: process.env.JWT_SECRET,
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                // console.log("user", user)
                token._id = user._id
                token.username = user.username
                token.name = user.name
                token.year = user.year
                token.ideathonParticipant = user.ideathonParticipant
                token.ideathonTeamId = user.ideathonTeamId
                token.admin = user.admin
            }
            return token
        },
        async session({session, token}) {
            // console.log("token", token)
            session.user._id = token._id
            session.user.username = token.username
            session.user.name = token.name
            session.user.year = token.year
            session.user.ideathonParticipant = token.ideathonParticipant
            session.user.ideathonTeamId = token.ideathonTeamId
            session.user.admin = token.admin
            return session
        }
    }
}

export default NextAuth({
    ...authOptions
})

export { authOptions }