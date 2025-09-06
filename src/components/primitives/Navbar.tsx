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
        <Link href={"/submission"}>
          <button className="btn btn-ghost text-xl text-base-content">
            <PlusIcon className="w-5 mr-1 stroke-gray-500" />
            <span className="hidden sm:inline-block">커모지 신청</span>
          </button>
        </Link>
        <Link href={"/my-submission"}>
          <button className="btn btn-ghost text-xl text-base-content">
            <UserPlus className="w-5 mr-1 stroke-gray-500" />
            <span className="hidden sm:inline-block">내가 신청한 커모지</span>
          </button>
        </Link>
      </div>
      {user && !isPending ? (
        <>
          {user.bannerUrl ? (
            <>
              <img
                src={user.bannerUrl}
                alt={`${user.username}의 헤더`}
                className="absolute right-0 object-cover h-full rounded-r-2xl w-1/6"
              />
              <div className="absolute right-0 w-1/6 h-full bg-gradient-to-r from-base-200 to-transparent" />
            </>
          ) : (
            <div />
          )}
          <ProfileButton user={user} />
        </>
      ) : (
        <Loader2Icon className="animate-spin" />
      )}
    </div>
  );
}
