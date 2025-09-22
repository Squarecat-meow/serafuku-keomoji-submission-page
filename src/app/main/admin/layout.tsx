import Sidebar from "./_components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="text-4xl font-bold">관리자 페이지</h1>
      <section className="grid grid-cols-6 gap-4">
        <aside>
          <Sidebar />
        </aside>
        <article className="p-4 col-span-5 bg-base-100 rounded-2xl">
          {children}
        </article>
      </section>
    </>
  );
}
