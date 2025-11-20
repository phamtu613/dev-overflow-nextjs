import { z } from "zod";

/**
 * Question Schema
 */
export const questionSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(200, "Title must not exceed 200 characters"),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(5000, "Description must not exceed 5000 characters"),
  tags: z
    .array(z.string())
    .min(1, "Please add at least one tag")
    .max(5, "You can add up to 5 tags"),
  code: z.string().optional(),
});

export type QuestionInput = z.infer<typeof questionSchema>;

/**
 * Answer Schema
 */
export const answerSchema = z.object({
  content: z
    .string()
    .min(50, "Answer must be at least 50 characters")
    .max(5000, "Answer must not exceed 5000 characters"),
  code: z.string().optional(),
});

export type AnswerInput = z.infer<typeof answerSchema>;

/**
 * Comment Schema
 */
export const commentSchema = z.object({
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(500, "Comment must not exceed 500 characters"),
});

export type CommentInput = z.infer<typeof commentSchema>;

