import { REGEXP_ONLY_DIGITS_AND_CHARS } from '@repo/ui/shadcn';
import * as z from 'zod';

export const sessionSchema = z.object({
  name: z.string().min(1, 'Session Name is required').min(6, 'Session Name must be at least 6 characters').max(20),
  description: z
    .string()
    .min(1, 'Description is required')
    .min(4, 'Description must be at least 6 characters')
    .max(250),
  schedule_date_time: z.date({
    required_error: 'Schedule date and time is required',
    invalid_type_error: 'Invalid date format',
  }),
  meeting_id: z.string().optional(),
  invitation_link: z.string().optional(),
  is_auto: z.boolean().default(false),
  password: z.string(),
  tags: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .optional(),
});

const roomIDRegex = new RegExp(REGEXP_ONLY_DIGITS_AND_CHARS);
export const verifySessionSchema = z.object({
  meeting_id: z
    .string()
    .min(10, 'Session Id must be 10 characters.'),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
});

export const sessionMessagesSchema = z.object({
  id: z.number(),
  created_at: z.date(),
  initials: z.string(),
  user_name: z.string(),
  message: z.string(),
  room_id: z.number(),
  user_id: z.number(),
});

export const questionsSchema = z.object({
  id: z.number(),
  is_disabled: z.boolean(),
  is_answered: z.boolean(),
  created_at: z.date(),
  user_name: z.string(),
  question: z.string(),
  up_vote_count: z.number(),
  down_vote_count: z.number(),
  room_id: z.number(),
  user_id: z.number(),
});
