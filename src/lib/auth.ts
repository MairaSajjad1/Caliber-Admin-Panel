
import {
    getServerSession,
    User,
    type NextAuthOptions,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from 'axios';


export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SCRET,

    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                mobile_no: { label: "mobile_no", type: "text", placeholder: "mobile_no" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any,) {
                const { mobile_no, password } = credentials as {
                    mobile_no: string
                    password: string
                };

                try {
                    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/loginwithoutOtp`, {
                        mobile_no,
                        password
                    })

                    return data.data[0] as User
                } catch (error) {
                    return null
                }

            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        session({ session, token }) {
            session.user = token;
            return session;
        },
    },
    pages: {
        signIn: '/sign-in', //(4) custom signin page path
    },
};

export const getServerAuthSession = () => getServerSession(authOptions);  
