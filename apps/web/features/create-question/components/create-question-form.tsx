"use client";

import { useCreateQuestionForm } from "../hooks/use-create-question-form";
import { useCreateQuestionMutation } from "../hooks/use-create-question.mutation";
import { CreateQuestionValues } from "../schemas/create-question.schema";
import { FormProvider, useFormContext } from "react-hook-form";
// Assuming you have these UI components in your codebase based on the request context
// adapting to standard HTML elements for now to ensure it works without specific UI library dependencies
// but structuring it so it can be easily swapped with Shadcn UI components.
import { useRouter } from "next/navigation";

// Form Field Component for better organization and preventing re-renders of the whole form on field change
// In a real app with Shadcn, this would be the FormField component
const FormFieldRaw = ({
    name,
    label,
    type = "text",
    placeholder,
}: {
    name: keyof CreateQuestionValues;
    label: string;
    type?: string;
    placeholder?: string;
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext<CreateQuestionValues>();

    const error = errors[name];

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="text-sm font-medium">
                {label}
            </label>
            {/* 
        Using 'register' makes this uncontrolled, which is better for performance.
        It doesn't cause re-renders on every keystroke like a controlled state would.
      */}
            {name === "explanation" ? (
                <textarea
                    id={name}
                    {...register(name)}
                    placeholder={placeholder}
                    className="rounded-md border p-2"
                    rows={5}
                />
            ) : name === "tags" ? (
                // Simple implementation for tags for now, assuming comma separated for this raw input
                // Ideally this would be a more complex controlled component with a Controller,
                // but strictly following "Controller ONLY when input not uncontrolled" rule.
                // However, arrays usually need Controller. Let's try to stick to native for zero-dep first
                // but 'tags' in schema is string[].
                // For string[] we usually need a Controller or a custom register hack.
                // Let's use a simple Controller just for this array field as strictly permitted by rules.
                <TagsInput name={name} placeholder={placeholder} />
            ) : (
                <input
                    id={name}
                    type={type}
                    {...register(name as "title")}
                    placeholder={placeholder}
                    className="rounded-md border p-2"
                />
            )}
            {error && <span className="text-red-500 text-xs">{error.message}</span>}
        </div>
    );
};

// Separate component for Tags to isolate re-renders if it were more complex
import { Controller } from "react-hook-form";

const TagsInput = ({
    name,
    placeholder,
}: {
    name: "tags";
    placeholder?: string;
}) => {
    const { control } = useFormContext<CreateQuestionValues>();
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange, ...field }, fieldState: { error } }) => (
                <div className="flex flex-col gap-2">
                    {/*
             Simplified UI for tags: treating it as a comma-separated string for input,
             parsing it to an array for the form state.
           */}
                    <input
                        {...field}
                        value={value?.join(", ") || ""}
                        onChange={(e) => {
                            const val = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
                            onChange(val);
                        }}
                        placeholder={placeholder}
                        className="rounded-md border p-2"
                    />
                    <p className="text-xs text-gray-500">Separate tags with commas</p>
                </div>
            )}
        />
    );
};

export const CreateQuestionForm = () => {
    const { form } = useCreateQuestionForm();
    const { mutate, isPending } = useCreateQuestionMutation();
    const router = useRouter();

    const onSubmit = (values: CreateQuestionValues) => {
        mutate(values, {
            onSuccess: () => {
                form.reset();
                // createQuestionMutation handles query invalidation
                // Here we can handle navigation
                router.push("/");
            },
        });
    };

    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-full max-w-2xl bg-white p-6 rounded-lg shadow-sm"
            >
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Ask a Question</h2>
                    <p className="text-gray-500">Be specific and imagine you&apos;re asking a question to another person.</p>
                </div>

                <FormFieldRaw
                    name="title"
                    label="Question Title"
                    placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                />

                <FormFieldRaw
                    name="explanation"
                    label="Detailed Explanation of Your Problem"
                    placeholder="Describe your logical code, including any alternatives you've tried..."
                />

                <FormFieldRaw
                    name="tags"
                    label="Tags"
                    placeholder="e.g. valid, arguments, verify"
                />

                <button
                    type="submit"
                    disabled={isPending}
                    className="px-4 py-2 bg-primary text-white bg-black rounded-md disabled:opacity-50 hover:opacity-90 transition-opacity"
                >
                    {isPending ? "Submitting..." : "Ask Question"}
                </button>
            </form>
        </FormProvider>
    );
};
