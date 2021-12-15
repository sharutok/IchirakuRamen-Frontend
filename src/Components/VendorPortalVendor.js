import React, { useEffect } from "react";
import { useState } from "react";
import queryString from 'query-string'
import bcrypt from 'bcryptjs'
import axios from "axios";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useLocation } from 'react-router-dom'
import { GrClose } from 'react-icons/gr'
import Loading from "./Loading";
import { BsFillFileEarmarkSpreadsheetFill } from "react-icons/bs"
import { AiOutlineDownload } from "react-icons/ai"
import Tooltip from '@mui/material/Tooltip';
import "../CSS/VendorPortalVendor.css";
const stylesForReactIcons = {
  margin: "0 0.5rem",
  color: "grey",
  padding: "0.2rem",
  backgroundColor: "white",
  borderRadius: "5px",
  boxShadow: "2px 2px 10px lightgrey"
}
function VendorPortal_User() {
  const { search } = useLocation()
  const { v, p } = queryString.parse(search)
  let key = v
  let key2 = decodeURI(p)
  const [arrImg, setArrImg] = useState([])
  const [img, setImg] = useState("");
  const [imgShow, setImgShow] = useState(false);
  // const [file, setFile] = useState("");
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
    // classification: "",
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
  const [mess, setMess] = useState({
    state: false,
    content: "",
  });

  const getURL = `http://localhost:8080/vendor/detail/${vInfo.supplier_number}/${key2}`;
  // const deleteURL = `http://localhost:8080/vendor/${vInfo.supplier_number}`;
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
          // classification: x.classification,
          certificate_no: x.certificate_no,
          certificate_agency: x.certificate_agency,
          certificate_expiration_date: x.certificate_expiration_date,
          certificate_registration_date: x.certificate_registration_date,
          upload_certificate: x.upload_certificate,
          status: x.status,
          remarks: x.remarks
        });
      });
      // console.log(vInfo);
    } else {
      setVInfo({
        supplier_number: vInfo.supplier_number,
        organization: "",
        supplier_name: "",
        type: "",
        created_date: "",
        inactive_date: "",
        // classification: "",
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
    // console.log(vInfo.supplier_number, key, checkSupplierNumber);

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
    console.log('handleUpdateClick')
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
        // await axios.patch(patchURL, vInfo);
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
    console.log('updateAndSaveData')
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
  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 2000)
  }, [])


  return (
    <div>
      {loading ? <>
        {mess.state && <p className="message1">{mess.content}</p>}

        <div className="headings">
          <h1>Vendor Detail Form</h1>
          {vInfo.status && (
            <div>
              <span>
                <h1 className="heading-status" >
                  STATUS:
                  {vInfo.status === 1 ? (
                    <span style={{ color: "green" }}> APPROVED</span>
                  ) : (
                    <span style={{ color: "red" }}> PENDING</span>
                  )}
                </h1>
              </span>
            </div>
          )}
        </div>
        <form className="vendor_forms">
          <div className="containerz">
            <div>
              <input
                type="text"
                autoComplete="off"
                placeholder="Supplier number"
                className="supplier_no_ips"
                name="supplier_number"
                onChange={handleChange}
                value={vInfo.supplier_number}
              />
              <button
                type="submit"
                className="supplier_no_btns"
                onClick={handleSearchClick}
              >
                Check
              </button>
            </div>
            <span></span>
            <span></span>
            <div className="conn">
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
            {/* <div className="conn">
              <label for="">Classification</label>
              <input
                type="text"
                // placeholder="Classification"
                name="classification"certificate
                disabled={hide.disabled}
                // value={vInfo.classification ? vInfo.classification : "N/A"}
                value={
                  vInfo.classification === null ? "N/A" : vInfo.classification
                }
                onChange={handleChange}
              />
            </div> */}
            <div className="conn">
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
            <div className="conn">
              <label for="">GST Certificate</label>
              <div className="img-upload-preview">
                <input
                  type="file"
                  name="upload_certificate_1"
                  disabled={hide.disabled}
                  onChange={handleChange}
                />
                {arrImg.img_1_data ? (
                  <div className="certificate-config img-upload-preview">
                    <Tooltip placement="top" title="Download " disableInteractive>
                      <a
                        href={`data:image/png;base64,${arrImg.img_1_data}`}
                        download={`${arrImg.img_1_name}.png`}
                      >
                        <AiOutlineDownload size={25} style={stylesForReactIcons} />
                        {/* Download */}
                      </a>
                    </Tooltip>
                    <Tooltip placement="top" title="Preview" disableInteractive>
                      <div>
                        <BsFillFileEarmarkSpreadsheetFill
                          size={25}
                          style={stylesForReactIcons}
                          className="preview"
                          onClick={(e) => {
                            e.preventDefault();
                            setImgShow(!imgShow);
                            setImg(arrImg.img_1_data);
                          }}
                        />
                      </div>
                    </Tooltip>

                    {/* <button
                      className="preview"
                      type=""
                      onClick={(e) => {
                        e.preventDefault();
                        setImgShow(!imgShow);
                        setImg(arrImg.img_1_data);
                      }}
                    >
                      Preview
                    </button> */}
                  </div>
                ) : (
                  <label for="">N/A</label>
                )}
              </div>
            </div>
            <div className="conn">
              <label for="">MSME Number</label>
              <input
                type="text"
                // placeholder="Certificate No"
                name="certificate_no"
                disabled={hide.disabled}
                value={
                  vInfo.certificate_no}
                onChange={handleChange}
              />
            </div>
            <div className="conn">
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
            <div className="conn">
              <label for="">MSME Certificate</label>
              <div className="img-upload-preview">
                <input
                  type="file"
                  name="upload_certificate_2"
                  disabled={hide.disabled}
                  onChange={handleChange}
                />

                {arrImg.img_2_data ? (
                  <div className="certificate-config img-upload-preview">
                    <Tooltip placement="top" title="Download " disableInteractive>
                      <a
                        href={`data:image/png;base64,${arrImg.img_2_data}`}
                        download={`${arrImg.img_2_name}.png`}
                      >
                        <AiOutlineDownload size={25} style={stylesForReactIcons} />
                        {/* Download */}
                      </a>
                    </Tooltip>
                    <Tooltip placement="top" title="Preview" disableInteractive>
                      <div>
                        <BsFillFileEarmarkSpreadsheetFill
                          size={25}
                          style={stylesForReactIcons}
                          className="preview"
                          type=""
                          onClick={(e) => {
                            e.preventDefault();
                            setImgShow(!imgShow);
                            setImg(arrImg.img_2_data);
                          }}
                        />
                      </div>
                    </Tooltip>
                    {/* <button
                      className="preview"
                      type=""
                      onClick={(e) => {
                        e.preventDefault();
                        setImgShow(!imgShow);
                        setImg(arrImg.img_2_data);
                      }}
                    >
                      Preview
                    </button> */}
                  </div>
                ) : (
                  <label for="">N/A</label>
                )}

              </div>
            </div>
            <div className="conn">
              <label for="">Certificate Agency</label>
              <input
                type="text"
                // placeholder="Certificate Agency"
                name="certificate_agency"
                disabled={hide.disabled}
                value={
                  vInfo.certificate_agency
                }
                onChange={handleChange}
              />
            </div>
            <div className="conn">
              <label for="">Created Date</label>
              <input
                type="text"
                // placeholder="Created Date"
                name="created_date"
                disabled={hide.disabled}
                value={vInfo.created_date}
                onChange={handleChange}
                onFocus={(e) => {
                  e.target.type = "date";
                }}
                onBlur={(e) => {
                  e.target.type = "text";
                }}
              />
            </div>
            <div className="conn">
              <label for="">PAN CARD</label>
              <div className="img-upload-preview">
                <input
                  type="file"
                  name="upload_certificate_3"
                  disabled={hide.disabled}
                  onChange={handleChange}
                />
                {arrImg.img_3_data ? (
                  <div className="certificate-config img-upload-preview">
                    <Tooltip placement="top" title="Download " disableInteractive>
                      <a
                        href={`data:image/png;base64,${arrImg.img_3_data}`}
                        download={`${arrImg.img_3_name}.png`}
                      >
                        <AiOutlineDownload size={25} style={stylesForReactIcons} />
                        {/* Download */}
                      </a>
                    </Tooltip>
                    <Tooltip placement="top" title="Preview" disableInteractive>
                      <div>
                        <BsFillFileEarmarkSpreadsheetFill
                          size={25}
                          style={stylesForReactIcons}
                          className="preview"
                          type=""
                          onClick={(e) => {
                            e.preventDefault();
                            setImgShow(!imgShow);
                            setImg(arrImg.img_3_data);
                          }}
                        />
                      </div>
                    </Tooltip>
                  </div>
                ) : (
                  <label for="">N/A</label>
                )}
              </div>
            </div>
            <div className="conn">
              <label for="">Certificate Expiration Date</label>
              <input
                type="text"
                // placeholder="Certificate Expiration Date"
                name="certificate_expiration_date"
                disabled={hide.disabled}
                onFocus={(e) => {
                  e.target.type = "date";
                }}
                onBlur={(e) => {
                  e.target.type = "text";
                }}
                value={
                  vInfo.certificate_expiration_date
                }
                onChange={handleChange}
              />
            </div>
            <div className="conn">
              <label for="">Certificate Registrastion Date</label>
              <input
                type="text"
                // placeholder="Certificate Registrastion Date"
                name="certificate_registration_date"
                disabled={hide.disabled}
                onFocus={(e) => {
                  e.target.type = "date";
                }}
                onBlur={(e) => {
                  e.target.type = "text";
                }}
                value={
                  vInfo.certificate_registration_date
                }
                onChange={handleChange}
              />
            </div>
            {/* <span></span> */}

            <div className="conn ">
              <label for="">Remarks</label>
              <TextareaAutosize
                type="text"
                className=" remark"
                name="remarks"
                disabled={hide.disabled}
                value={vInfo.remarks}
                onChange={handleChange}
              />
            </div>
            {imgShow && (
              <div className="img-thumbnails">
                <img
                  src={`data:image/png;base64,${img}`}
                  alt=""
                />
                <button onClick={(e) => {
                  e.preventDefault();
                  setImgShow(!imgShow);
                  setImg(arr.img_2_data);

                }}>
                  {/* Close */}
                  <GrClose size="20" />
                </button>
              </div>
            )}
          </div>
          <div className="button-collection">
            {hide.save ? (
              <button
                onClick={handleUpdateClick}
                className="vendor_form_updates"
                type=""
              >
                Update
              </button>
            ) : (
              <button
                onClick={updateAndSaveData}
                className="vendor_form_updates"
              >
                Save
              </button>
            )}

            {
              <button onClick={(e) => {
                e.preventDefault()
                window.location.reload()
              }} className="vendor_form_dels">
                Cancel
              </button>
            }
          </div>
        </form>
      </> : <Loading />}
    </div>
  );
}

export default VendorPortal_User;
