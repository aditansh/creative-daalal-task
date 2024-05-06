"use client";

import Search from "@/components/search";
import { UploadModal } from "@/components/upload-modal";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [file, setFile] = useState<File>();
  const [state, setState] = useState<"upload" | "search">("upload");
  const [text, setText] = useState<string>("");

  function handleReset() {
    setFile(undefined);
    setState("upload");
    setText("");
  }

  return (
    <main className="flex h-[90vh] flex-col">
      <ToastContainer />
      <div className="flex h-full flex-col items-center text-lg text-muted-foreground">
        {state === "upload" && (
          <UploadModal
            file={file}
            setFile={setFile}
            setState={setState}
            setText={setText}
          />
        )}
        {state === "search" && <Search text={text} handleReset={handleReset} />}
      </div>
    </main>
  );
}
