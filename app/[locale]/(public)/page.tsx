import LoginForm from "@/components/(public)/auth/login/forms/login-form";
import Content from "@/components/primitives/Content";

export default function LoginPage() {
  return (
    <Content className="min-h-screen flex flex-col items-center justify-center">
      <LoginForm />
    </Content>
  );
}
