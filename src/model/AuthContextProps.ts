import UserLogin from "./UserLogin";

export default interface AuthContextProps {
    user: UserLogin;
    handleLogout(): void;
    handleLogin(user: UserLogin): Promise<void>;
    isLoading: boolean;
  }