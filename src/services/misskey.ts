import { api } from "./apiClient";
import { Category } from "@/generated/prisma";

export async function getCategories() {
  const categories = await api
    .get<Category[]>("/api/keomojis/categories")
    .json();

  return categories;
}
