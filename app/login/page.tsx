import LoginForm from '@/components/forms/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center w-full gap-4">
      <h1>login</h1>
      <LoginForm />
    </div>
  );
}
