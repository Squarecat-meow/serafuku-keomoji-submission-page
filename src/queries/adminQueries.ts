import { Submission } from "@prisma/client/index.js";
import {
  getSidebarCount,
  getSubmissionInfo,
  patchAdminStatusChange,
  patchAdminSubmission,
} from "@/services/admin";
import { TGlobalModalType } from "@/types/modal/globalModalType";
import {
  mutationOptions,
  QueryClient,
  queryOptions,
} from "@tanstack/react-query";

export const adminQueries = {
  sidebarCount: () => ["sidebar-count"],
  status: (status: Submission["status"]) => ["status", status],
  sidebarStatusCountOptions: () =>
    queryOptions({
      queryKey: [...adminQueries.sidebarCount()],
      queryFn: () => getSidebarCount(),
    }),
  singleStatusOptions: (status: Submission["status"]) =>
    queryOptions({
      queryKey: [...adminQueries.status(status)],
      queryFn: () => getSubmissionInfo(status),
    }),
  adminSubmissionModifyOptions: (
    queryClient: QueryClient,
    status: Submission["status"],
    setModifyModalVisible: (state: boolean) => void,
    setModalChildren: (children: string) => void,
    setModalType: (type: TGlobalModalType) => void,
    setGlobalModalVisible: (state: boolean) => void,
    setLoading: (state: boolean) => void,
  ) =>
    mutationOptions({
      mutationKey: [...adminQueries.status(status)],
      mutationFn: (data: FormData) => patchAdminSubmission(data),
      onMutate: () => {
        setModifyModalVisible(false);
        setLoading(true);
      },
      onSuccess: () => {
        setLoading(false);
        queryClient.invalidateQueries({
          queryKey: [...adminQueries.status(status)],
        });
        setModalType("info");
        setModalChildren("수정이 완료되었습니다!");
        setGlobalModalVisible(true);
      },
      onError: () => {
        setLoading(false);
        setModalType("error");
        setModalChildren("수정중 에러가 발생했습니다!");
        setGlobalModalVisible(true);
      },
    }),
  adminSubmissionChangeStatusOptions: (
    queryClient: QueryClient,
    id: number,
    currentStatus: Submission["status"],
    status: Submission["status"],
  ) =>
    mutationOptions({
      mutationKey: [...adminQueries.status(status)],
      mutationFn: () => patchAdminStatusChange(id, status),
      onSuccess: async () => {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: [...adminQueries.status(currentStatus)],
          }),
          queryClient.invalidateQueries({
            queryKey: [...adminQueries.sidebarCount()],
          }),
        ]);
      },
    }),
};
