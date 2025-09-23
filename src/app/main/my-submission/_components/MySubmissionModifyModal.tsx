import InputChip from "@/components/primitives/InputChip";
import { Modal } from "@/components/primitives/modal/Modal";
import { Submission } from "@prisma/client/index.js";
import { misskeyQueries } from "@/queries/misskeyQueries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import MySubmissionModifyConfirmModal from "./MySubmissionModifyConfirmModal";
import KeomojiImageArray from "../../submission/_components/KeomojiImageArray";
import {
  useGlobalModalStore,
  useGlobalLoadingStore,
} from "@/stores/modalStore";
import { useShallow } from "zustand/shallow";
import { mySubmissionQueries } from "@/queries/submissionQueries";

interface IKeomojiModifyForm {
  id: number;
  aliases: string;
  name: string;
  category: string;
  licenses: string | null;
  isSensitive: boolean;
  isLocal: boolean;
}

export default function MySubmissionModifyModal({
  data,
  isVisible,
  onModifyVisible,
}: {
  data: Submission;
  isVisible: boolean;
  onModifyVisible: (state: boolean) => void;
}) {
  const i = useRef(0);
  const {
    register,
    watch,
    handleSubmit,
    getValues,
    resetField,
    trigger,
    reset,
    formState: { errors },
  } = useForm<IKeomojiModifyForm>({
    mode: "onChange",
  });
  const queryClient = useQueryClient();
  const { data: categories } = useQuery(misskeyQueries.categoriesOption());
  const [tags, setTags] = useState<{ name: string; id: number }[]>([]);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const { setIsGlobalModalVisible, setChildren, setModalType, setModalHref } =
    useGlobalModalStore(
      useShallow((state) => ({
        setIsGlobalModalVisible: state.setIsModalVisible,
        setChildren: state.setChildren,
        setModalType: state.setModalType,
        setModalHref: state.setModalHref,
      })),
    );
  const setIsGlobalLoadingVisible = useGlobalLoadingStore(
    (state) => state.setIsLoadingVisible,
  );
  const mutation = useMutation(
    mySubmissionQueries.mySubmissionModifyMutationOptions(
      queryClient,
      onModifyVisible,
      setChildren,
      setModalType,
      setIsGlobalModalVisible,
      setIsGlobalLoadingVisible,
    ),
  );

  const handleToggleConfirmModalVisible = (state: boolean) => {
    setIsConfirmModalVisible(state);
  };
  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    const inputValues = getValues("aliases") as unknown as string;
    if (!inputValues) return;
    if (e.key === "Enter" && inputValues.length > 0) {
      e.preventDefault();
      setTags((state) => [...state, { id: i.current, name: inputValues }]);
      resetField("aliases");
      i.current++;
    }
  };
  const handleDelete = (id: number) => {
    setTags((state) => state.filter((el) => el.id !== id));
  };
  const handleConfirmButtonClick = async () => {
    const validateResult = await trigger();
    if (validateResult) setIsConfirmModalVisible(true);
  };
  const onSubmit = (e: IKeomojiModifyForm) => {
    const payload = new FormData();
    for (const [k, v] of Object.entries(e)) {
      payload.append(k, v);
    }
    if (payload.has("aliases")) payload.delete("aliases");
    payload.append("aliases", tags.map((el) => el.name).join(","));
    payload.append("id", data.id.toString());

    try {
      setIsGlobalLoadingVisible(true);
      mutation.mutate(payload);
      setChildren(
        `커모지 제출이 완료되었습니다. \n승인까지는 시간이 걸리니까 조금만 기다려주세요!`,
      );
      setModalHref("/main/my-submission");
      setModalType("info");
      setIsGlobalModalVisible(true);
    } catch (err) {
      if (err instanceof Error) setChildren(err.message);
      setIsGlobalModalVisible(true);
      setModalType("error");
    } finally {
      setIsGlobalLoadingVisible(false);
    }
  };

  useEffect(() => {
    setTags(
      data.aliases.map((el, i) => {
        return { name: el, id: i };
      }),
    );
    reset({
      name: data.name,
      aliases: "",
      category: data.category,
      licenses: data.licenses,
      isLocal: data.isLocal,
      isSensitive: data.isSensitive,
    });
  }, [isVisible]);

  return (
    <Modal isVisible={isVisible} setIsVisible={onModifyVisible}>
      <KeomojiImageArray imgUrl={data.url} />
      <form
        className="grid grid-cols-1 sm:grid-cols-2 min-w-2xl gap-4"
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
      >
        <fieldset className="fieldset relative">
          <legend className="fieldset-legend">
            <p>
              이름
              <span className="ml-0.5 text-red-400 dark:text-red-700">
                &#42;
              </span>
            </p>
            {errors.name && (
              <p className="text-red-400 dark:text-red-700">
                {errors.name.message}
              </p>
            )}
          </legend>
          <input
            {...register("name", {
              required: "이름을 입력해주세요.",
              pattern: {
                value: /^[a-zA-Z0-9_]+$/g,
                message: "이름은 알파벳, 숫자, -와_만 가능합니다.",
              },
            })}
            type="text"
            className="input w-full"
            placeholder="여기에 이름을 입력"
            autoComplete="off"
          />
          <p className="label">
            커모지 이름: <b>{watch("name") && ":" + watch("name") + ":"}</b>
          </p>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">
            <p>
              카테고리
              <span className="ml-0.5 text-red-400 dark:text-red-700">
                &#42;
              </span>
            </p>
            {errors.category && (
              <p className="text-red-400 dark:text-red-700">
                {errors.category.message}
              </p>
            )}
          </legend>
          <input
            {...register("category", { required: "카테고리를 입력해주세요." })}
            type="text"
            className="input w-full focus:outline-none"
            placeholder="여기에 카테고리를 입력"
            list="categories"
            autoComplete="off"
          />
          {categories && categories.length !== 0 && (
            <datalist id="categories">
              {categories.map((category) => (
                <option key={category.id}>{category.name}</option>
              ))}
            </datalist>
          )}
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">태그</legend>
          <input
            {...register("aliases")}
            type="text"
            className="input w-full focus:outline-none"
            placeholder="여기에 태그를 입력"
            onKeyDown={handleKeydown}
            autoComplete="off"
          />
          <p className="label">
            <kbd className="kbd kbd-sm">Enter</kbd>키로 구분하여 여러개를 설정할
            수 있습니다.
          </p>
          <div className="w-full flex flex-wrap gap-2">
            {tags.map((tag) => (
              <InputChip key={tag.id} onDelete={() => handleDelete(tag.id)}>
                {tag.name}
              </InputChip>
            ))}
          </div>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">라이선스</legend>
          <input
            {...register("licenses")}
            type="text"
            className="input w-full focus:outline-none"
            placeholder="여기에 라이선스명을 입력"
            autoComplete="off"
          />
        </fieldset>
        <div className="w-full flex justify-start gap-4">
          <label className="label">
            <input
              type="checkbox"
              className="toggle toggle-primary"
              {...register("isSensitive")}
            />
            isSensitive
          </label>
          <label className="label">
            <input
              type="checkbox"
              className="toggle toggle-primary"
              {...register("isLocal")}
            />
            로컬에만
          </label>
        </div>
        <div className="w-full flex gap-4 justify-end">
          <button
            className="btn btn-outline"
            onClick={() => onModifyVisible(false)}
            type="button"
          >
            취소
          </button>
          <button
            className="btn btn-accent"
            type="button"
            onClick={handleConfirmButtonClick}
          >
            확인
          </button>
        </div>
      </form>
      <MySubmissionModifyConfirmModal
        isVisible={isConfirmModalVisible}
        setIsVisible={handleToggleConfirmModalVisible}
        callback={handleSubmit(onSubmit)}
      />
    </Modal>
  );
}
