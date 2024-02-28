import axios from "axios";
import User from "../model/User";
import UserLogin from "../model/UserLogin";
import Category from "../model/Category";
import Post from "../model/Post";

axios.defaults.baseURL = "https://blog-pessoal-44fl.onrender.com/";

export async function createUser(url: string, data: User) {
  const response = await axios.post(url, data);
  return response.data;
}

export async function login(
  url: string,
  data: object,
  setUser: React.Dispatch<React.SetStateAction<UserLogin>>
) {
  const response = await axios.post(url, data);
  setUser(response.data);
  sessionStorage.setItem("userLogin", JSON.stringify(response.data));
  return response.data;
}

export async function find(
  url: string,
  setData:
    | React.Dispatch<React.SetStateAction<Category[]>>
    | React.Dispatch<React.SetStateAction<Category>>
    | React.Dispatch<React.SetStateAction<Post>>
    | React.Dispatch<React.SetStateAction<Post[]>>
    | React.Dispatch<React.SetStateAction<User>>,
  header: object
) {
  const response = await axios.get(url, header);
  setData(response.data);
}

export async function create(
  url: string,
  data: object,
  setData:
    | React.Dispatch<React.SetStateAction<Category>>
    | React.Dispatch<React.SetStateAction<Post>>
    | React.Dispatch<React.SetStateAction<User>>,
  header: object
) {
  const response = await axios.post(url, data, header);
  console.log(response);
  setData(response.data);
}

export async function destroy(url: string, header: object) {
  await axios.delete(url, header);
}
