import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/partials/navbar";
import Footer from "../components/partials/footer";
import Preloader from "../components/common/Preloader";
import SmoothScroll from "../components/common/SmoothScroll";

export default function RootLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF4E6] text-stone-900 overflow-x-hidden selection:bg-[#F97316] selection:text-white">
      {/* Butter-smooth Lenis scroll across the entire application */}
      <SmoothScroll />

      {/* Theatrical Preloader */}
      <Preloader />

      {/* Global Fixed Navbar */}
      <Navbar />

      <main className={`flex-grow w-full ${isHomePage ? 'pt-0' : 'pt-[74px]'} transition-all duration-700`}>
        <Outlet />
      </main>

      {/* Global Footer: Rendered on inner pages; on Home page it is integrated into the 3D sanctuary finale */}
      {!isHomePage && <Footer />}
    </div>
  );
}
