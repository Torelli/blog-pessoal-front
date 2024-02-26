import Category from "./Category";
import User from "./User";

export default interface Post {
    id: number;
    titulo: string;
    texto: string;
    data: string;
    tema: Category | null;
    usuario: User;
}