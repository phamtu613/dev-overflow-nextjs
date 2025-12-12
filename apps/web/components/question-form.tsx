"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Bold,
  Code,
  Heading2,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const questionFormSchema = z.object({
  title: z
    .string()
    .min(20, "Title must be at least 20 characters")
    .max(130, "Title must be less than 130 characters"),
  explanation: z
    .string()
    .min(20, "Explanation must be at least 20 characters")
    .max(5000, "Explanation must be less than 5000 characters"),
  tags: z
    .string()
    .min(1, "At least one tag is required")
    .max(200, "Tags must be less than 200 characters"),
});

type QuestionFormValues = z.infer<typeof questionFormSchema>;

interface QuestionFormProps {
  mode?: "create" | "edit";
  questionId?: string;
  initialData?: {
    title: string;
    explanation: string;
    tags: string;
  };
}

const editorTools = [
  { icon: Bold, label: "Bold" },
  { icon: Italic, label: "Italic" },
  { icon: Heading2, label: "Heading" },
  { icon: Quote, label: "Quote" },
  { icon: Code, label: "Code" },
  { icon: Link2, label: "Link" },
  { icon: ImageIcon, label: "Image" },
  { icon: List, label: "Unordered List" },
  { icon: ListOrdered, label: "Ordered List" },
];

export function QuestionForm({
  mode = "create",
  questionId,
  initialData,
}: QuestionFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: initialData || {
      title: "",
      explanation: "",
      tags: "",
    },
  });

  async function onSubmit(data: QuestionFormValues) {
    setIsSubmitting(true);
    try {
      // TODO: Implement API call to create/update question
      console.log(
        `${mode === "create" ? "Creating" : "Updating"} question:`,
        data
      );

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect after success
      if (mode === "edit" && questionId) {
        router.push(`/profiles/ask-question/${questionId}`);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error(`Failed to ${mode} question:`, error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white pt-9 pr-11 pb-9 pl-11 transition dark:bg-[#11141C]">
      <h1 className="text-color-foreground mb-8 text-3xl font-bold">
        {mode === "create" ? "Ask a public question" : "Edit your question"}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-color-foreground text-base font-semibold">
                  Question Title <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Be specific and imagine you're asking a question to another person."
                    className="text-color-foreground border-[#DCE3F1] bg-white placeholder:text-muted-foreground dark:border-border dark:bg-muted"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                  Be specific and imagine you&apos;re asking a question to
                  another person.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-color-foreground text-base font-semibold">
                  Detailed explanation of your problem?{" "}
                  <span className="text-primary">*</span>
                </FormLabel>

                <div className="flex items-center gap-1 rounded-t-lg border border-[#DCE3F1] bg-gray-50 px-3 py-2 dark:border-border dark:bg-muted">
                  {editorTools.map((tool, index) => (
                    <button
                      key={index}
                      type="button"
                      className="rounded p-2 transition-colors hover:bg-white dark:hover:bg-dark-400"
                      title={tool.label}
                    >
                      <tool.icon className="size-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>

                <FormControl>
                  <Textarea
                    placeholder="Introduce the problem and expand on what you put in the title. Minimum 20 characters."
                    className="text-color-foreground min-h-[300px] resize-none rounded-t-none border-[#DCE3F1] bg-white placeholder:text-muted-foreground dark:border-border dark:bg-muted"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                  Introduce the problem and expand on what you put in the title.
                  Minimum 20 characters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-color-foreground text-base font-semibold">
                  Tags <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Add up to 5 tags to describe what your question is about. Start typing to see suggestions."
                    className="text-color-foreground border-[#DCE3F1] bg-white placeholder:text-muted-foreground dark:border-border dark:bg-muted"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                  Add up to 5 tags to describe what your question is about.
                  Start typing to see suggestions.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-linear-to-r from-primary to-[#E2995F] px-8 text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting
                ? mode === "create"
                  ? "Posting..."
                  : "Updating..."
                : mode === "create"
                  ? "Ask a Question"
                  : "Update Question"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
