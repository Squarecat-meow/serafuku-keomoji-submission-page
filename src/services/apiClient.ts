import ky from "ky";

interface ApiErrorResponse {
  message: string;
}

export const api = ky.create({
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        if (!response.ok) {
          const errorData: ApiErrorResponse = await response.json();
          throw new Error(errorData.message || "서버에서 오류가 발생했어요!");
        }
      },
    ],
  },
});
