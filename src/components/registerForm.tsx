import { useAuth } from "@/contexts/authContext";
import { UserData, userSchema } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, errors }
  } = useForm<UserData>({
    resolver: zodResolver(userSchema),
    mode: "onBlur"
  });

  const { register: registerUser } = useAuth();

  const onFormSubmit = (registerData: UserData) => {
    registerUser(registerData);
  };

  return (
    <div className="user-form-container">
      <p className="text-4xl mt-6 font-semibold">Fazer cadastro</p>
      <form className="space-y-6 w-4/5-" onSubmit={handleSubmit(onFormSubmit)}>
        <div>
          <label htmlFor="name" className="user-form-label">
            Nome
          </label>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Seu Nome"
              className="user-form-input"
              {...register("name")}
            />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
          </div>
        </div>

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
            Cadastrar
          </button>
        </div>
        <Link href={"/login"} className="user-form-link">
          Ir para o login
        </Link>
      </form>
    </div>
  );
};

export default RegisterForm;
