import Header from "@/components/header";
import LoginForm from "@/components/loginForm";
import { NextPage } from "next";

const Login: NextPage = () => {
  return (
    <main className="body min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-4">
        <Header />
        <LoginForm />
      </div>
    </main>
  );
};

export default Login;
