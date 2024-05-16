import { z } from 'zod';
import { sessionSchema } from './schema';
import { ActionState } from '../../lib/create-safe-action';
import { Session } from '@prisma/client';

export type InputTypeSession = z.infer<typeof sessionSchema>;
export type ReturnTypeSession = ActionState<InputTypeSession,Session>;