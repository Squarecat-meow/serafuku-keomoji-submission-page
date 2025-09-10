import NavBar from "@/components/primitives/Navbar";
import { cookies } from "next/headers";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value ?? "";
  return (
    <main className="w-full h-full flex flex-col lg:w-3/4 p-4 m-auto">
      <NavBar token={accessToken} />
      <article className="my-4 p-4 flex-1 bg-base-200/80 backdrop-blur-lg text-base-content space-y-2 rounded-2xl shadow">
        {children}
      </article>
    </main>
  );
}
