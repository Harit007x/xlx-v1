import { z } from 'zod';
import { questionsSchema, sessionMessagesSchema, sessionSchema, verifySessionSchema,  } from './schema';
import { ActionState } from '../../lib/create-safe-action';
import { Session } from '@prisma/client';
import { Room } from '@repo/xlx';

export type InputTypeSession = z.infer<typeof sessionSchema>;
export type VerifySessionSchema = z.infer<typeof verifySessionSchema>;
export type SessionMessagesSchema = z.infer<typeof sessionMessagesSchema>;
export type SessionQuestionsSchema = z.infer<typeof questionsSchema>;

export type CreateReturnTypeSession = ActionState<InputTypeSession,Session>;
export type GetReturnTypeSingleSession = ActionState<InputTypeSession,Session>;
export type GetReturnTypeSession = ActionState<InputTypeSession,Session[]>;
export type VerifyTypeSession = ActionState<VerifySessionSchema, Room>;
export type GetSessionMessages = ActionState<SessionMessagesSchema, SessionMessagesSchema[]>;
export type GetSessionQuestions = ActionState<SessionQuestionsSchema, SessionQuestionsSchema[]>;
