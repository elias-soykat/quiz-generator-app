## Folder Structure

```
lib/
  ├── hooks/
  │   ├── useFileUpload.ts       # Custom hook for file upload functionality
  │   └── useQuizGeneration.ts   # Custom hook for quiz generation
  ├── services/
  │   ├── fileService.ts         # Service for file operations
  │   └── quizService.ts         # Service for quiz generation
  └── schemas.ts                 # Data validation schemas
components/
  ├── drag-drop-zone.tsx         # Drag and drop container
  ├── pdf-uploader.tsx           # PDF file upload component
  ├── quiz-generation-progress.tsx # Progress indicator for quiz generation
  └── quiz.tsx                   # Quiz component
app/
  └── (preview)/
      ├── actions.ts             # Server actions
      └── page.tsx               # Main page component
```
