import Toast from "@/components/toast";
import { LoginData, UserData } from "@/schemas/user.schema";
import api from "@/services/api";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { ReactNode, createContext, useContext } from "react";

interface Props {
  children: ReactNode;
}

interface authProviderData {
  // setToken: (value: string) => void;
  register: (userData: UserData) => void;
  login: (loginData: LoginData) => void;
  // token: string | undefined;
}

const AuthContext = createContext<authProviderData>({} as authProviderData);

export const AuthProvider = ({ children }: Props) => {
  const router = useRouter();

  const register = (userData: UserData) => {
    api
      .post("/users", userData)
      .then(() => {
        Toast({ message: "Usuário cadastrado com sucesso!", isSucess: true });
        router.push("/login");
      })
      .catch((err) => {
        console.log(err);
        Toast({ message: "Erro ao criar usuário, tente um email diferente." });
      });
  };

  const login = (loginData: LoginData) => {
    api
      .post("/login", loginData)
      .then((response) => {
        setCookie(null, "musicApp.token", response.data.token, {
          maxAge: 60 * 30,
          path: "/"
        });
      })
      .then(() => {
        Toast({ message: "Login realizado com sucesso! Redirecionando...", isSucess: true });
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        Toast({ message: "Erro ao logar! E-mail ou senha inválidos." });
      });
  };

  return <AuthContext.Provider value={{ register, login }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
