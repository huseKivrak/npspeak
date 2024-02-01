type ErrorToastProps = {
  message?: string;
};

export default function ErrorToast({ message }: ErrorToastProps) {
  if (!message) return null;
  return <div className='text-xs text-red-600 ml-2'>{message}</div>;
}
