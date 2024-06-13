import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-8">
      <h1>404: Not Found</h1>
      <p className="text-2xl">
        Oops! The requested resource could not be found.
      </p>
      <Link href="/" className="underline text-2xl">
        Click here to return to the homepage.
      </Link>
    </div>
  );
}
