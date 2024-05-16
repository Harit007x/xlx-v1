import * as z from "zod"

export const sessionSchema = z.object({
    name: z.string()
        .min(1, 'Session Name is required')
        .min(4, 'Session Name must be at least 6 characters')
        .max(20),
    description: z.string()
        .min(1, 'Description is required')
        .min(4, 'Description must be at least 6 characters')
        .max(10),
    schedule_date_time: z.string()
        .refine((dateTime) => dateTime.trim() !== '', {
            message: 'Schedule Date Time is required',
        }),
    tags: z.array(z.string())
        .min(1, 'At least one tag is required'),
    is_auto: z.boolean().default(false).optional(),
    password: z.string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters')
});