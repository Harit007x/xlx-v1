import { z } from 'zod';
import { userRegisterSchema } from './schema';
import { ActionState } from '../../lib/create-safe-action';
import { User } from '@repo/db';

export type InputTypeRegisterUser = z.infer<typeof userRegisterSchema>
export type ReturnTypeRegisterUser = ActionState<InputTypeRegisterUser, User>
