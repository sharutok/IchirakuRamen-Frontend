import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import LoginPage from "./LoginPage";
import UserPermissionAccessDetails from "./UserPermissionAccessDetails"
import VendorPortalAccounts from "./VendorPortalAccounts";
import VendorPortalAccVendorDetails from "./VendorPortalAccVendorDetails";
import ResetPassword from "./ResetPassword";
import VendorPortalVendor from "./VendorPortalVendor";
import ErrorMessage from './ErrorMessage'
import { Online, Offline } from "react-detect-offline";
import InternetConnect from "./InternetConnect";
import awl_logo from "../Images/AWL_logo_new.png";
import Cookies from 'universal-cookie'
import "../CSS/App.scss";
import InValidAcessMessage from "./InValidAccessMessage";
import UserPermissionAccess from "./UserPermissionAccess";
function App() {
  const cookie = new Cookies()
  const user = cookie.get("user")
  const plant = cookie.get('plant')
  console.log(user, plant);
  return (
    <>
      <Offline>
        <InternetConnect />
      </Offline>
      {/* <Online> */}
      <Router>
        <Link to style={{ textDecoration: "none" }}>
          <div className="top-heading">
            <img src={awl_logo} />
            <h1>Ministry of <span>M</span>icro, <span>S</span>mall and <span>M</span>edium <span>E</span>nterprises</h1>
          </div>
        </Link>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account/password/reset" element={<ResetPassword />} />
          <Route path="/vendor_details/key" element={<VendorPortalVendor />} />
          {user ? <Route path="/acc" element={<VendorPortalAccounts />} /> : <Route path="/acc" element={<InValidAcessMessage />} />}
          {user ? <Route path="/acc/:id/:org" element={<VendorPortalAccVendorDetails />} /> : <Route path="/acc/:id" element={<InValidAcessMessage />} />}
          <Route path="/user/permission" element={<UserPermissionAccess />} />
          <Route path="/user/permission/:email" element={<UserPermissionAccessDetails />} />
          <Route path="*" element={<ErrorMessage />} />
        </Routes>
      </Router>
      {/* </Online> */}

    </>
  );
}

export default App;
