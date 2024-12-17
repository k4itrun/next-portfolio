"use client";

import { Button } from "@/components/Button";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  return (
    <div className="flex flex-col items-center justify-center py-56 space-y-6">
      <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-color-layout to-white">
        500
      </h1>
      <p className="text-2xl text-gray-500 dark:text-gray-500">
        {error.message.toString() || "An unexpected error occurred."}
      </p>
      <Button variant="secondary" href="/">
        Back to top
      </Button>
    </div>
  );
}