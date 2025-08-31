import NavBar from '@/components/primitives/Navbar';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="w-screen p-4">
      <section className="w-full md:w-3/4 m-auto">
        <NavBar />
        {children}
      </section>
    </section>
  );
}
