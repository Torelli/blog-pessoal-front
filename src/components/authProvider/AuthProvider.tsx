import { useState } from "react";
import AuthProviderProps from "../../model/AuthProviderProps";
import UserLogin from "../../model/UserLogin";
import { login } from "../../service/Service";
import { AuthContext } from "../../contexts/AuthContext";

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserLogin>({
    id: 0,
    name: "",
    email: "",
    password: "",
    picture: "",
    token: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(userLogin: UserLogin) {
    setIsLoading(true);
    try {
      await login("usuarios/login", userLogin, setUser);
      alert("User logged succesfully!");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      alert("Inconsistent user data");
      setIsLoading(false);
    }
  }

  function handleLogout() {
    setUser({
      id: 0,
      name: "",
      email: "",
      password: "",
      picture: "",
      token: "",
    });
  }
  return (
    <AuthContext.Provider
      value={{ user, handleLogin, handleLogout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
