import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuestion } from "../services/questions.api";
import { CreateQuestionValues } from "../schemas/create-question.schema";

export const useCreateQuestionMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateQuestionValues) => createQuestion(data),
        onSuccess: () => {
            // Invalidate questions list to refetch
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
    });
};
