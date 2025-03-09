import { QuestionSchema, questionsSchema } from "@/lib/schemas";
import { experimental_useObject } from "@ai-sdk/react";
import { useState } from "react";
import { toast } from "sonner";
import { FileData } from "../services/fileService";

interface UseQuizGenerationOptions {
  apiEndpoint: string;
}

interface UseQuizGenerationReturn {
  questions: QuestionSchema[];
  partialQuestions: QuestionSchema[] | undefined;
  isLoading: boolean;
  title: string | undefined;
  setTitle: (title: string) => void;
  generateQuiz: (fileData: FileData[]) => void;
  clearQuiz: () => void;
  progress: number;
}

export function useQuizGeneration({
  apiEndpoint,
}: UseQuizGenerationOptions): UseQuizGenerationReturn {
  const [questions, setQuestions] = useState<QuestionSchema[]>([]);
  const [title, setTitle] = useState<string>();

  const {
    submit,
    object: partialQuestions,
    isLoading,
  } = experimental_useObject({
    api: apiEndpoint,
    schema: questionsSchema,
    initialValue: undefined,
    onError: (error) => {
      toast.error("Failed to generate quiz. Please try again.");
    },
    onFinish: ({ object }) => {
      setQuestions(object ?? []);
    },
  });

  const generateQuiz = (fileData: FileData[]) => {
    submit({ files: fileData });
  };

  const clearQuiz = () => {
    setQuestions([]);
  };

  const progress = partialQuestions ? (partialQuestions.length / 4) * 100 : 0;

  return {
    questions,
    partialQuestions: partialQuestions as QuestionSchema[] | undefined,
    isLoading,
    title,
    setTitle,
    generateQuiz,
    clearQuiz,
    progress,
  };
}
