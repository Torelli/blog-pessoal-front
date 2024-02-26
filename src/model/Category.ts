import Post from "./Post";

export default interface Category {
  id: number;
  descricao: string;
  postagens: Post[] | null;
}
