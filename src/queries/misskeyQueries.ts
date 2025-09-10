import { getCategories } from "@/services/misskey";
import { queryOptions } from "@tanstack/react-query";

export const misskeyQueries = {
  categories: () => ["categories"],
  categoriesOption: () =>
    queryOptions({
      queryKey: [...misskeyQueries.categories()],
      queryFn: () => getCategories(),
    }),
};
