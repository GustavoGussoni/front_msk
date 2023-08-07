import { LoginData, UserData } from "@/schemas/user.schema";
import api from "@/services/api";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { ReactNode, createContext, useContext } from "react";
import { toast } from "react-toastify";

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
        toast.success("Usuário cadastrado com sucesso!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "light"
        });
        router.push("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao criar usuário, tente um email diferente.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "light"
        });
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
        toast.success("Login realizado com sucesso!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "light"
        });
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao logar! E-mail ou senha inválidos.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "light"
        });
      });
  };

  return <AuthContext.Provider value={{ register, login }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
