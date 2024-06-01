import { z } from 'zod';
import { sessionSchema, verifySessionSchema } from './schema';
import { ActionState } from '../../lib/create-safe-action';
import { Session } from '@prisma/client';

export type InputTypeSession = z.infer<typeof sessionSchema>;
export type VerifySessionSchema = z.infer<typeof sessionSchema>;

export type CreateReturnTypeSession = ActionState<InputTypeSession,Session>;
export type GetReturnTypeSingleSession = ActionState<InputTypeSession,Session>;
export type GetReturnTypeSession = ActionState<InputTypeSession,Session[]>;
export type VerifyTypeSession = ActionState<VerifySessionSchema, {"is_verified": boolean}>;
