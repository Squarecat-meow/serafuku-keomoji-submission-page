"use client";

import InputChip from "@/components/primitives/InputChip";
import { misskeyQueries } from "@/queries/misskeyQueries";
import { useQuery } from "@tanstack/react-query";
import { KeyboardEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import KeomojiImageArray from "./KeomojiImageArray";

interface IKeomojiForm {
  aliases: string;
  name: string;
  category: string | null;
  license: string[] | null;
  isSensitive: boolean;
  localOnly: boolean;
  roleIdsThatCanBeUsedThisEmojiAsReaction: string[];
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
    formState: { errors },
  } = useForm<IKeomojiForm>({
    mode: "onChange",
  });
  const [tags, setTags] = useState<{ name: string; id: number }[]>([]);
  const { data: categories } = useQuery(misskeyQueries.categoriesOption());

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    const inputValues = getValues("aliases");
    if (e.key === "Enter" && inputValues.trim() !== "") {
      e.preventDefault();
      setTags((state) => [...state, { id: i.current, name: inputValues }]);
      resetField("aliases");
      i.current++;
    }
  };
  const handleDelete = (id: number) => {
    setTags((state) => state.filter((el) => el.id !== id));
  };
  const onSubmit = (e: IKeomojiForm) => {
    console.log({ ...e, aliases: tags });
  };
  return (
    <div className="w-full lg:max-w-3xl flex flex-col gap-4">
      <KeomojiImageArray imgUrl={imgUrl} />
      <form
        className="grid grid-cols-1 sm:grid-cols-2  gap-4"
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
                value: /^[a-zA-Z0-9_]*$/g,
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
            {...register("license")}
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
              {...register("localOnly")}
            />
            로컬에만
          </label>
        </div>
        <div className="w-full flex gap-4 justify-end">
          <button
            className="btn hover:btn-warning"
            onClick={onCancel}
            type="button"
          >
            취소
          </button>
          <button className="btn btn-accent">확인</button>
        </div>
      </form>
    </div>
  );
}
