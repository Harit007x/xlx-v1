import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { User } from '@repo/db';

// Helper function to validate user credentials
async function validateUser(username: string, password: string): Promise<{ data: null } | { data: User }> {
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  const baseUrl = process.env.API_BASE_URL || 'http://localhost:3000'; // Use environment variable for the base URL
  const url = `${baseUrl}/api/login`;
  const headers = {
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    'Client-Service': process.env.CLIENT_SERVICE_KEY || 'default-client-service', // Use environment variables
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    'Auth-Key': process.env.AUTH_SECRET || 'AUTH_SECRET', // Use environment variables
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  
  const body = new URLSearchParams();
  body.append('username', username);
  body.append('password', password);
  console.log('making an apir calll ok', url)
  try {
    const response = await axios.post(url, body, { headers });
    console.log('res pom of call =', response)
    if (response.data.status === 401) {
      throw new Error(`Authentication failed: ${response.data.message}`);
    }

    return response as any; // Cast as needed
  } catch (error) {
    console.error('Error validating user:', error);
    return { data: null }; // Return null on error
  }
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
          const user = await validateUser(credentials.username, credentials.password);
          if (user.data !== null) {
            return user.data;
          }
          return null; // Return null if user data could not be retrieved
        } catch (e) {
          console.error('Error in authorize:', e);
          return null;
        }
      },
    }),
  ],
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  secret: process.env.NEXTAUTH_SECRET, // Use environment variable
  callbacks: {
    session: async ({ session, token }: any) => {
      if (session?.user) {
        session.user = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.uid = user;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
  },
};
