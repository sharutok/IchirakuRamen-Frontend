import React, { useState, useEffect } from "react";
import { Chip, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  AiOutlineDelete,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { BiMailSend } from "react-icons/bi";
import AccountMenu from "./AccountMenu";

import "../CSS/VendorPortalAccounts.scss";


function VendorPortalAccounts() {
  let lastArrValue;
  let postsPerPage = 10;
  let pageArr = [];
  const [active, setActive] = useState({
    status: false,
    allVendor: false,
    vendorMaster: true,
  });
  const [popup, setPopUp] = useState({
    condition: false,
    content: "",
  });
  const [display, setDisplay] = useState({
    status: true,
    allVendor: true,
    vendorMaster: true,
  });
  const [post, setPost] = useState([]);
  const [value, setValue] = useState([]);
  const [page, setPage] = useState(1);

  const [sendData, setSendData] = useState({
    supplier_number: "",
    portal_link: "",
    vendor_email: "",
    type: "",
  });
  const [smartSearch, setSmartSearch] = useState("");
  const [input, setInput] = useState({
    supplier_number: "",
    organization: "",
    supplier_name: "",
    certificate_no: "",
  });

  const getAllURL = `http://localhost:8080/vendor/`;
  const getSmartSearchURL = `http://localhost:8080/vendor/smartSearch/${smartSearch}`;
  const sendMailToVendor = `http://localhost:8080/send_email`; //BACKEND
  const deleteURL = `http://localhost:8080/`;
  const getData = async () => {
    const res = await fetch(getAllURL);
    const data = await res.json();
    setValue(data.allVendor.slice(0, 10));
    setPost(data.allVendor);
  };

  useEffect(() => {
    getData();
  }, []);

  function handleSmartSearchChange(e) {
    setSmartSearch(e.target.value);
    setInput(e.target.value);
  }

  async function handleEnterKeyPress(e) {
    if (e.key === "Enter") {
      try {
        const res = await fetch(getSmartSearchURL);
        const data = await res.json();
        if (data.result) {
          setValue(data.result);
        } else {
          getData();
        }
      } catch (error) {
        console.log({ error });
      }
    }
  }

  for (let i = 1; i <= Math.ceil(post.length / postsPerPage); i++) {
    pageArr.push(i);
  }
  // pageArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  if (pageArr.length >= 10) {
    // console.log("greater than 10");
    const fullpageArrLength = pageArr.length - 1;
    lastArrValue = pageArr[fullpageArrLength];
    pageArr = pageArr.slice(0, 10);
    // console.log(pageArr.length);
  }
  // console.log(lastArrValue);

  function showPosts(e) {
    const value = postsPerPage * e - 1;
    const x = postsPerPage * (e - 1);
    setValue(post.slice(x, value + 1));
  }
  async function handleCheck() {
    if (sendData.type === "send") {
      console.log(sendData.type);
      await axios.post(sendMailToVendor, sendData);
      console.log(sendData);
    }
    if (sendData.type === "delete") {
      console.log(sendData.type);
      console.log(sendData);
      console.log(`${deleteURL}${sendData.supplier_number}`);
      await axios.delete(`${deleteURL}${sendData.supplier_number}`);
    }
    setPopUp({
      content: "",
      condition: false,
    });
    setSendData({
      supplier_number: "",
      portal_link: "",
      vendor_email: "",
      type: "",
    });
  }
  return (
    <>
      <div>

        {popup.condition && (
          <div className="popover">
            <h3>{popup.content}</h3>
            <div className="yesno ">
              <button
                className="yes"
                onClick={() => {
                  handleCheck();
                }}
              >
                Yes
              </button>
              <button
                className="no"
                onClick={() => {
                  setPopUp({
                    content: "",
                    condition: false,
                  });
                }}
              >
                No
              </button>
            </div>
          </div>
        )}
        <div className="smart-search">
          <input
            onKeyPress={handleEnterKeyPress}
            value={smartSearch}
            onChange={handleSmartSearchChange}
            placeholder="Smart Search"
          />
        </div>
        <div className="bifercation">

          <div className="control-panel">
            <Stack direction="row" spacing={1} className="log-out-menu"  >
              <AccountMenu />
              <Chip
                className="log-out-menu-chip"
                // avatar={<Avatar></Avatar>}
                size="large"
                label="Sharan Kudtarkar"
              />
              {/* <MoreVertIcon style={{ fontSize: "2rem" }} /> */}
            </Stack>
            <h1>Control Panel</h1>
            <h3
              onClick={() => {
                setDisplay({
                  status: true,
                  allVendor: true,
                  vendorMaster: true,
                  allVendor: true,
                });
                setActive({
                  status: false,
                  allVendor: false,
                  vendorMaster: true,
                });
              }}
              style={{

                backgroundColor: active.vendorMaster && "black",
                padding: active.vendorMaster && "0.5rem 1.5rem",
                borderTopLeftRadius: active.vendorMaster && "100px",
                borderBottomLeftRadius: active.vendorMaster && "100px",
              }}
            >
              Vendor Master
            </h3>
            {/* <h3
              onClick={() => {
                setDisplay({
                  status: true,
                  vendorMaster: true,
                  allVendor: false,
                });
                setActive({
                  status: false,

                  vendorMaster: false,
                  allVendor: true,
                });
              }}
              style={{
                fontSize: active.allVendor ? "1.5rem" : "1rem",
                color: active.allVendor ? "burlywood" : "black",
              }}
            >
              All Vendors
            </h3> */}
            <h3
              onClick={() => {
                setDisplay({
                  allVendor: true,
                  vendorMaster: true,
                  status: false,
                });
                setActive({
                  allVendor: false,
                  vendorMaster: false,
                  status: true,
                });
              }}
              style={{
                backgroundColor: active.status && "black",
                borderTopLeftRadius: active.status && "100px",
                borderBottomLeftRadius: active.status && "100px",
                padding: active.status && "0.5rem 1.5rem",
              }}
            >
              Status
            </h3>
          </div>
          <form className="right-view">
            <div className="acc_page_label">
              {<label>Party Number</label>}
              {<label>Party Name</label>}
              {display.status && <label>Party Supplier Name</label>}
              {display.status && <label>MSME Number</label>}
              {display.allVendor && <label>Status</label>}
              {display.allVendor && <label>Operations</label>}
            </div>
            <div>
              {display.vendorMaster &&
                value.map((arr, i) => {
                  if (i % 2 === 0) {
                    return (
                      <>
                        <div className="black">
                          <Account_Page
                            arr={arr}
                            i={i}
                            display={display}
                            popup={popup}
                            setPopUp={setPopUp}
                            sendData={sendData}
                            setSendData={setSendData}
                          />
                        </div>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <div className="white">
                          <Account_Page
                            arr={arr}
                            i={i}
                            display={display}
                            popup={popup}
                            setPopUp={setPopUp}
                            sendData={sendData}
                            setSendData={setSendData}
                          />
                        </div>
                      </>
                    );
                  }
                })}
            </div>
            <label className="page">Page: {page}</label>
            <div className="pagination">

              {pageArr.map((no) => {
                return (
                  <>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        showPosts(no);
                        setPage(no)
                      }}
                    >
                      {no}
                    </button>

                  </>
                );
              })}
              {lastArrValue && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    showPosts(lastArrValue);
                    setPage(lastArrValue)
                  }}
                  type=""
                >
                  ....{lastArrValue}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
function Account_Page({
  arr,
  display,
  setPopUp,
  popup,
  sendData,
  setSendData,
}) {
  const portal_link = "http://localhost:3000/vendor_details"; //FRONTEND
  function handleSendMail(vendor_email, supplier_number) {
    setPopUp({
      condition: true,
      content: "Sure you want to send!!!",
    });
    setSendData({ vendor_email, supplier_number, portal_link, type: "send" });
  }
  function handleDeleteCheck(supplier_number) {
    setPopUp({
      condition: true,
      content: "Sure you want to delete?",
    });
    setSendData({
      vendor_email: "",
      supplier_number,
      portal_link,
      type: "delete",
    });
  }
  return (
    <>
      <div className="acc_page">
        <input disabled="true" type="" name="" value={arr.supplier_number} />
        <input
          disabled="true"
          type=""
          name=""
          value={arr.organization !== null ? arr.organization : "N/A"}
        />
        {display.status && (
          <input
            disabled="true"
            type=""
            name=""
            value={arr.supplier_name !== null ? arr.supplier_name : "N/A"}
          />
        )}
        {display.status && (
          <input
            disabled="true"
            type=""
            name=""
            value={arr.certificate_no !== "" ? arr.certificate_no : "N/A"}
          />
        )}
        {display.allVendor && (
          <input disabled="true" type="" name="" style={{ color: arr.status === "Pending" ? "red" : "green" }} value={arr.status} />
        )}
        {display.allVendor && (
          <>
            <div>
              <button
                className="link-send"
                type=""
                onClick={(e) => {
                  e.preventDefault();
                  handleSendMail(arr.vendor_email, arr.supplier_number);
                }}
              >
                <BiMailSend />
                <span
                  className="hover-message"
                  style={{ position: "absolute" }}
                >
                  Send mail
                </span>
              </button>
            </div>
            <Link className="know-more" to={`/acc/${arr.supplier_number}`}>
              <AiOutlineInfoCircle />
              <span className="hover-message" style={{ position: "absolute" }}>
                Details
              </span>
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleDeleteCheck(arr.supplier_number);
              }}
              className="delete"
            >
              <AiOutlineDelete />
              <span className="hover-message" style={{ position: "absolute" }}>
                Delete
              </span>
            </button>
          </>
        )}
      </div>
    </>
  );
}
export default VendorPortalAccounts;
