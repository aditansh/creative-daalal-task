"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Dispatch, type SetStateAction, createRef, useState } from "react";
import icon from "@/assets/folder.svg";
import Image, { type StaticImageData } from "next/image";
import { toast } from "react-toastify";

export function UploadModal({
  file,
  setFile,
  setState,
  setText,
}: {
  file: File | undefined;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  setState: Dispatch<SetStateAction<"upload" | "search">>;
  setText: Dispatch<SetStateAction<string>>;
}) {
  const fileRef = createRef<HTMLInputElement>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    for (const i of e.target.files) {
      const type = i.name.split(".").pop();

      if (type !== "doc" && type !== "docx" && type !== "txt") {
        toast.error("Please upload appropriate file!");
        continue;
      } else {
        setFile(e.target.files[0]);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLInputElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;

    for (const i of droppedFiles) {
      const type = i.name.split(".").pop();
      if (type !== "doc" && type !== "docx" && type !== "txt") {
        toast.error("Please upload appropriate file!");
        continue;
      } else setFile(droppedFiles[0]);
    }
  };

  function getText() {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function () {
      setIsSubmitting(true);
      const contents = reader.result;
      console.log(contents);
      setText(contents as string);
      setState("search");
      setIsSubmitting(false);
    };
    reader.readAsText(file);
  }

  return (
    <div className="w-full pt-8 md:pt-12">
      <div
        className={`modal relative mx-auto mt-10 flex w-3/4 flex-col items-center justify-center rounded-lg border-4 border-transparent bg-background bg-clip-padding px-4 py-10 ${
          isSubmitting ? "" : "cursor-pointer"
        }`}
        onClick={() => {
          if (fileRef.current) fileRef.current.click();
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <button disabled={isSubmitting}>
          <Image
            src={icon as StaticImageData}
            alt=""
            width={100}
            height={100}
            className={file ? "opacity-50" : "animate-pulse"}
          />
        </button>
        <p className="text-center leading-5 text-white">
          Drag and drop your
          <br /> .txt file or browse it!
        </p>
        {file && (
          <p className="py-4 text-sm text-muted-foreground">{file.name}</p>
        )}

        {file && (
          <Button
            className="mt-4 items-center border text-base hover:border-primary hover:bg-secondary hover:text-primary"
            disabled={isSubmitting}
            onClick={(e) => {
              e.stopPropagation();
              getText();
            }}
          >
            {isSubmitting ? "Uploading..." : "Upload"}
          </Button>
        )}

        <Input
          ref={fileRef}
          id="file"
          name="file"
          type="file"
          accept=".txt"
          className="hidden"
          disabled={isSubmitting}
          onChange={(e) => changeHandler(e)}
        />
      </div>
    </div>
  );
}
