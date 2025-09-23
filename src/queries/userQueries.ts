import { getUserInfo, postLogout } from "@/services/user";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

export const userQueries = {
  user: () => ["user"],
  userOptions: (accessToken: string) =>
    queryOptions({
      queryKey: [...userQueries.user()],
      queryFn: () => getUserInfo(accessToken),
      enabled: !!accessToken,
    }),
  userMutationOptions: () =>
    mutationOptions({
      mutationKey: [...userQueries.user()],
      mutationFn: async () => postLogout(),
    }),
};
