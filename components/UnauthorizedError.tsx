import Link from 'next/link';
import { FaRegCircleXmark } from 'react-icons/fa6';
export default function UnauthorizedError({
  resource,
  returnLabel,
  returnURL,
}: {
  resource: string;
  returnLabel: string;
  returnURL: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex gap-2">
        <FaRegCircleXmark size={48} color="red" />
        <h1 className="underline">401 Unauthorized</h1>
        <FaRegCircleXmark size={48} color="red" />
      </div>
      <p className="text-2xl">You are not permitted to view this {resource}.</p>
      <Link href={returnURL} className="text-2xl underline">
        CLick here to return to {returnLabel}.
      </Link>
    </div>
  );
}
