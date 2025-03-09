export interface FileData {
  name: string;
  type: string;
  data: string;
}

export interface FileService {
  encodeFileAsBase64(file: File): Promise<string>;
  validateFile(file: File): boolean;
  prepareFilesForUpload(files: File[]): Promise<FileData[]>;
}

export class PDFFileService implements FileService {
  private readonly maxFileSizeMB: number;
  private readonly allowedFileTypes: string[];

  constructor(maxFileSizeMB = 5, allowedFileTypes = ["application/pdf"]) {
    this.maxFileSizeMB = maxFileSizeMB;
    this.allowedFileTypes = allowedFileTypes;
  }

  encodeFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  validateFile(file: File): boolean {
    return (
      this.allowedFileTypes.includes(file.type) &&
      file.size <= this.maxFileSizeMB * 1024 * 1024
    );
  }

  async prepareFilesForUpload(files: File[]): Promise<FileData[]> {
    const validFiles = files.filter((file) => this.validateFile(file));

    return Promise.all(
      validFiles.map(async (file) => ({
        name: file.name,
        type: file.type,
        data: await this.encodeFileAsBase64(file),
      }))
    );
  }
}
