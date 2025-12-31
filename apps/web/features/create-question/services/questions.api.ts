import { apiClient } from "@/lib/api-client";
import { CreateQuestionValues } from "../schemas/create-question.schema";

export const createQuestion = async (data: CreateQuestionValues) => {
    const response = await apiClient.post("/questions", data);
    return response.data;
};
