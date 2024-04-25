import { z } from 'zod';
import { userRegisterSchema } from './schema';

export type InputTypeRegisterUser = z.infer<typeof userRegisterSchema>;
