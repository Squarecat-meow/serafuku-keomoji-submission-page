"use client";

import { Loader2Icon, PlusIcon, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProfileButton from "./ProfileButton";
import { useQuery } from "@tanstack/react-query";
import { userQueries } from "@/queries/userQueries";

export default function NavBar({ token }: { token: string }) {
  const { data: user, isPending } = useQuery(userQueries.userOptions(token));

  return (
    <div className="navbar px-4 relative bg-base-200 rounded-2xl shadow">
      <div className="navbar-start">
        <button className="btn btn-link h-8 relative p-2 aspect-square">
          <Link href={"/main"}>
            <Image src={"/images/serafuku.png"} alt="세라복.모에 로고" fill />
          </Link>
        </button>
      </div>
      <div className="navbar-center">
        <button className="btn btn-ghost text-xl text-base-content">
          <PlusIcon className="w-4 stroke-gray-500" />
          <Link href={"/submission"}>커모지 신청</Link>
        </button>
        <button className="btn btn-ghost text-xl text-base-content">
          <UserPlus className="w-4 stroke-gray-500" />
          <Link href={"/my-submission"}>내가 신청한 커모지</Link>
        </button>
      </div>
      {user && !isPending ? (
        <>
          <img
            src={user.bannerUrl}
            alt={`${user.username}의 헤더`}
            className="absolute right-0 object-cover h-full rounded-r-2xl aspect-[3/1]"
          />
          <div className="absolute right-0 h-full aspect-[3/1] bg-gradient-to-r from-base-100 to-transparent" />
          <ProfileButton user={user} />
        </>
      ) : (
        <Loader2Icon className="animate-spin" />
      )}
    </div>
  );
}
