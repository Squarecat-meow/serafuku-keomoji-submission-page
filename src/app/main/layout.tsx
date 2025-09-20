import AnimatePresenceWrapper from "@/components/animation/AnimatedPresenceWrapper";
import GlobalLoading from "@/components/primitives/GlobalLoading";
import GlobalModal from "@/components/primitives/modal/GlobalModal";
import NavBar from "@/components/primitives/Navbar";
import { cookies } from "next/headers";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const miAccessToken = cookieStore.get("misskeyAccessToken")?.value ?? "";
  return (
    <main className="w-full flex flex-col lg:w-3/4 p-4 m-auto">
      <NavBar token={miAccessToken} />
      <section className="h-full my-4 p-4 flex-1 bg-base-200/80 backdrop-blur-lg text-base-content rounded-2xl shadow">
        <AnimatePresenceWrapper>{children}</AnimatePresenceWrapper>
      </section>
      <GlobalModal />
      <GlobalLoading />
    </main>
  );
}
