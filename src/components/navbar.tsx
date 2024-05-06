import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="relative flex h-[10vh] items-center justify-center text-3xl font-semibold">
      <Link href="/">Text Search</Link>
    </div>
  );
}
