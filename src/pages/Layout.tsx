import { Outlet } from "react-router-dom";
import Navbar from "../components/partials/navbar";
import Footer from "../components/partials/footer";
import Preloader from "../components/common/Preloader";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF4E6] text-stone-900 overflow-x-hidden selection:bg-[#F97316] selection:text-white">
      {/* Edolus-style Left-to-Right Theatrical Preloader */}
      <Preloader />

      <Navbar />
      <main className="flex-grow w-full pt-[74px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
