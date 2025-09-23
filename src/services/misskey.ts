import { api } from "./apiClient";
import { Category } from "@prisma/client/index.js";

export async function getCategories() {
  const categories = await api
    .get<Category[]>("/api/keomojis/categories")
    .json();

  return categories;
}
