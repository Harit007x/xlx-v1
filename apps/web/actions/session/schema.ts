import * as z from "zod"

export const sessionSchema = z.object({
    name: z.string()
        .min(1, 'Session Name is required')
        .min(4, 'Session Name must be at least 6 characters')
        .max(20),
    description: z.string()
        .min(1, 'Description is required')
        .min(4, 'Description must be at least 6 characters')
        .max(250),
    schedule_date_time: z.date({
        required_error: 'Schedule date and time is required',
        invalid_type_error: 'Invalid date format',
    }),
    is_auto: z.boolean().default(false),
    password: z.string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters'),
    tags: z.array(z.object({
        value: z.string(),
        label: z.string(),
        })).optional(),
});