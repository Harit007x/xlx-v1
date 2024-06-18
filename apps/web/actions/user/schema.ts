import * as z from 'zod';

export const userLoginSchema = z.object({
  username: z.string().min(1, 'Username is required').email('Invalid email').max(30),
  password: z.string().min(1, 'Password is required'),
});

export const userRegisterSchema = z.object({
  first_name: z.string().min(1, 'First Name is required').min(4, 'First Name must be at least 3 characters').max(10),
  last_name: z.string().min(1, 'Last Name is required').min(4, 'Last Name must be at least 3 characters').max(10),
  username: z.string().min(1, 'Username is required').email('Invalid email').max(30),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters').max(10),
});
