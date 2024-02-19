import axios from "axios";
import User from "../model/User";

axios.defaults.baseURL = "https://blog-pessoal-44fl.onrender.com/";

export async function createUser(url: string, data: User, setData: Function) {
  const response = await axios.post(url, data);
  setData(response.data);
}

export async function login(url: string, data: Object, setData: Function) {
  const response = await axios.post(url, data);
  setData(response.data);
}
