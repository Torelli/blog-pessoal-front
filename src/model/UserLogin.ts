export default interface UserLogin {
  id: number;
  name: string;
  email: string;
  picture: string;
  password: string;
  isAdmin: boolean;
  token: string;
}
