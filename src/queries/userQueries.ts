import { getUserInfo } from "@/services/user";
import { queryOptions } from "@tanstack/react-query";

export const userQueries = {
  user: (accessToken: string) => ["user", accessToken],
  userOptions: (accessToken: string) =>
    queryOptions({
      queryKey: [...userQueries.user(accessToken)],
      queryFn: () => getUserInfo(accessToken),
      enabled: !!accessToken,
    }),
};
