import Layout from "./components/layout/Layout";
import Home from "./components/Home/Home"
import ProductDetails from "./components/Product/ProductDetails"
import Cart from "./components/Cart/Cart"
import React from "react";
import Products from "./components/Product/Products"
import CategoriesPage from "./components/Product/CategoryPage"
import Login from "./components/User/Login"
import SignUp from "./components/User/SignUp"
import Dashbord from "./components/admin/Dashbord";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./components/User/UserProfile"
import ManageUser from "./components/admin/manageUsers/ManageUsers";
import Manageproduct from "./components/admin/manageProduct/Manageproduct";
import AddProduct from "./components/admin/manageProduct/AddProduct";
import ShippingForm from "./components/Cart/ShippingForm";
import ManageOrders from "./components/admin/manageOrders/ManageOrders";
import ManageSingleUser from "./components/admin/manageUsers/ManageSingleUser";
import ManageSingleOrder from "./components/admin/manageOrders/ManageSingleOrder";
import ManageReviews from "./components/admin/manageReviews/ManageReviews";
import ManageSingleProduct from "./components/admin/manageProduct/ManageSingleProduct";
import EditProduct from "./components/admin/manageProduct/UpdateProduct";
import UpdateUserProfile from "./components/User/UpdateUserProfile";
import ShippingInfo from "./components/Cart/ShippingInfo";
import PaymentSucessfull from "./components/Cart/PaymentSucessfull";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgetPassword from "./components/User/ForgetPassword";
import ResetPassword from "./components/User/ResetPassword";
import Myorders from "./components/User/Myorders";
import SingleOrder from "./components/User/SingleOrder";
import AboutMe from "./components/aboutUs/AboutMe";
import ContactUs from "./components/contactUs/ContactUs";
import PageNotFound from "./components/layout/PageNotFound";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import VerifyMessage from "./components/User/VerifyMessage";
import VerifyAccount from "./components/User/VerifyAccount";
import ForgetPasswordMessage from "./components/User/ForgetPasswordMessage";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products/catogries" element={<CategoriesPage />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" >
          <Route index element={<Cart />} />
          <Route path="checkout" element={<ProtectedRoute Component={ShippingForm} />} />
          <Route path="shippinginfo" element={<ProtectedRoute Component={ShippingInfo} />} />
          <Route path="orderplaced" element={<PaymentSucessfull />} />
        </Route>
        <Route path="products/:keyword" element={<Products />} />
        <Route path="products" element={<Products />}>
        </Route>
        < Route path="user" >
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="profile" element={<ProtectedRoute Component={UserProfile} />} />
          <Route path="updateprofile" element={<ProtectedRoute Component={UpdateUserProfile} />} />
          <Route path="updatepassword" element={<ProtectedRoute Component={UpdatePassword} />} />
          <Route path="password/forget" element={<ForgetPassword />} />
          <Route path="verifymessage" element={<VerifyMessage />} />
          <Route path="verify/:token" element={<VerifyAccount />} />
        </Route>
        <Route path="myorders" element={<ProtectedRoute Component={Myorders} />} />
        <Route path="order/:id" element={<ProtectedRoute Component={SingleOrder} />} />
        <Route path="password/reset/:token" element={<ResetPassword />} />
        <Route path="forgetpasswordmessage" element={<ForgetPasswordMessage />} />
        <Route path='admin'>
          <Route path="dashbord" element={<ProtectedRoute Component={Dashbord} adminOnly={true} />} />
          <Route path="manageuser" element={<ProtectedRoute Component={ManageUser} adminOnly={true} />} />
          <Route path="user/:id" element={<ProtectedRoute Component={ManageSingleUser} adminOnly={true} />} />
          <Route path="manageproduct">
            <Route index element={<ProtectedRoute Component={Manageproduct} adminOnly={true} />} />
            <Route path="addproduct" element={<ProtectedRoute Component={AddProduct} adminOnly={true} />} />
            <Route path="editproduct" element={<ProtectedRoute Component={EditProduct} adminOnly={true} />} />
          </Route>
          <Route path="product/:id" element={<ProtectedRoute Component={ManageSingleProduct} adminOnly={true} />} />
          <Route path="manageorder" element={<ProtectedRoute Component={ManageOrders} adminOnly={true} />} />
          <Route path="order/:id" element={<ProtectedRoute Component={ManageSingleOrder} adminOnly={true} />} />
          <Route path="managereviews" element={<ProtectedRoute Component={ManageReviews} adminOnly={true} />} />
        </Route>
        <Route path="aboutme" element={<AboutMe />} />
        <Route path="contactus" element={<ProtectedRoute Component={ContactUs} />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
