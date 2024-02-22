import Post from "./Post";

export default interface User {
  id: number;
  nome: string;
  usuario: string;
  foto: string;
  senha: string;
  isAdmin?: boolean;
  post?: Post | null;
}
