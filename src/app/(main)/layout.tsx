import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer/Footer";
import { WelcomeChat } from "@/features/chat";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <WelcomeChat />
    </>
  );
}
