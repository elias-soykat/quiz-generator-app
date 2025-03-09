import { useState } from "react";
import { toast } from "sonner";
import { FileData, FileService, PDFFileService } from "../services/fileService";

interface UseFileUploadOptions {
  fileService?: FileService;
}

interface UseFileUploadReturn {
  files: File[];
  setFiles: (files: File[]) => void;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement> | { target: { files: FileList } }
  ) => void;
  prepareFilesForUpload: () => Promise<FileData[]>;
  clearFiles: () => void;
}

export function useFileUpload({
  fileService = new PDFFileService(),
}: UseFileUploadOptions = {}): UseFileUploadReturn {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement> | { target: { files: FileList } }
  ) => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari && isDragging) {
      toast.error(
        "Safari does not support drag & drop. Please use the file picker."
      );
      return;
    }

    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter((file) =>
      fileService.validateFile(file)
    );

    if (validFiles.length !== selectedFiles.length) {
      toast.error("Only PDF files under 5MB are allowed.");
    }

    setFiles(validFiles);
  };

  const prepareFilesForUpload = async (): Promise<FileData[]> => {
    if (files.length === 0) {
      return [];
    }

    return fileService.prepareFilesForUpload(files);
  };

  const clearFiles = () => {
    setFiles([]);
  };

  return {
    files,
    setFiles,
    isDragging,
    setIsDragging,
    handleFileChange,
    prepareFilesForUpload,
    clearFiles,
  };
}
