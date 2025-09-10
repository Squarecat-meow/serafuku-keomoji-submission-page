import { category } from "@/generated/prisma";
import ky from "ky";

export async function getCategories() {
  const categories = await ky
    .get<category[]>("/api/keomojis/categories")
    .json();

  return categories;
}
