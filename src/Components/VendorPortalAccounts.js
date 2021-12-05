import React, { useState, useEffect } from "react";
import { Chip, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  AiOutlineDelete,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { ImHome } from "react-icons/im"
import { GoReport } from "react-icons/go"
import { HiUserGroup } from "react-icons/hi"
import { BiMailSend } from "react-icons/bi";
import AccountMenu from "./AccountMenu";
import "../CSS/VendorPortalAccounts.scss";
import bcrypt from 'bcryptjs'
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Cookies from "universal-cookie";
import Badge from '@mui/material/Badge';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingSkeleton from "./LoadingSkeleton";
const cookie = new Cookies()
function VendorPortalAccounts() {
  const user = cookie.get("user")
  const plant = cookie.get("plant")
  let lastArrValue;
  let postsPerPage = 10;
  let pageArr = [];
  const [status, setStatus] = useState({
    pending: "", approved: "", new_record: ""
  })

  const [active, setActive] = useState({
    vendorMaster: true,
    status: false,
    allVendor: false,
  });
  const [display, setDisplay] = useState({
    vendorMaster: true,
    status: true,
    allVendor: true,
  });
  const [popup, setPopUp] = useState({
    condition: false,
    content: "",
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
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getAllURL = `http://localhost:8080/vendor/access/${plant}`;
  const getSmartSearchURL = `http://localhost:8080/vendor/smartSearch/${smartSearch}`;
  const sendMailToVendor = `http://localhost:8080/send_email`; //BACKEND
  const deleteURLVendor = `http://localhost:8080/vendor`;
  const deleteURLImg = `http://localhost:8080/file-upload/img`;
  const msmeVendorDetails = `http://localhost:8080/msms_vendor`


  const getData = async () => {
    const res = await fetch(getAllURL)
    const data = await res.json();
    setValue(data.allVendor.slice(0, 10));
    setPost(data.allVendor);
    console.log(post);
  };

  const getMSMEVendorData = async () => {
    const res = await fetch(msmeVendorDetails)
    const data = await res.json();
    console.log(data.msme_vendors);
    setValue(data.msme_vendors.slice(0, 10));
    setPost(data.msme_vendors);

  }


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
          setValue(data.result.slice(0, 10));
          setPost(data.result);
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
  //pageArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
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
      setOpen(false)
      await axios.post(sendMailToVendor, sendData);
      setPopUp({
        content: "",
        condition: false,
      });
    }
    if (sendData.type === "delete") {
      // console.log(sendData);
      setPopUp({
        content: "",
        condition: false,
      });
      setOpen(false)
      await axios.delete(`${deleteURLVendor}/${sendData.supplier_number}`);
      await axios.delete(`${deleteURLImg}/${sendData.supplier_number}`)
    }

    setPopUp({
      content: "",
      condition: false,
    });
    setSendData({
      portal_link: "",
      supplier_number: "",
      vendor_email: "",
      type: "",
    });
  }

  async function status_length() {
    const new_record = await axios.get(`http://localhost:8080/today_data`)
    const approved = await axios.get(`http://localhost:8080/vendor/status/${1}`)
    const pending = await axios.get(`http://localhost:8080/vendor/status/${0}`)
    setStatus({
      pending: pending.data.result,
      approved: approved.data.result,
      new_record: new_record.data.length
    })

  }
  useEffect(() => {
    status_length()
    setTimeout(() => {
      setLoading(true)
    }, 1500)
  }, [])
  // console.log(popup.condition);
  return (
    <>
      <div>
        <div>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogContent>
              {popup.content}
            </DialogContent >
            {sendData.vendor_email && <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
              {sendData.vendor_email}
            </DialogTitle>}
            <DialogActions  >
              <Button onClick={handleCheck} >
                Yes
              </Button>
              <Button autoFocus onClick={handleClose}>No</Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className="smart-search">
          <input
            onKeyPress={handleEnterKeyPress}
            value={smartSearch}
            onChange={handleSmartSearchChange}
            placeholder="Search"
          />
        </div>
        <div className="bifercation">
          <div className="control-panel">
            {/* <Tooltip title="Logout" placement="right"> */}
            <Stack style={{ backgroundColor: " rgb(170, 170, 170)" }}>
              <AccountMenu />
            </Stack>
            <h3
              onClick={() => {
                getData()
                setDisplay({
                  vendorMaster: true,
                  status: true,
                  allVendor: true,

                });
                setActive({
                  vendorMaster: true,
                  status: false,
                  allVendor: false,
                });
              }}
            >
              <Tooltip title="Vendor Master" placement="right" disableInteractive>
                <IconButton style={{
                  color: active.vendorMaster && "#e7eaf6",
                  backgroundColor: active.vendorMaster && "#113f67",
                  borderRadius: active.vendorMaster && "5px"
                }}>
                  <ImHome />
                </IconButton>
              </Tooltip>
            </h3>
            <h3
              onClick={() => {
                getMSMEVendorData()
                // setDisplay({
                //   allVendor: true,
                //   vendorMaster: true,
                //   status: false,
                // });
                setActive({
                  allVendor: true,
                  vendorMaster: false,
                  status: false,
                });
              }}>
              <Tooltip title="MSME Vendors" placement="right" disableInteractive  >
                <IconButton style={{
                  color: active.allVendor && "#e7eaf6",
                  backgroundColor: active.allVendor && "#113f67",
                  borderRadius: active.allVendor && "5px"
                }}>
                  <HiUserGroup />
                </IconButton>
              </Tooltip>
            </h3>
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
              }}>
              <Tooltip title="Status" placement="right" disableInteractive  >
                <IconButton style={{
                  color: active.status && "#e7eaf6",
                  backgroundColor: active.status && "#113f67",
                  borderRadius: active.status && "5px"
                }}>
                  <GoReport />
                </IconButton>
              </Tooltip>
            </h3>


          </div>

          {loading ? <form className="right-view">
            <div className="acc_page_label">
              {<label>Vendor Number</label>}
              {<label>Plant</label>}
              {display.status && <label>Vendor Name</label>}
              {display.status && <label>MSME Number</label>}
              {display.allVendor && <label>Status</label>}
              {display.status && <label>Operations</label>}
            </div>
            <div>
              {display.vendorMaster &&
                value.map((arr, i) => {
                  if (i % 2 === 0) {
                    return (
                      <>
                        <div className="black">
                          <Account_Page
                            key={i}
                            arr={arr}
                            i={i}
                            display={display}
                            popup={popup}
                            setPopUp={setPopUp}
                            sendData={sendData}
                            setSendData={setSendData}
                            handleClickOpen={handleClickOpen}
                          />
                        </div>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <div className="white">
                          <Account_Page
                            key={i}
                            arr={arr}
                            i={i}
                            display={display}
                            popup={popup}
                            setPopUp={setPopUp}
                            sendData={sendData}
                            setSendData={setSendData}
                            handleClickOpen={handleClickOpen}
                          />
                        </div>
                      </>
                    );
                  }
                })}
            </div>
            <div className="page">
              <label >Page:<span style={{ color: "grey" }}>{page}</span></label>
            </div>

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
          </form> : < LoadingSkeleton />}
          {!display.status && <>
            <div className="badge-container" >
              <div className="badge">
                <Badge max={9999} badgeContent={status.pending} color="primary" className="badge-icons">
                  <PendingActionsIcon fontSize="medium" sx={{ color: "red" }} />
                </Badge>
                <label for="">Pending</label>
              </div>
              <div className="badge">
                <Badge badgeContent={status.approved} color="primary" className="badge-icons">
                  <DoneAllIcon fontSize="medium" color="success" />
                </Badge>
                <label for="">Approved</label>
              </div>
              <div className="badge">
                <Badge badgeContent={status.new_record} color="primary" className="badge-icons">
                  <AddIcon fontSize="medium" sx={{ color: "lightblue" }} />
                </Badge>
                <label for="">New Record</label>
              </div>
              <div className="badge">
                <Badge max={9999} badgeContent={(post.length)} color="primary" className="badge-icons">
                  <FormatListBulletedIcon fontSize="medium" sx={{ color: "black" }} />
                </Badge>
                <label for="">Total Records</label>
              </div>
            </div>
          </>}
        </div>
      </div>
    </>
  );
}
function Account_Page({
  arr,
  display,
  setPopUp,
  handleClickOpen,
  popup,
  sendData,
  setSendData,
}) {

  let portal_link = `http://localhost:3000/vendor_details`; //FRONTEND
  function handleSendMail(vendor_email, supplier_number) {
    let key = bcrypt.hashSync(supplier_number, 10)
    portal_link = `${portal_link}/key?v=${key}`
    setPopUp({
      condition: true,
      content: `Sure you want to send mail to !!! `,
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
          disabled={true}
          type=""
          name=""
          value={arr.organization !== null ? arr.organization : "N/A"}
        />

        {display.status && (
          <Tooltip placement="top" title={arr.supplier_name} disableInteractive>
            <input
              disabled={true}
              type=""
              name=""

              value={arr.supplier_name !== null ? arr.supplier_name.substring(0, 17) + "...." : "N/A"}
            />
          </Tooltip>
        )}
        {display.status && (
          <input
            disabled={true}
            type=""
            name=""
            value={arr.certificate_no !== "" ? arr.certificate_no : "N/A"}
          />
        )}
        {display.allVendor && (
          <input disabled={true} type="" name="" style={{ color: arr.status === "0" ? "red" : "green" }}
            value={arr.status === "0" ? "Pending" : "Approved"} />
        )}
        {display.status && (
          <>
            <div>
              <Tooltip arrow placement="top" title="Send Email" disableInteractive>
                <button
                  className="link-send"
                  type=""
                  onClick={(e) => {
                    e.preventDefault();
                    handleClickOpen()
                    handleSendMail(arr.vendor_email, arr.supplier_number);
                  }}>
                  <BiMailSend />
                </button>
              </Tooltip>
            </div>
            <Tooltip arrow placement="top" title="Info" disableInteractive>
              <Link className="know-more" to={`/acc/${arr.supplier_number}/${arr.organization}`}>
                <AiOutlineInfoCircle />
              </Link>
            </Tooltip>
            <Tooltip arrow placement="top" title="Delete / Not MSEME Vendor " disableInteractive>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleClickOpen()
                  handleDeleteCheck(arr.supplier_number);
                }}
                className="delete"
              >
                <AiOutlineDelete />
              </button>
            </Tooltip>
          </>
        )}
      </div>

    </>
  );
}
export default VendorPortalAccounts;
