import { Footer } from "@/app/profile/_components/Footer";
import Header from "@/app/profile/_components/Header";


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
