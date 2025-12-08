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

export function QuestionForm() {
  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: "",
    },
  });

  function onSubmit(data: QuestionFormValues) {
    console.log(data);
  }

  return (
    <div className="bg-white dark:bg-[#11141C] transition pt-9 pr-11 pb-9 pl-11">
      <h1 className="text-3xl font-bold text-color-foreground mb-8">
        Ask a public question
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-color-foreground">
                  Question Title <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Be specific and imagine you're asking a question to another person."
                    className="bg-white dark:bg-muted border-[#DCE3F1] dark:border-border text-color-foreground placeholder:text-muted-foreground"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-color-foreground">
                  Detailed explanation of your problem?{" "}
                  <span className="text-primary">*</span>
                </FormLabel>

                <div className="flex items-center gap-1 border border-[#DCE3F1] dark:border-border rounded-t-lg bg-light-800 dark:bg-muted px-3 py-2">
                  {editorTools.map((tool, index) => (
                    <button
                      key={index}
                      type="button"
                      className="p-2 hover:bg-white dark:hover:bg-dark-400 rounded transition-colors"
                      title={tool.label}
                    >
                      <tool.icon className="w-4 h-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>

                <FormControl>
                  <Textarea
                    placeholder="Introduce the problem and expand on what you put in the title. Minimum 20 characters."
                    className="min-h-[300px] bg-white dark:bg-muted border-[#DCE3F1] dark:border-border rounded-t-none text-color-foreground placeholder:text-muted-foreground resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs text-primary">
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
                <FormLabel className="text-base font-semibold text-color-foreground">
                  Tags <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Add up to 5 tags to describe what your question is about. Start typing to see suggestions."
                    className="bg-white dark:bg-muted border-[#DCE3F1] dark:border-border text-color-foreground placeholder:text-muted-foreground"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs text-primary">
                  Add up to 5 tags to describe what your question is about.
                  Start typing to see suggestions.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-start">
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
            >
              Ask a Question
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
