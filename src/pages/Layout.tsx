import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/partials/navbar";
import Footer from "../components/partials/footer";
import Preloader from "../components/common/Preloader";
import SmoothScroll from "../components/common/SmoothScroll";

export default function RootLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isHeroPage = isHomePage || location.pathname === '/meet-us' || location.pathname === '/who-we-are';
  const [isFooterHidden, setIsFooterHidden] = useState(false);

  useEffect(() => {
    if (!isHomePage && typeof window !== 'undefined') {
      (window as unknown as { __preloaderDone?: boolean }).__preloaderDone = true;
    }
  }, [isHomePage]);

  useEffect(() => {
    const handleHideFooter = () => setIsFooterHidden(true);
    const handleRevealFooter = () => setIsFooterHidden(false);

    window.addEventListener('hide-footer', handleHideFooter);
    window.addEventListener('reveal-footer', handleRevealFooter);

    return () => {
      window.removeEventListener('hide-footer', handleHideFooter);
      window.removeEventListener('reveal-footer', handleRevealFooter);
    };
  }, []);

  return (
    <div className={`min-h-screen flex flex-col bg-[#FAF4E6] text-stone-900 ${location.pathname === '/donate' ? 'overflow-x-clip' : 'overflow-x-hidden'} selection:bg-[#F97316] selection:text-white`}>
      {/* Butter-smooth Lenis scroll across the entire application */}
      <SmoothScroll />

      {/* Theatrical Preloader only on home page */}
      {isHomePage && <Preloader />}

      {/* Global Fixed Navbar */}
      <Navbar />   

      <main className={`flex-grow w-full ${isHeroPage ? 'pt-0' : 'pt-[74px]'} transition-all duration-700`}>
        <Outlet />
      </main>

      {/* Global Footer: Rendered on inner pages when not suppressed by cinematic full-page video */}
      {!isHomePage && !isFooterHidden && <Footer />}
    </div>
  );
}
