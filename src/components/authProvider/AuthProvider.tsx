import { useEffect, useState } from "react";
import AuthProviderProps from "../../model/AuthProviderProps";
import UserLogin from "../../model/UserLogin";
import { login } from "../../service/Service";
import { AuthContext } from "../../contexts/AuthContext";
import { toasts } from "../../util/toasts";

export default function AuthProvider({ children }: AuthProviderProps) {
  const initialUser: UserLogin = {
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    admin: false,
    token: "",
  };
  const sessionUser: () => UserLogin = () => {
    return JSON.parse(
      sessionStorage.getItem("userLogin") || JSON.stringify(initialUser)
    ) as UserLogin;
  };
  const [user, setUser] = useState<UserLogin>(sessionUser);

  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(userLogin: UserLogin) {
    setIsLoading(true);
    try {
      const response = await login("usuarios/login", userLogin, setUser);
      toasts(`Welcome back, ${response.nome}!`, "success");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toasts("Email or password are incorrect", "error");
      setIsLoading(false);
    }
  }

  function handleLogout() {
    setUser({
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      foto: "",
      admin: false,
      token: "",
    });
    sessionStorage.clear();
  }

  useEffect(() => {
    const persistedUserLogin: UserLogin = JSON.parse(
      sessionStorage.getItem("userLogin") || JSON.stringify(initialUser)
    );
    if (persistedUserLogin.token !== "") setUser(persistedUserLogin);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, handleLogin, handleLogout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
