"use client";

import { IUser } from "@/types/auth/authType";
import { Loader2Icon, PlusIcon, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      const stringUser = localStorage.getItem("user");
      if (!stringUser) throw new Error("유저정보가 로컬스토리지에 없습니다!");
      const user = JSON.parse(stringUser);
      setUser(user);
    } catch (err) {
      if (err instanceof Error) console.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <div className="navbar bg-base-100 rounded-2xl px-4 shadow">
      <div className="navbar-start">
        <button className="btn btn-link h-8 relative p-2 aspect-square">
          <Link href={"/main"}>
            <Image src={"/images/serafuku.png"} alt="세라복.모에 로고" fill />
          </Link>
        </button>
      </div>
      <div className="navbar-center">
        <button className="btn btn-ghost text-lg text-base-content">
          <PlusIcon className="w-4 stroke-gray-500" />
          <Link href={"/submission"}>커모지 신청</Link>
        </button>
        <button className="btn btn-ghost text-lg text-base-content">
          <UserPlus className="w-4 stroke-gray-500" />
          <Link href={"/my-submission"}>내가 신청한 커모지</Link>
        </button>
      </div>
      <div className="navbar-end dropdown relative">
        <div
          className="btn btn-ghost px-2 font-light"
          tabIndex={0}
          role="button"
        >
          {!loading && user ? (
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
          ) : (
            <Loader2Icon className="animate-spin" />
          )}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu top-12 bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg"
        >
          <li>
            <a className="hover:bg-red-400">로그아웃</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
