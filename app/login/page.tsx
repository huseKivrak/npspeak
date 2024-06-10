import LoginForm from '@/components/forms/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center w-full gap-4">
      <h1 className="text-4xl lg:text-6xl">login</h1>
      <LoginForm />
    </div>
  );
}
