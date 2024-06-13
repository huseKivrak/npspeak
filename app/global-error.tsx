'use client';

import { Button } from '@nextui-org/react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex flex-col items-center gap-4">
        <h1 className="text-3xl underline">Oops! Something went wrong!</h1>
        <Button onClick={() => reset()} variant="flat">
          Try again
        </Button>
      </body>
    </html>
  );
}
