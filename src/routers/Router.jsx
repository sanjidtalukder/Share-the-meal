import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../components/home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllDonations from "../pages/AllDonations";
import DonationDetails from "../pages/DonationDetails";

import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
import MyProfile from "../Dashboard/MyProfile";
import Favorites from "../Dashboard/Favorites";
import MyReviews from "../Dashboard/MyReviews";
import TransactionHistory from "../Dashboard/TransactionHistory";
import RequestCharityRole from "../Dashboard/RequestCharityRole";
import RestaurantProfile from "../Dashboard/RestaurantDashboard/RestaurantProfile";
import AddDonation from "../Dashboard/RestaurantDashboard/AddDonation";
import MyDonations from "../Dashboard/RestaurantDashboard/MyDonations";
import RequestedDonations from "../Dashboard/RestaurantDashboard/RequestedDonations";
import CharityProfile from "../Dashboard/charity/CharityProfile";
import MyRequests from "../Dashboard/charity/MyRequests";
import MyPickups from "../Dashboard/charity/MyPickups";
import ReceivedDonations from "../Dashboard/charity/ReceivedDonations";
import MyCharityTransactions from "../Dashboard/charity/MyCharityTransactions";
import CreatDonation from "../pages/CreatDonation";
import AdminProfile from "../pages/admi/AdminProfile";
import FeatureDonations from "../pages/admi/FeatureDonations";
import ManageCharityRequests from "../pages/admi/ManageCharityRequests";
import ManageDonations from "../pages/admi/ManageDonations";
import ManageRoleRequests from "../pages/admi/ManageRoleRequests";
import ManageUsers from "../pages/admi/ManageUsers";

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
      { path: "/donations/:id", element: <DonationDetails /> },
      { path: "creat-donation", element: <CreatDonation /> },
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
    { path: "my-profile", element: <MyProfile /> },
    { path: "favorites", element: <Favorites /> },
    { path: "my-reviews", element: <MyReviews /> },
    { path: "my-transactions", element: <TransactionHistory /> },
    { path: "request-charity-role", element: <RequestCharityRole /> },
    // { path: "request-charity", element: <RequestCharityRole /> },
    // { path: "favorites", element: <Favorites /> },
      // ADMIN Routes
      // { path: "admin-profile", element: <AdminProfile /> },
      // { path: "manage-donations", element: <ManageDonations /> },

      // RESTAURANT Routes
      { path: "restaurant-profile", element: <RestaurantProfile /> },
      { path: "add-donation", element: <AddDonation /> },
      { path: "my-donations", element: <MyDonations /> },
      { path: "requestedDonatins", element: <RequestedDonations /> },

      // CHARITY Routes
     { path: "charity-profile", element: <CharityProfile /> },
     { path: "my-requests", element: <MyRequests /> },
     { path: "my-pickups", element: <MyPickups/> },
     { path: "received-donations", element: <ReceivedDonations /> },
     { path: "my-charity-transactions", element: <MyCharityTransactions /> },


      // Admin Routes
      { path: "admin-profile", element: <AdminProfile /> },
      { path: "feature-donations", element: <FeatureDonations /> },
      { path: "manage-requests", element: <ManageCharityRequests /> },
      { path: "manage-donations", element: <ManageDonations /> },
      { path: "manage-role-requests", element: <ManageRoleRequests /> },
      { path: "manage-users", element: <ManageUsers /> },

      
    ],
  },
]);

export default router;
