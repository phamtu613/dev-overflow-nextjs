import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    CreateQuestionSchema,
    CreateQuestionValues,
} from "../schemas/create-question.schema";

export const useCreateQuestionForm = () => {
    const form = useForm<CreateQuestionValues>({
        resolver: zodResolver(CreateQuestionSchema),
        defaultValues: {
            title: "",
            explanation: "",
            tags: [],
        },
        mode: "onSubmit", // Validate on submit for better performance
    });

    return { form };
};
