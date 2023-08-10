import { LoginData, loginSchema } from "@/schemas/user.schema";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/authContext";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, errors }
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur"
  });

  const { login } = useAuth();

  const onFormSubmit = (formData: LoginData) => {
    login(formData);
  };

  return (
    <div className="user-form-container">
      <p className="text-4xl mt-6 font-semibold">Login</p>
      <form className="space-y-6 w-4/5-" onSubmit={handleSubmit(onFormSubmit)}>
        <div>
          <label htmlFor="email" className="user-form-label">
            E-mail
          </label>
          <div className="mt-2">
            <input
              type="email"
              placeholder="example@mail.com"
              className="user-form-input"
              {...register("email")}
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>
        </div>

        <div>
          <label htmlFor="password" className="user-form-label">
            Password
          </label>
          <div className="mt-2">
            <input
              type="password"
              placeholder="Sua senha"
              className="user-form-input"
              {...register("password")}
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </div>
        </div>

        <div>
          <button type="submit" className="user-form-button">
            Entrar
          </button>
        </div>
        <Link href={"/register"} className="user-form-link">
          Não é cadastrado ainda? Clique aqui
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
