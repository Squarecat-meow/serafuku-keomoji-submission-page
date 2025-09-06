import NavBar from "@/components/primitives/Navbar";
import { cookies } from "next/headers";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value ?? "";
  return (
    <section className="w-screen p-4">
      <section className="w-full lg:w-3/4 m-auto">
        <NavBar token={accessToken} />
        <article className="my-4 p-4 bg-base-200 text-base-content rounded-2xl shadow">
          {children}
        </article>
      </section>
    </section>
  );
}
