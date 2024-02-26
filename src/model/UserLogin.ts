export default interface UserLogin {
  id: number;
  nome: string;
  usuario: string;
  foto: string;
  senha: string;
  admin: boolean;
  token: string;
}
