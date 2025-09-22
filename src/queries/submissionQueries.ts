import {
  deleteSubmission,
  getMySingleSubmission,
  getMySubmissions,
  getPaginatedSubmissions,
  patchSubmission,
  postSubmission,
} from "@/services/submission";
import { TGlobalModalType } from "@/types/modal/globalModalType";
import { TStatusPayload } from "@/types/status/statusType";
import {
  mutationOptions,
  QueryClient,
  queryOptions,
} from "@tanstack/react-query";

export const submissionQueries = {
  submission: (page?: number, status?: TStatusPayload) => [
    "submission",
    page,
    status,
  ],
  submissionOptions: (page: number, status: TStatusPayload | null) =>
    queryOptions({
      queryKey: [...submissionQueries.submission(page, status)],
      queryFn: () => getPaginatedSubmissions(page, status),
    }),
  submissionMutationOptions: (queryClient: QueryClient) =>
    mutationOptions({
      mutationKey: [...submissionQueries.submission()],
      mutationFn: async (data: FormData) => postSubmission(data),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: [
            ...submissionQueries.submission(),
            ...mySubmissionQueries.mySubmission(),
          ],
        }),
    }),
};

export const mySubmissionQueries = {
  mySubmission: () => ["my-submission"],
  mySubmissionOptions: () =>
    queryOptions({
      queryKey: [...mySubmissionQueries.mySubmission()],
      queryFn: () => getMySubmissions(),
      staleTime: 1000 * 60 * 5,
    }),
  mySingleSubmission: () => ["my-single-submission"],
  mySingleSubmissionOptions: (id: number) =>
    queryOptions({
      queryKey: [...mySubmissionQueries.mySingleSubmission()],
      queryFn: () => getMySingleSubmission(id),
    }),
  mySubmissionModifyMutationOptions: (
    queryClient: QueryClient,
    setModifyModalVisible: (state: boolean) => void,
    setModalChildren: (children: string) => void,
    setModalType: (type: TGlobalModalType) => void,
    setGlobalModalVisible: (state: boolean) => void,
    setLoading: (state: boolean) => void,
  ) =>
    mutationOptions({
      mutationKey: [...mySubmissionQueries.mySubmission()],
      mutationFn: async (data: FormData) => patchSubmission(data),
      onMutate: () => {
        setModifyModalVisible(false);
        setLoading(true);
      },
      onSuccess: () => {
        setLoading(false);
        queryClient.invalidateQueries({
          queryKey: [...mySubmissionQueries.mySubmission()],
        });
        setModalType("info");
        setModalChildren("수정이 완료되었습니다!");
        setGlobalModalVisible(true);
      },
      onError: () => {
        setLoading(false);
        setModalType("error");
        setModalChildren("삭제중 에러가 발생했습니다!");
        setGlobalModalVisible(true);
      },
    }),
  mySubmissionDeleteMutationOptions: (
    id: number,
    queryClient: QueryClient,
    setDetailModalVisible: (state: boolean) => void,
    setModalChildren: (children: string) => void,
    setModalType: (type: TGlobalModalType) => void,
    setGlobalModalVisible: (state: boolean) => void,
    setLoading: (state: boolean) => void,
  ) =>
    mutationOptions({
      mutationKey: [...mySubmissionQueries.mySubmission()],
      mutationFn: () => deleteSubmission(id),
      onMutate: () => {
        setDetailModalVisible(false);
        setLoading(true);
      },
      onSuccess: () => {
        setLoading(false);
        queryClient.invalidateQueries({
          queryKey: [...mySubmissionQueries.mySubmission()],
        });
        setModalType("info");
        setModalChildren("삭제가 완료되었습니다!");
        setGlobalModalVisible(true);
      },
      onError: () => {
        setLoading(false);
        setModalType("error");
        setModalChildren("삭제중 에러가 발생했습니다!");
        setGlobalModalVisible(true);
      },
    }),
};
