import React, { useEffect, useState } from "react";
import "../CSS/VendorPortalAccVendorDetails.scss";

import { useParams } from 'react-router'
import axios from "axios";
import { Link } from 'react-router-dom'
import TextareaAutosize from '@mui/material/TextareaAutosize';
function VendorPortalAccVendorDetails() {
  const { id } = useParams();

  const [img, setImg] = useState("");
  const [arr, setArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataget, setDataGet] = useState("");
  const [vInfo, setVInfo] = useState({
    supplier_number: "",
    organization: "",
    supplier_name: "",
    type: "",
    created_date: "",
    inactive_date: "",
    classification: "",
    certificate_no: "",
    certificate_agency: "",
    certificate_expiration_date: "",
    certificate_registration_date: "",
    upload_certificate: "",
    status: "",
    remarks: ""

  });
  const [hide, setHide] = useState({
    disabled: true,
    save: true,
  });
  const [imgShow, setImgShow] = useState(false);
  const [mess, setMess] = useState({
    state: false,
    content: "",
  });

  const getURL = `http://localhost:8080/vendor/${id}`;
  const deleteURL = `http://localhost:8080/vendor/${id}`;
  const patchURL = `http://localhost:8080/vendor/${id}`;
  const getImageURL = `http://localhost:8080/file-upload/img/${id}`;

  const getImgData = async () => {
    const response = await fetch(getImageURL);
    const data = await response.json();
    setArr(data);
  };

  const getData = async () => {
    const respond = await fetch(getURL);
    const data = await respond.json();
    setDataGet(data.result);
    if (data.status === 200) {
      data.result.map((x) => {
        setVInfo({
          supplier_number: x.supplier_number,
          organization: x.organization,
          supplier_name: x.supplier_name,
          type: x.type,
          created_date: x.created_date,
          inactive_date: x.inactive_date,
          classification: x.classification,
          certificate_no: x.certificate_no,
          certificate_agency: x.certificate_agency,
          certificate_expiration_date: x.certificate_expiration_date,
          certificate_registration_date: x.certificate_registration_date,
          upload_certificate: x.upload_certificate,
          status: x.status,
          remarks: x.remarks
        });
      });
    } else {
      setVInfo({
        supplier_number: vInfo.supplier_number,
        organization: "",
        supplier_name: "",
        type: "",
        created_date: "",
        inactive_date: "",
        classification: "",
        certificate_no: "",
        certificate_agency: "",
        certificate_expiration_date: "",
        certificate_registration_date: "",
        upload_certificate: "",
        status: "",
        remarks: ""
      });

      setMess({
        state: true,
        content: `There is no Supplier Number of ${vInfo.supplier_number} exist!!!`,
      });
      setTimeout(() => {
        setMess({ state: false, content: "" });
      }, 2000);
    }
  };
  useEffect(() => {
    getData();
    getImgData();
  }, []);

  // const handleSearchClick = (e) => {
  //   e.preventDefault();
  //   if (vInfo.supplier_number === "") {
  //     setMess({
  //       state: true,
  //       content: "There is no Supplier number mentioned",
  //     });
  //     setTimeout(() => {
  //       setMess({ state: false, content: "" });
  //     }, 2000);
  //   } else {
  //   }
  // };
  // const deleteData = async () => {
  //   try {
  //     await axios.delete(deleteURL);
  //     setMess({
  //       content: `${vInfo.supplier_number} deleted`,
  //     });
  //     setTimeout(() => {
  //       setMess({ content: "" });
  //     }, 2000);
  //     setVInfo({
  //       supplier_number: "",
  //       organization: "",
  //       supplier_name: "",
  //       type: "",
  //       created_date: "",
  //       inactive_date: "",
  //       classification: "",
  //       certificate_no: "",
  //       certificate_agency: "",
  //       certificate_expiration_date: "",
  //       certificate_registration_date: "",
  //       upload_certificate: "",
  //       status: "",

  //     });
  //   } catch (error) {
  //     setMess({
  //       state: true,
  //       content: `There is no Supplier number of ${vInfo.supplier_number} exist`,
  //     });
  //     setTimeout(() => {
  //       setMess({ state: false, content: "" });
  //     }, 2000);
  //   }
  // };

  // const handleDeleteClick = (e) => {
  //   e.preventDefault();
  //   if (vInfo.supplier_number === "") {
  //     setMess({
  //       state: true,
  //       content: "There is no Supplier number mentioned !",
  //     });
  //     setTimeout(() => {
  //       setMess({ state: false, content: "" });
  //     }, 2000);
  //   } else {
  //     deleteData();
  //   }
  // };

  const handleUpdateClick = async (e) => {
    e.preventDefault();
    if (vInfo.supplier_number === "") {
      setMess({
        state: true,
        content: "There is no Supplier number mentioned",
      });
      setTimeout(() => {
        setMess({ state: false, content: "" });
      }, 2000);
    } else {
      try {
        await axios.patch(patchURL, vInfo);
        setHide({ disabled: false });
      } catch (error) {
        setMess({
          state: true,
          content: `There is no Supplier number of ${vInfo.supplier_number} exist`,
        });
        setTimeout(() => {
          setMess({ state: false, content: "" });
        }, 2000);
      }
    }
  };

  const updateAndSaveData = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(patchURL, vInfo);
    } catch (error) { }
    setHide({ disabled: true });
    setHide({ save: false });
    window.location.reload();
  };

  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    setVInfo({
      ...vInfo,
      [name]: value,
    });
  }
  console.log(vInfo.status);
  return (
    <div>
      <>
        {mess.state && <p className="message1">{mess.content}</p>}

        {/* 
        {anew && (
          <VendorPortal_Create_New
            setaNew={setaNew}
            mess={mess}
            setMess={setMess}
          />
        )} */}

        <form className="vendor_form">
          {vInfo.status && (
            <h1 className="status">
              STATUS:
              {vInfo.status === "Approved" ? (
                <span style={{ color: "green" }}>APPROVED</span>
              ) : (
                <span style={{ color: "red" }}>PENDING</span>
              )}
            </h1>
          )}

          <div className="acc-vendor-page">
            <div className="supplier_number">
              <label for="">Supplier Number </label>
              <input
                type="text"
                placeholder="Enter supplier number"
                name="supplier_number"
                disabled="true"
                onChange={handleChange}
                value={vInfo.supplier_number}
              />
              {/* <button
                type="submit"
                className="supplier_no_btn"
                onClick={handleSearchClick}
              >
                Search
              </button> */}
            </div>
            <span></span>
            <div className="con">
              <label for="">Organization</label>
              <input
                type="text"
                // placeholder="Organization"
                name="organization"
                disabled={hide.disabled}
                value={vInfo.organization}
                onChange={handleChange}
              />
            </div>
            <div className="con">
              <label for="">Classification</label>
              <input
                type="text"
                // placeholder="Classification"
                name="classification"
                disabled={hide.disabled}
                // value={vInfo.classification ? vInfo.classification : "N/A"}
                value={
                  vInfo.classification === (null || "")
                    ? "N/A"
                    : vInfo.classification
                }
                onChange={handleChange}
              />
            </div>
            <div className="con">
              <label for="">Supplier Name</label>
              <input
                type="text"
                // placeholder="Supplier Name"
                name="supplier_name"
                disabled={hide.disabled}
                value={vInfo.supplier_name}
                onChange={handleChange}
              />
            </div>
            <div className="con">
              <label for="">Certificate No</label>
              <input
                type="text"
                // placeholder="Certificate No"
                name="certificate_no"
                disabled={hide.disabled}
                value={
                  vInfo.certificate_no === (null || "")
                    ? "N/A"
                    : vInfo.certificate_no
                }
                onChange={handleChange}
              />
            </div>
            <div className="con">
              <label for="">Type</label>
              <input
                type=""
                // placeholder="Type"
                name="type"
                disabled={hide.disabled}
                value={vInfo.type}
                onChange={handleChange}
              />
            </div>
            <div className="con">
              <label for="">Certificate Agency</label>
              <input
                type="text"
                // placeholder="Certificate Agency"
                name="certificate_agency"
                disabled={hide.disabled}
                value={
                  vInfo.certificate_agency === (null || "")
                    ? "N/A"
                    : vInfo.certificate_agency
                }
                onChange={handleChange}
              />
            </div>

            <div className="con">
              <label for="">Created Date</label>
              <input
                type="text"
                // placeholder="Created Date"
                name="created_date"
                disabled={hide.disabled}
                value={vInfo.created_date.slice(0, 10)}
                onChange={handleChange}
                onFocus={(e) => {
                  e.target.type = "date";
                }}
                onBlur={(e) => {
                  e.target.type = "text";
                }}
              />
            </div>
            <div className="con">
              <label for="">Certificate Expiration Date</label>
              <input
                type="text"
                // placeholder="Certificate Expiration Date"
                name="certificate_expiration_date"
                disabled={hide.disabled}
                value={
                  vInfo.certificate_expiration_date === (null || "")
                    ? "N/A"
                    : vInfo.certificate_expiration_date
                }
                onChange={handleChange}
                onFocus={(e) => {
                  e.target.type = "date";
                }}
                onBlur={(e) => {
                  e.target.type = "text";
                }}
              />
            </div>
            <div className="con">
              <label for="">Inactive Date</label>
              <input
                type="text"
                // placeholder="Inactive Date"
                name="inactive_date"
                disabled={hide.disabled}
                value={vInfo.inactive_date.slice(0, 10)}
                onChange={handleChange}
                onFocus={(e) => {
                  e.target.type = "date";
                }}
                onBlur={(e) => {
                  e.target.type = "text";
                }}
              />
            </div>

            <div className="con">
              <label for="">Certificate Registrastion Date</label>
              <input
                type="text"
                // placeholder="Certificate Registrastion Date"
                name="certificate_registration_date"
                disabled={hide.disabled}
                value={
                  vInfo.certificate_registration_date === (null || "")
                    ? "N/A"
                    : vInfo.certificate_registration_date
                }
                onChange={handleChange}
                onFocus={(e) => {
                  e.target.type = "date";
                }}
                onBlur={(e) => {
                  e.target.type = "text";
                }}
              />
            </div>


            <div className="con ">

              <label for="">Remarks</label>
              <TextareaAutosize
                type="text"
                className=" remarks"
                name="remarks"
                disabled={hide.disabled}
                value={vInfo.remarks}
                onChange={handleChange}
              />

            </div>
            <div className="con">
              <label for=""> MSME Certificate </label>
              {arr.img_2_data ? (
                <div className="certificate-config">
                  <a
                    href={`data:image/png;base64,${arr.img_1_data}`}
                    download={`${arr.img_1_name}.png`}
                  >
                    Download
                  </a>
                  <button className="preview"
                    type=""
                    onClick={(e) => {
                      e.preventDefault();
                      setImgShow(!imgShow);
                      setImg(arr.img_1_data);
                    }}
                  >
                    Preview
                  </button>
                </div>
              ) : (
                <label for="">N/A</label>
              )}

              {imgShow && (
                <div className="img-thumbnail">
                  <img
                    src={`data:image/png;base64,${img}`}
                    alt=""
                  />
                  <button onClick={(e) => {
                    e.preventDefault();
                    setImgShow(!imgShow);
                    setImg(arr.img_2_data);

                  }}>Close</button>
                </div>
              )}

              {/* //////////////////////////////////////////// */}
              <label for=""> GST Certificate </label>
              {arr.img_2_data ? (
                <div className="certificate-config">
                  <a
                    href={`data:image/png;base64,${arr.img_2_data}`}
                    download={`${arr.img_2_name}.png`}
                  >
                    Download
                  </a>
                  <button
                    type=""
                    onClick={(e) => {
                      e.preventDefault();
                      setImgShow(!imgShow);
                      setImg(arr.img_2_data);

                    }}
                  >
                    Preview
                  </button>

                </div>
              ) : (
                <label for="">N/A</label>
              )}
              <label for=""> PAN CARD</label>
              {arr.img_3_data ? (
                <div className="certificate-config">
                  <a
                    href={`data:image/png;base64,${arr.img_3_data}`}
                    download={`${arr.img_2_name}.png`}
                  >
                    Download
                  </a>
                  <button
                    type=""
                    onClick={(e) => {
                      e.preventDefault();
                      setImgShow(!imgShow);
                      setImg(arr.img_3_data);

                    }}
                  >
                    Preview
                  </button>

                </div>
              ) : (
                <label for="">N/A</label>
              )}
            </div>
            <div className="status-input">
              <label for="">Status</label>
              <div className="radio">
                <input
                  type="radio"
                  id="approved"
                  disabled={hide.disabled}
                  name="status"
                  value="Approved"
                  onChange={handleChange}
                />
                <label>Approved</label>
              </div>
              <div className="radio">
                <input
                  type="radio"
                  id="pending"
                  name="status"
                  disabled={hide.disabled}
                  value="Pending"
                  onChange={handleChange}
                />
                <label>Pending</label>
              </div>
            </div>
          </div>
          <div className="all-buttons">
            {/* <button
                type=""
                className="vendor_form_new"
                onClick={(e) => {
                  e.preventDefault();
                  setaNew(!anew);
                }}
              >
                New
              </button> */}
            {/* <button
                className="vendor_form_del"
                onClick={handleDeleteClick}
                type=""
              >
                Delete
              </button> */}
            {hide.save ? (
              <button
                onClick={handleUpdateClick}
                className="vendor_form_update"
                type=""
              >
                Update
              </button>
            ) : (
              <button
                type=""
                onClick={updateAndSaveData}
                className="vendor_form_update"
              >
                Save
              </button>
            )}
            <Link className="vendor_form_send_link" to="/acc">Go Back</Link>
            {
              <button type="" className="vendor_form_del">
                Cancel
              </button>
            }
          </div>
        </form>
      </>
    </div>
  );
}

export default VendorPortalAccVendorDetails;