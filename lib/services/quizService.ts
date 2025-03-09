import { generateQuizTitle as fetchQuizTitle } from "@/app/(preview)/actions";
import { QuestionSchema } from "@/lib/schemas";
import { FileData } from "./fileService";

export interface QuizService {
  generateQuiz(fileData: FileData[]): Promise<void>;
  generateQuizTitle(fileName: string): Promise<string>;
}

// This is just an interface for the API client
// The actual implementation happens in the app/api route
export class APIQuizService implements QuizService {
  private readonly apiEndpoint: string;
  private onError: (error: Error) => void;
  private onProgress: (questions: QuestionSchema[]) => void;
  private onFinish: (questions: QuestionSchema[]) => void;

  constructor(
    apiEndpoint: string,
    onProgress: (questions: QuestionSchema[]) => void,
    onFinish: (questions: QuestionSchema[]) => void,
    onError: (error: Error) => void
  ) {
    this.apiEndpoint = apiEndpoint;
    this.onProgress = onProgress;
    this.onFinish = onFinish;
    this.onError = onError;
  }

  async generateQuiz(fileData: FileData[]): Promise<void> {
    try {
      // The actual implementation is handled by the AI SDK and
      // the experimental_useObject hook in the component
      // This is just a placeholder for the service interface
    } catch (error) {
      this.onError(error instanceof Error ? error : new Error(String(error)));
    }
  }

  async generateQuizTitle(fileName: string): Promise<string> {
    try {
      return await fetchQuizTitle(fileName);
    } catch (error) {
      this.onError(error instanceof Error ? error : new Error(String(error)));
      return "Quiz";
    }
  }
}
