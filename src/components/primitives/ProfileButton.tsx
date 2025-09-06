"use client";

import { IUser } from "@/types/auth/authType";

export default function ProfileButton({ user }: { user: IUser }) {
  return (
    <div className="navbar-end dropdown relative">
      <div className="btn btn-ghost px-2 font-light" tabIndex={0} role="button">
        <div className="flex gap-2">
          <div className="text-right">
            <span>{user.name}</span>
            <p className="text-xs">{user.username}@serafuku.moe</p>
          </div>
          <img
            src={user.avatarUrl}
            alt={`${user.username}의 프로필사진`}
            className="h-9 aspect-square rounded-full"
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
