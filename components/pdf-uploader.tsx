import { FileUp } from "lucide-react";
import React from "react";

interface PDFUploaderProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  files: File[];
}

export function PDFUploader({ onFileChange, files }: PDFUploaderProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 transition-colors hover:border-muted-foreground/50`}
    >
      <input
        type="file"
        onChange={onFileChange}
        accept="application/pdf"
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
      <FileUp className="h-8 w-8 mb-2 text-muted-foreground" />
      <p className="text-sm text-muted-foreground text-center">
        {files.length > 0 ? (
          <span className="font-medium text-foreground">{files[0].name}</span>
        ) : (
          <span>Drop your PDF here or click to browse.</span>
        )}
      </p>
    </div>
  );
}
