import axios from "axios";
import User from "../model/User";

axios.defaults.baseURL = "https://blog-pessoal-44fl.onrender.com/";

export async function createUser(url: string, data: User) {
  const response = await axios.post(url, data);
  return response.data;
}

export async function login(url: string, data: Object, setUser) {
  const response = await axios.post(url, data);
  setUser(response.data);
  return response.data;
}
