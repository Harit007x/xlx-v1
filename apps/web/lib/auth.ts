import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '../db';
import axios from 'axios';

async function validateUser(
  username: string,
  password: string,
): Promise<| { data: null }| { data: { firstname: string; userid: string; } }> {
  if (false) {
    console.log("hey", process.env.LOCAL_CMS_PROVIDER)
    if (password === '123456') {
      return {
        data: {
            firstname: 'Random',
            userid: '1',
        },
      };
    }
    return { data: null };
  }
  const url = 'http://localhost:3000/api/user';
  const headers = {
    'Client-Service': process.env.APPX_CLIENT_SERVICE || '',
    'Auth-Key': process.env.APPX_AUTH_KEY || '',
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const body = new URLSearchParams();
  body.append('username', username);
  body.append('password', password);

  console.log("called it bruhhh", body)
  try {
    // const response = await fetch(url, {
    //   method: 'POST',
    //   headers,
    //   body,
    // });
    console.log("pre body =", body)
    const response = await axios.post(url, body, { headers });

    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    console.log("res = ", response.data)
    // const data = await response.json();
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
          const user = await validateUser(
            credentials.username,
            credentials.password,
          );

          // const user = await db.user.findUnique({
          //   where: {
          //     username: credentials.username
          //   }
          // })

          // console.log("check = ", user )
          if (user) {
            // try {
            // //   await db.user.upsert({

            // //   });
            // } catch (e) {
            //   console.log(e);
            // }

            return {
              username: credentials.username,
              password: credentials.password
            };
          }
          // Return null if user data could not be retrieved
          return {username: credentials.username, password: credentials.password};
        } catch (e) {
          console.error("error = ", e);
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || 'secr3t',
  callbacks: {
    session: async ({ session, token }: any) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/signin',
  },
};
