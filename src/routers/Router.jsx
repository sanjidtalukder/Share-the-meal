import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../components/home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllDonations from "../pages/AllDonations";
import DonationDetails from "../pages/DonationDetails";

import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";

// Dashboard layout & pages

// import DashboardLayout from "../layout/DashboardLayout";

// import AdminProfile from "../pages/dashboard/admin/AdminProfile";
// import ManageDonations from "../pages/dashboard/admin/ManageDonations";

// import RestaurantProfile from "../pages/dashboard/restaurant/RestaurantProfile";
// import AddDonation from "../pages/dashboard/restaurant/AddDonation";

// import CharityProfile from "../pages/dashboard/charity/CharityProfile";
// import MyRequests from "../pages/dashboard/charity/MyRequests";

// import MyProfile from "../pages/dashboard/user/MyProfile";
// import RequestCharity from "../pages/dashboard/user/RequestCharity";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "donations", element: <AllDonations /> },
      { path: "details", element: <DonationDetails /> },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // ADMIN Routes
      // { path: "admin-profile", element: <AdminProfile /> },
      // { path: "manage-donations", element: <ManageDonations /> },

      // RESTAURANT Routes
      // { path: "restaurant-profile", element: <RestaurantProfile /> },
      // { path: "add-donation", element: <AddDonation /> },

      // CHARITY Routes
      // { path: "charity-profile", element: <CharityProfile /> },
      // { path: "my-requests", element: <MyRequests /> },

      // USER Routes
      // { path: "my-profile", element: <MyProfile /> },
      // { path: "request-charity-role", element: <RequestCharity /> },
      
    ],
  },
]);

export default router;
