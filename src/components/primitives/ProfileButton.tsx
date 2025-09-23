"use client";

import { userQueries } from "@/queries/userQueries";
import { useUserStore } from "@/stores/userStore";
import { IUser } from "@/types/auth/authType";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfileButton({ user }: { user: IUser }) {
  const router = useRouter();
  const mutation = useMutation(userQueries.userMutationOptions());
  const setUser = useUserStore((state) => state.setUser);
  return (
    <div className="dropdown">
      <div className="btn btn-ghost px-2 font-light" tabIndex={0} role="button">
        <div className="flex gap-2">
          <div className="text-right">
            <span className="hidden lg:block font-bold text-shadow-sm">
              {user.name}
            </span>
            <p className="hidden lg:block text-xs text-shadow">
              {user.username}@serafuku.moe
            </p>
          </div>
          <img
            src={user.avatarUrl}
            alt={`${user.username}의 프로필사진`}
            className="h-9 aspect-square rounded-full ring-2 ring-primary"
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu top-12 bg-base-200 rounded-box z-[1] w-52 p-2 shadow-lg"
      >
        <li>
          {user.roles.some((el) => el.id === "9j73af19e2" || "9ypib6l198") && (
            <Link href={"/main/admin"}>관리자 페이지</Link>
          )}
          <a
            className="hover:bg-red-400"
            onClick={() => {
              setUser(null);
              mutation.mutate();
              router.push("/");
            }}
          >
            로그아웃
          </a>
        </li>
      </ul>
    </div>
  );
}
