import { Outlet } from "react-router-dom";
import Navbar from "../components/partials/navbar";
import Footer from "../components/partials/footer";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-[#f7f5f0] overflow-x-hidden selection:bg-amber-400 selection:text-black">
      <Navbar />
      <main className="flex-grow w-full pt-[84px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
