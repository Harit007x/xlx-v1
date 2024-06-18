import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { User } from '@prisma/client';

async function validateUser(username: string, password: string): Promise<{ data: null } | { data: User }> {
  // if (false) {
  //   if (password === '123456') {
  //     return {
  //       data: {
  //         id: 1,
  //         username: "randomUser",
  //         password: "temp",
  //         email: "temp@gmail.com",
  //         first_name: "temp",
  //         last_name: "user"
  //       },
  //     };
  //   }
  //   return { data: null };
  // }
  const url = 'http://localhost:3000/api/login';
  const headers = {
    'Client-Service': '',
    'Auth-Key': 'AUTH_SECRET',
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const body = new URLSearchParams();
  body.append('username', username);
  body.append('password', password);

  try {
    // const response = await fetch(url, {
    //   method: 'POST',
    //   headers,
    //   body,
    // });
    const response = await axios.post(url, body, { headers });

    if (response.data.status === 401) {
      throw new Error(`HTTP error! Status: ${response.data.status}`);
    }

    return response as any; // Or process data as needed
  } catch (error) {
    console.error('Error validating user:', error);
  }
  return {
    data: null,
  };
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: { label: 'email', type: 'text', placeholder: '' },
        password: { label: 'password', type: 'password', placeholder: '' },
      },
      async authorize(credentials: any): Promise<any> {
        try {
          //@ts-ignore
          const user = await validateUser(credentials.username, credentials.password);
          if (user.data !== null) {
            return user.data;
          }
          // Return null if user data could not be retrieved
          return null;
        } catch (e) {
          console.error('error = ', e);
        }
        return null;
      },
    }),
  ],
  secret: 'NEXTAUTH_SECRET' || 'secr3t',
  callbacks: {
    session: async ({ session, token }: any) => {
      if (session?.user) {
        session.user = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }: any) => {
      if (user) {
        // const { password: newPassword, email: newEmail,  ...rest } = user;
        token.uid = user;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
  },
};
