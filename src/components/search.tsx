"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { HighlightWithinTextarea } from "react-highlight-within-textarea";

function getTotalOccurrences(text: string, search: string) {
  if (!search) return 0;
  return text.split(search).length - 1;
}

function getWords(text: string) {
  const lines = text.split("\n");
  let count = 0;
  for (const line of lines) {
    if (line === "\r") continue;
    for (const word of line.split(" ")) {
      if (word !== "" && word !== "\r") count++;
    }
  }
  return count;
}

export default function Search({
  text,
  handleReset,
}: {
  text: string;
  handleReset(): void;
}) {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="container flex grow flex-col items-center justify-center">
      <div className="relative w-full">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="h-10 w-full rounded-lg bg-secondary p-4 pr-10 text-primary"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full w-10"
        >
          <SearchIcon />
        </Button>
      </div>

      <div className="mt-8 flex w-full justify-between">
        <p className="text-primary">
          Total Occurrences: {getTotalOccurrences(text, search)}
        </p>
        <p className="text-primary">Total Words: {getWords(text)}</p>
      </div>

      <div className="my-8 w-full grow">
        {search ? (
          <HighlightWithinTextarea
            value={text}
            highlight={search ?? ""}
            readOnly
          />
        ) : (
          <div className="w-full rounded-lg bg-secondary p-4 text-primary break-words whitespace-pre-wrap">
            {text}
          </div>
        )}
      </div>

      <Button
        onClick={() => {
          setSearch("");
          handleReset();
        }}
        className="mb-8"
      >
        Upload Another File
      </Button>
    </div>
  );
}
