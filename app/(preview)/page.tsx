"use client";

import { DragDropZone } from "@/components/drag-drop-zone";
import { PDFUploader } from "@/components/pdf-uploader";
import Quiz from "@/components/quiz";
import { QuizGenerationProgress } from "@/components/quiz-generation-progress";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { useFileUpload } from "@/lib/hooks/useFileUpload";
import { useQuizGeneration } from "@/lib/hooks/useQuizGeneration";
import { FileUp, Loader2, Plus } from "lucide-react";
import { generateQuizTitle } from "./actions";

export default function ChatWithFiles() {
  // Use our custom hooks for better separation of concerns
  const {
    files,
    isDragging,
    setIsDragging,
    handleFileChange,
    prepareFilesForUpload,
    clearFiles,
  } = useFileUpload();

  const {
    questions,
    partialQuestions,
    isLoading,
    title,
    setTitle,
    generateQuiz,
    clearQuiz,
    progress,
  } = useQuizGeneration({
    apiEndpoint: "/api/generate-quiz",
  });

  const handleSubmitWithFiles = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const encodedFiles = await prepareFilesForUpload();
    generateQuiz(encodedFiles);

    if (encodedFiles.length > 0) {
      const generatedTitle = await generateQuizTitle(encodedFiles[0].name);
      setTitle(generatedTitle);
    }
  };

  const clearPDF = () => {
    clearFiles();
    clearQuiz();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange({
      target: { files: e.dataTransfer.files },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  if (questions.length === 4) {
    return (
      <Quiz title={title ?? "Quiz"} questions={questions} clearPDF={clearPDF} />
    );
  }

  return (
    <DragDropZone
      isDragging={isDragging}
      onDragOver={handleDragOver}
      onDragExit={() => setIsDragging(false)}
      onDragEnd={() => setIsDragging(false)}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <Card className="w-full max-w-md h-full border-0 sm:border sm:h-fit mt-12">
        <CardHeader className="text-center space-y-6">
          <div className="mx-auto flex items-center justify-center space-x-2 text-muted-foreground">
            <div className="rounded-full bg-primary/10 p-2">
              <FileUp className="h-6 w-6" />
            </div>
            <Plus className="h-4 w-4" />
            <div className="rounded-full bg-primary/10 p-2">
              <Loader2 className="h-6 w-6" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">
              PDF Quiz Generator
            </CardTitle>
            <CardDescription className="text-base">
              Upload a PDF to generate an interactive quiz based on its content
              using the <Link href="https://sdk.vercel.ai">AI SDK</Link> and{" "}
              <Link href="https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai">
                Google&apos;s Gemini Pro
              </Link>
              .
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitWithFiles} className="space-y-4">
            <PDFUploader onFileChange={handleFileChange} files={files} />
            <Button
              type="submit"
              className="w-full"
              disabled={files.length === 0}
            >
              {isLoading ? (
                <span className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Generating Quiz...</span>
                </span>
              ) : (
                "Generate Quiz"
              )}
            </Button>
          </form>
        </CardContent>
        {isLoading && (
          <CardFooter className="flex flex-col space-y-4">
            <QuizGenerationProgress
              isLoading={isLoading}
              progress={progress}
              partialQuestions={partialQuestions}
            />
          </CardFooter>
        )}
      </Card>
    </DragDropZone>
  );
}
