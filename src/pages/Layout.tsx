import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/partials/navbar";
import Footer from "../components/partials/footer";
import Preloader from "../components/common/Preloader";

export default function RootLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const [isIntroActive, setIsIntroActive] = useState(isHomePage);

  useEffect(() => {
    if (!isHomePage) {
      setIsIntroActive(false);
      return;
    }

    const handleReveal = () => {
      setIsIntroActive(false);
    };

    window.addEventListener('reveal-navbar', handleReveal);
    return () => window.removeEventListener('reveal-navbar', handleReveal);
  }, [isHomePage]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-1000 ${isIntroActive ? 'bg-black' : 'bg-[#FAF4E6]'} text-stone-900 overflow-x-hidden selection:bg-[#F97316] selection:text-white`}>
      {/* Edolus-style Left-to-Right Theatrical Preloader */}
      <Preloader />

      <Navbar />
      <main className={`flex-grow w-full ${isIntroActive ? 'pt-0' : 'pt-[74px]'} transition-all duration-700`}>
        <Outlet />
      </main>
      <Footer isHidden={isIntroActive} />
    </div>
  );
}
