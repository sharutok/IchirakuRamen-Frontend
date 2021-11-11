import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import LoginPage from "./LoginPage";
import VendorPortalAccounts from "./VendorPortalAccounts";
import VendorPortalAccVendorDetails from "./VendorPortalAccVendorDetails";
import ResetPassword from "./ResetPassword";
import VendorPortalVendor from "./VendorPortalVendor";
import { Online, Offline } from "react-detect-offline";
import InternetConnect from "./InternetConnect";
import awl_logo from "../Images/AWL_logo_new.png";
import "../CSS/App.scss";
function App() {
  return (
    <>
      <Offline>
        <InternetConnect />
      </Offline>
      <Online>
        <Router>
          <Link to style={{ textDecoration: "none" }}>
            <div className="top-heading">
              <img src={awl_logo} />
              <h1>MSME</h1>
            </div>
          </Link>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/account/password/reset" element={<ResetPassword />} />
            <Route path="/vendor_details" element={<VendorPortalVendor />} />
            <Route path="/acc" element={<VendorPortalAccounts />} />
            <Route path="/acc/:id" element={<VendorPortalAccVendorDetails />} />
            <Route path="*" element={<h1>wrong address</h1>} />
          </Routes>
        </Router>
      </Online>

    </>
  );
}

export default App;
