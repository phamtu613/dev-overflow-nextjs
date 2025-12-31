import { z } from "zod";

export const CreateQuestionSchema = z.object({
    title: z
        .string()
        .min(5, { message: "Title must be at least 5 characters." })
        .max(130, { message: "Title cannot exceed 130 characters." }),
    explanation: z
        .string()
        .min(20, { message: "Explanation must be at least 20 characters." }),
    tags: z
        .array(z.string().min(1).max(15))
        .min(1, { message: "At least 1 tag is required." })
        .max(3, { message: "Cannot add more than 3 tags." }),
});

export type CreateQuestionValues = z.infer<typeof CreateQuestionSchema>;
