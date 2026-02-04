import "../src/style/global.css";
import ScrollToTop from "./Components/ScrollToTop";
import Navbar from "./Components/navbar";
import Home from "./pages/Home";
import Footer from "./Components/footer";
import LifePath from "./pages/lifepath";
import Destiny from "./pages/Destiny";
import Soul_urge from "./pages/Soul_urge";
import Mulank from "./pages/Mulank";
import ExpressionNumber from "./pages/Expression";
import PersonalityNumber from "./pages/Personality";
import NameNumber from "./pages/Name";
import Compatibility from "./pages/Compatibility";
// import Remedies from "./pages/Remedies";
import AboutUs from "./Components/About/AboutUs";
import ContectUs from "./Components/Contect/ContectUs";
import Services from "./Components/services_numerology/services";  
import CursorEffect from "./Components/cursoreffect";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <ScrollToTop />
          <Navbar />
          <Home />
          <Footer />
        </>
      ),
    },
    {
      path: "/lifepath",
      element: (
        <>
          <ScrollToTop />
          <Navbar />
          <LifePath />
          <Footer />
        </>
      ),
    },
    {
      path: "/Destiny",
      element: (
        <>
          <ScrollToTop />
          <Navbar />
          <Destiny />
          <Footer />
        </>
      ),
    },
    {
      path: "/Soul_urge",
      element: (
        <>
          <ScrollToTop />
          <Navbar />
          <Soul_urge />
          <Footer />
        </>
      ),
    },
    {
      path: "/Mulank",
      element: (
        <>
          <ScrollToTop />
          <Navbar />
          <Mulank />
          <Footer />
        </>
      ),
    },
    {
      path: "/AboutUs",
      element: (
        <>
          <ScrollToTop />
          <Navbar />
          <AboutUs />
          <Footer />
        </>
      ),
    },
    {
      path: "/ContectUs",
      element: (
        <>
          <ScrollToTop />
          <Navbar />
          <ContectUs />
          <Footer />
        </>
      ),
    },
    {
      path: "/Services",
      element: (
        <>
          <ScrollToTop />
          <Navbar />
          <Services />
          <Footer />
        </>
      ),
    },
    {
      path: "/ExpressionNumber",
      element: (
        <>
          <ScrollToTop />
          <Navbar />
          <ExpressionNumber />
          <Footer />
        </>
      ),
    },
    {
      path: "/PersonalityNumber",
      element: (
        <>
          <ScrollToTop />
          <Navbar />
          <PersonalityNumber />
          <Footer />
        </>
      ),
    },
    {
      path: "/name-numerology",
      element: (
        <>
          <ScrollToTop />
          <Navbar />
          <NameNumber />
          <Footer />
        </>
      ),
    },
    {
      path: "/compatibility",
      element: (
        <>
          <ScrollToTop />
          <Navbar />
          <Compatibility />
          <Footer />
        </>
      ),
    },
    // {
    //   path: "/numerology-remedies",
    //   element: (
    //     <>
    //       <ScrollToTop />
    //       <Navbar />
    //       <Remedies />
    //       <Footer />
    //     </>
    //   ),
    // },
  ]);

  return (
    <>
      <CursorEffect />   {/* ✅ MUST be Capitalized */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
