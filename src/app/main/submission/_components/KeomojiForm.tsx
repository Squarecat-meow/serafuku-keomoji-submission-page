"use client";

import InputChip from "@/components/primitives/InputChip";
import { misskeyQueries } from "@/queries/misskeyQueries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { KeyboardEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import KeomojiImageArray from "./KeomojiImageArray";
import KeomojiSubmissionConfirmModal from "./KeomojiSubmissionConfirmModal";
import {
  useGlobalLoadingStore,
  useGlobalModalStore,
} from "@/stores/modalStore";
import { useShallow } from "zustand/shallow";
import { submissionQueries } from "@/queries/submissionQueries";

interface IKeomojiForm {
  aliases: string;
  name: string;
  category: string;
  licenses: string | null;
  isSensitive: boolean;
  isLocal: boolean;
}

export default function KeomojiForm({
  imgUrl,
  onCancel,
}: {
  imgUrl: string;
  onCancel: () => void;
}) {
  const i = useRef(0);
  const {
    register,
    watch,
    handleSubmit,
    getValues,
    resetField,
    trigger,
    formState: { errors },
  } = useForm<IKeomojiForm>({
    mode: "onChange",
  });
  const [tags, setTags] = useState<{ name: string; id: number }[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const queryClient = useQueryClient();
  const { data: categories } = useQuery(misskeyQueries.categoriesOption());
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
    submissionQueries.submissionMutationOptions(queryClient),
  );

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    const inputValues = getValues("aliases") as unknown as string;
    if (!inputValues) return;
    if (e.key === "Enter" && inputValues.length > 0) {
      e.preventDefault();
      setTags((state) => [...state, { id: i.current, name: inputValues }]);
      resetField("aliases");
      i.current++;
    }
    // TODO: 태그 3개까지만 만들기
  };
  const handleDelete = (id: number) => {
    setTags((state) => state.filter((el) => el.id !== id));
  };
  const handleConfirmButtonClick = async () => {
    const validateResult = await trigger();
    if (validateResult) setIsModalVisible(true);
  };
  const onSubmit = async (e: IKeomojiForm) => {
    const data = new FormData();
    for (const [k, v] of Object.entries(e)) {
      data.append(k, v);
    }
    if (data.has("aliases")) data.delete("aliases");
    data.append("aliases", tags.map((el) => el.name).join(","));
    const imageFile = await fetch(imgUrl).then((res) => res.blob());
    data.append("image", imageFile);

    try {
      setIsGlobalLoadingVisible(true);
      mutation.mutate(data);
      setChildren(
        `커모지 제출이 완료되었습니다. \n승인까지는 시간이 걸리니까 조금만 기다려주세요!`,
      );
      setModalHref("/main");
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
  return (
    <div className="w-full lg:max-w-3xl flex flex-col gap-4">
      <KeomojiImageArray imgUrl={imgUrl} />
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
          <button className="btn btn-outline" onClick={onCancel} type="button">
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
      <KeomojiSubmissionConfirmModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        callback={handleSubmit(onSubmit)}
      />
    </div>
  );
}
