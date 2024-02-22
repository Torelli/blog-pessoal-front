import { useEffect, useState } from "react";
import AuthProviderProps from "../../model/AuthProviderProps";
import UserLogin from "../../model/UserLogin";
import { login } from "../../service/Service";
import { AuthContext } from "../../contexts/AuthContext";

export default function AuthProvider({ children }: AuthProviderProps) {
  const initialUser: UserLogin = {
    id: 0,
    name: "",
    email: "",
    password: "",
    picture: "",
    isAdmin: false,
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
      isAdmin: false,
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
