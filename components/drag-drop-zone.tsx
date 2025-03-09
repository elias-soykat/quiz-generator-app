import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type DragDropZoneProps = {
  isDragging: boolean;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragExit: () => void;
  onDragEnd: () => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
};

export default function DragDropZone({
  isDragging,
  onDragOver,
  onDragExit,
  onDragEnd,
  onDragLeave,
  onDrop,
  children,
}: DragDropZoneProps) {
  return (
    <div
      className="min-h-[100dvh] w-full flex justify-center"
      onDragOver={onDragOver}
      onDragExit={onDragExit}
      onDragEnd={onDragEnd}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <AnimatePresence>
        {isDragging && (
          <motion.div
            className="fixed pointer-events-none dark:bg-zinc-900/90 h-dvh w-dvw z-10 justify-center items-center flex flex-col gap-1 bg-zinc-100/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div>Drag and drop files here</div>
            <div className="text-sm dark:text-zinc-400 text-zinc-500">
              {"(PDFs only)"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}
