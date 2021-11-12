import React from "react";
import { useState } from "react";
import queryString from 'query-string'
import bcrypt from 'bcryptjs'
import axios from "axios";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useLocation } from 'react-router-dom'
import "../CSS/VendorPortalVendor.css";


function VendorPortal_User() {
  const { search } = useLocation()
  const { v } = queryString.parse(search)
  let key = v
  const [arrImg, setArrImg] = useState([])
  const [img, setImg] = useState("");
  const [imgShow, setImgShow] = useState(false);
  const [file, setFile] = useState("");
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
    remarks: "",
    status: "",
  });
  const [hide, setHide] = useState({
    disabled: true,
    save: true,
  });
  // const [anew, setaNew] = useState(false);
  const [mess, setMess] = useState({
    state: false,
    content: "",
  });

  const getURL = `http://localhost:8080/vendor/${vInfo.supplier_number}`;
  const deleteURL = `http://localhost:8080/vendor/${vInfo.supplier_number}`;
  const patchURL = `http://localhost:8080/vendor/${vInfo.supplier_number}`;
  const uploadImag = `http://localhost:8080/file-upload/img/${vInfo.supplier_number}`;
  const getImg = `http://localhost:8080/file-upload/img/${vInfo.supplier_number}`



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
      console.log(vInfo);
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
    const resImg = await fetch(getImg)
    const dataImg = await resImg.json()

    setArrImg(dataImg)
  };


  const handleSearchClick = (e) => {
    e.preventDefault();

    let checkSupplierNumber = bcrypt.compareSync(vInfo.supplier_number, key)
    console.log(checkSupplierNumber);

    if (vInfo.supplier_number === "") {
      setMess({
        state: true,
        content: "There is no Supplier number mentioned",
      });
      setTimeout(() => {
        setMess({ state: false, content: "" });
      }, 2000);

    }
    else {
      if (checkSupplierNumber) {
        getData();
      } else {
        setMess({
          state: true,
          content: "Invalid Supplier number!! ",
        });
        setTimeout(() => {
          setMess({ state: false, content: "" });
        }, 2000);
      }
    }
  };

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
      const formData = new FormData();
      console.log({ formData });
      for (let i = 0; i <= arr.length; i++) {
        formData.append(`image_${i}`, arr[i]);
      }
      console.log(arr.length);
      if (arr.length === 3) {
        console.log("sent");
        await axios.post(uploadImag, formData);

      }


    } catch (error) {
      console.log("not updated");
    }
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
    var files = e.target.files || (e.dataTransfer && e.dataTransfer.files);
    if (files) {
      arr.push(e.target.files[0]);
    }
  }

  return (
    <div>
      <>
        {mess.state && <p className="message1">{mess.content}</p>}
        <h1 className="heading">MSME - Vendor Detail Form</h1>
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
              Status-
              {vInfo.status === "Approved" ? (
                <span style={{ color: "green" }}>Approved</span>
              ) : (
                <span style={{ color: "red" }}>Pending</span>
              )}
            </h1>
          )}
          <div className="container">
            <div>
              <input
                type="text"
                autoComplete="off"
                placeholder="Supplier number"
                className="supplier_no_ip"
                name="supplier_number"
                onChange={handleChange}
                value={vInfo.supplier_number}
              />
              <button
                type="submit"
                className="supplier_no_btn"
                onClick={handleSearchClick}
              >
                Check
              </button>
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
                  vInfo.classification === null ? "N/A" : vInfo.classification
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
                  vInfo.certificate_no === null ? "N/A" : vInfo.certificate_no
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
                  vInfo.certificate_agency === null
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
                  vInfo.certificate_expiration_date === null
                    ? "N/A"
                    : vInfo.certificate_expiration_date
                }
                onChange={handleChange}
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
                  vInfo.certificate_registration_date === null
                    ? "N/A"
                    : vInfo.certificate_registration_date
                }
                onChange={handleChange}
              />
            </div>

            <div className="con">
              <label for="">GST Certificate</label>
              <input
                type="file"
                name="upload_certificate_1"
                disabled={hide.disabled}
                onChange={handleChange}
              />
              <label for="">MSME Certificate</label>
              <input
                type="file"
                name="upload_certificate_2"
                disabled={hide.disabled}
                onChange={handleChange}
              />
              <label for="">PAN CARD</label>
              <input
                type="file"
                name="upload_certificate_3"
                disabled={hide.disabled}
                onChange={handleChange}
              />
            </div>
            <div className="con">

              <label for="">GST Certificate</label>
              {arrImg.img_1_data ? (
                <div className="certificate-config">
                  <a
                    href={`data:image/png;base64,${arrImg.img_1_data}`}
                    download={`${arrImg.img_1_name}.png`}
                  >
                    Download
                  </a>
                  <button
                    className="preview"
                    type=""
                    onClick={(e) => {
                      e.preventDefault();
                      setImgShow(!imgShow);
                      setImg(arrImg.img_1_data);
                    }}
                  >
                    Preview
                  </button>
                </div>
              ) : (
                <label for="">N/A</label>
              )}

              {imgShow && (
                <img
                  className="img-thumbnails"
                  src={`data:image/png;base64,${img}`}
                  alt=""
                />
              )}
              <label for="">MSMECertificate </label>
              {arrImg.img_2_data ? (
                <div className="certificate-config">
                  <a
                    href={`data:image/png;base64,${arrImg.img_2_data}`}
                    download={`${arrImg.img_2_name}.png`}
                  >
                    Download
                  </a>
                  <button
                    className="preview"
                    type=""
                    onClick={(e) => {
                      e.preventDefault();
                      setImgShow(!imgShow);
                      setImg(arrImg.img_2_data);
                    }}
                  >
                    Preview
                  </button>
                </div>
              ) : (
                <label for="">N/A</label>
              )}
              <label for=""> PAN CARD</label>
              {arrImg.img_3_data ? (
                <div className="certificate-config">
                  <a
                    href={`data:image/png;base64,${arrImg.img_3_data}`}
                    download={`${arrImg.img_3_name}.png`}
                  >
                    Download
                  </a>
                  <button
                    className="preview"
                    type=""
                    onClick={(e) => {
                      e.preventDefault();
                      setImgShow(!imgShow);
                      setImg(arrImg.img_3_data);
                    }}
                  >
                    Preview
                  </button>
                </div>
              ) : (
                <label for="">N/A</label>
              )}

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
            <div>

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

              {
                <button type="" className="vendor_form_del">
                  Cancel
                </button>
              }
            </div>
          </div>
        </form>
      </>
    </div>
  );
}

export default VendorPortal_User;
