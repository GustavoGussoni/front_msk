import Header from "@/components/header";
import RegisterForm from "@/components/registerForm";
import { NextPage } from "next";

const Register: NextPage = () => {
  return (
    <main className="body min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-4">
        <Header />

        <RegisterForm />
      </div>
    </main>
  );
};

export default Register;
