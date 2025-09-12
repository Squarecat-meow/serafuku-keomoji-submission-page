"use client";

import { IUser } from "@/types/auth/authType";

export default function ProfileButton({ user }: { user: IUser }) {
  return (
    <div className="navbar-end dropdown">
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
          <a className="hover:bg-red-400">로그아웃</a>
        </li>
      </ul>
    </div>
  );
}
