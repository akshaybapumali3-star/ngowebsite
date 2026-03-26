import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/header";
import MainNavbar from "./components/mainNavbar";
import MarketplaceNavbar from "./components/marketplaceNavbar";
import NGONavbar from "./components/ngonavbar";
import PortalNavbar from "./pages/Portal/PortalNavbar";
import Footer from "./components/footer";
import LoginPopup from "./components/loginPopup";

// MAIN PAGES
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import EditProfile from "./pages/Auth/EditProfile";

// PORTAL PAGES
import PortalHome from "./pages/Portal/PortalHome";
import ComplaintForm from "./pages/Portal/ComplaintForm";
import TrackComplaint from "./pages/Portal/TrackComplaint";

// MARKETPLACE PAGES
import Categories from "./pages/marketPlace/categories";
import CategoryProducts from "./pages/marketPlace/categoryProducts";
import Orders from "./pages/marketPlace/orders";
import Profile from "./pages/marketPlace/profile";
import Cart from "./pages/marketPlace/cart";

// VOLUNTEER
import Volunteer from "./pages/volunteer/volunteer";

// NGO PAGES
import NgoRegister from "./pages/NGO/NgoRegister";
import NgoLogin from "./pages/NGORegister/ngoLogin";
import NgoDashboard from "./pages/NGORegister/ngoDashboard";
import MarketActivity from "./pages/NGORegister/marketactivity";
import AddCategory from "./pages/NGORegister/addCategory";
import AddProduct from "./pages/NGORegister/addProduct";
import AddActivity from "./pages/NGORegister/addActivity";
import NGOMarketProducts from "./pages/NGORegister/ngoMarketProducts";
import NGOMarketOrders from "./pages/NGORegister/ngoMarketOrders";
import NGOMarketAnalytics from "./pages/NGORegister/ngoMarketAnalytics";
import NGOVolunteers from "./pages/NGORegister/ngoVolunteers";
import NGOReportChild from "./pages/NGORegister/NGOReportChild";

function App() {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  // LOGIN POPUP
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (
      !token &&
      !location.pathname.startsWith("/ngo") &&
      !location.pathname.startsWith("/login") &&
      !location.pathname.startsWith("/signup") &&
      !location.pathname.startsWith("/edit-profile") &&
      !location.pathname.startsWith("/portal") &&
      !location.pathname.startsWith("/report-child") &&
      !location.pathname.startsWith("/report")
    ) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [location]);

  // NAVBAR CONTROL
  const isMarketplace =
    (location.pathname.includes("/marketplace") ||
      location.pathname.includes("category-products")) &&
    !location.pathname.startsWith("/ngo");

  // ✅ FIXED NGO NAVBAR (IMPORTANT)
  const isNgo = location.pathname.startsWith("/ngo");

  // ✅ FIXED PORTAL NAVBAR
  const isPortal = location.pathname.startsWith("/portal");

  // NGO PROTECTED ROUTE
  const ProtectedNgoRoute = ({ children }) => {
    const ngo = localStorage.getItem("ngoToken");
    return ngo ? children : <Navigate to="/ngo/login" />;
  };

  return (
    <>
      <Header />

      {/* NAVBAR SWITCHING */}
      {isPortal ? (
        <PortalNavbar />
      ) : isMarketplace ? (
        <MarketplaceNavbar />
      ) : isNgo ? (
        <NGONavbar />
      ) : (
        <MainNavbar />
      )}

      <Routes>
        {/* MAIN */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/volunteer" element={<Volunteer />} />

        {/* PORTAL */}
        <Route path="/portal" element={<PortalHome />} />
        <Route path="/portal/report" element={<ComplaintForm />} />
        <Route path="/portal/track-complaint" element={<TrackComplaint />} />
        <Route path="/report" element={<Navigate to="/portal/report" />} />

        {/* USER REPORT CHILD */}
        <Route path="/report-child" element={<PortalHome />} />
        <Route path="/report-child/complaint" element={<ComplaintForm />} />
        <Route path="/report-child/track" element={<TrackComplaint />} />

        {/* MARKETPLACE */}
        <Route path="/marketplace" element={<Categories />} />
        <Route path="/marketplace/categories" element={<Categories />} />
        <Route path="/category-products" element={<CategoryProducts />} />
        <Route path="/marketplace/orders" element={<Orders />} />
        <Route path="/marketplace/profile" element={<Profile />} />
        <Route path="/marketplace/cart" element={<Cart />} />

        {/* NGO PUBLIC */}
        <Route path="/ngo/register" element={<NgoRegister />} />
        <Route path="/ngo/login" element={<NgoLogin />} />

        {/* NGO PROTECTED */}
        <Route
          path="/ngo/dashboard"
          element={
            <ProtectedNgoRoute>
              <NgoDashboard />
            </ProtectedNgoRoute>
          }
        />

        {/* ✅ NGO REPORT CHILD */}
        <Route
          path="/ngo/report-child"
          element={
            <ProtectedNgoRoute>
              <NGOReportChild />
            </ProtectedNgoRoute>
          }
        />

        <Route
          path="/ngo/marketplace"
          element={
            <ProtectedNgoRoute>
              <MarketActivity />
            </ProtectedNgoRoute>
          }
        />

        <Route
          path="/ngo/market-products"
          element={
            <ProtectedNgoRoute>
              <NGOMarketProducts />
            </ProtectedNgoRoute>
          }
        />

        <Route
          path="/ngo/market-orders"
          element={
            <ProtectedNgoRoute>
              <NGOMarketOrders />
            </ProtectedNgoRoute>
          }
        />

        <Route
          path="/ngo/market-analytics"
          element={
            <ProtectedNgoRoute>
              <NGOMarketAnalytics />
            </ProtectedNgoRoute>
          }
        />

        <Route
          path="/ngo/volunteers"
          element={
            <ProtectedNgoRoute>
              <NGOVolunteers />
            </ProtectedNgoRoute>
          }
        />

        <Route
          path="/ngo/add-product"
          element={
            <ProtectedNgoRoute>
              <AddProduct />
            </ProtectedNgoRoute>
          }
        />

        <Route
          path="/ngo/add-activity"
          element={
            <ProtectedNgoRoute>
              <AddActivity />
            </ProtectedNgoRoute>
          }
        />

        <Route
          path="/add-category"
          element={
            <ProtectedNgoRoute>
              <AddCategory />
            </ProtectedNgoRoute>
          }
        />

        {/* DEFAULT */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {showPopup && <LoginPopup onClose={() => setShowPopup(false)} />}
      <Footer />
    </>
  );
}

export default App;