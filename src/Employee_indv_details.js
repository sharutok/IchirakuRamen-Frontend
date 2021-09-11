import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Employee_indv_details() {
  const { id } = useParams();
  const [hide, setHide] = useState({
    empType: true,
    display: true,
    update: true,
  });

  const [time, setTime] = useState([]);
  const [salary, setSalary] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [obj, setObj] = useState({
    emp_id: id,
    emp_type: "",
    emp_email_id: "",
    designation: "",
    department: "",
    pf_acc_no: "",
    doj: "",
    pay_date: "",
    bank_info: "",
    location: "",
    //PERSONEL
    first_name: "",
    last_name: "",
    gender: "",
    fathers_name: "",
    dob: "",
    state: "",
    address: "",
    mobile_no: "",
    marital_status: "",
  });

  //  GET TIME DATA
  const getDataOfTime = async () => {
    const link = `http://localhost:8000/sim/timeSheet/${id}`;
    const response = await fetch(link);
    const data = await response.json();
    setTime(data.TimeSheet);
  };

  //    GET SALARY DATA
  const getDataOfSalary = async () => {
    const link = `http://localhost:8000/ss/calc/${id}`;
    const response = await fetch(link);
    const data = await response.json();
    setSalary(data.salarySheet);
  };

  //    GET EMPLOYEE PER & PRO DATA
  const url = `http://localhost:8000/details/${id}`;
  const getData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setDisplayData(data.data.details);
  };

  //PATCH SALARY
  const patchData = async () => {
    const link = `http://localhost:8000/ss/calc/${id}`;
    axios.patch(link);
  };
  useEffect(() => {
    getData();
    getDataOfTime();
    getDataOfSalary();
  }, []);

  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setObj({ ...obj, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setHide({
      display: false,
      update: false,
    });
  }
  function handleValue(proDetails, perDetails) {
    setObj({
      emp_type: "" || proDetails.emp_type,
      emp_email_id: "" || proDetails.emp_email_id,
      designation: "" || proDetails.designation,
      department: "" || proDetails.department,
      pf_acc_no: "" || proDetails.pf_acc_no,
      doj: "" || proDetails.doj,
      pay_date: "" || proDetails.pay_date,
      bank_info: "" || proDetails.bank_info,
      location: "" || proDetails.location,
      address: "" || proDetails.address,

      first_name: "" || perDetails.first_name,
      last_name: "" || perDetails.last_name,
      gender: "" || perDetails.gender,
      fathers_name: "" || perDetails.fathers_name,
      dob: "" || perDetails.dob,
      state: "" || perDetails.state,
      address: "" || perDetails.address,
      mobile_no: "" || perDetails.mobile_no,
      marital_status: "" || perDetails.marital_status,
    });
  }
  const sendData = async () => {
    await axios.patch(`http://localhost:8000/details/${id}`, obj);
  };
  //handles update
  function handleData(e) {
    e.preventDefault();
    sendData();
    patchData();
    window.location.reload();
  }
  return (
    <div>
      <form>
        {displayData.map((i) => {
          const {
            _id,
            emp_type,
            emp_email_id,
            designation,
            department,
            pf_acc_no,
            doj,
            pay_date,
            bank_info,
            location,
          } = i.proDetails;

          const {
            first_name,
            last_name,
            gender,
            fathers_name,
            dob,
            state,
            address,
            mobile_no,
            marital_status,
          } = i.perDetails;

          return (
            <div key={_id}>
              <h1>Professional Details</h1>
              <ul>
                <li>
                  <label>Employee ID</label>
                  <input
                    value={obj.emp_id}
                    name="emp_id"
                    type="number"
                    onChange={handleChange}
                    placeholder="Employee ID"
                    disabled
                  />
                </li>
                <li>
                  <div>
                    {hide.empType ? (
                      <label>
                        Employee Type:{" "}
                        <input disabled={hide.display} value={emp_type}></input>
                      </label>
                    ) : (
                      <div>
                        <label>Employee Type</label>
                        <br />
                        <input
                          type="radio"
                          name="emp_type"
                          value="Full Time"
                          onChange={handleChange}
                        />
                        <label>Full Time</label>
                        <input
                          type="radio"
                          name="emp_type"
                          value="Part Time"
                          onChange={handleChange}
                        />
                        <label>Part Time</label>
                        <input
                          type="radio"
                          name="emp_type"
                          value="Inter"
                          onChange={handleChange}
                        />
                        <label>Inter</label>
                      </div>
                    )}
                  </div>
                </li>
                <li>
                  <label>Employee Email-ID</label>
                  <input
                    value={obj.emp_email_id || emp_email_id}
                    name="emp_email_id"
                    onChange={handleChange}
                    type="email"
                    placeholder={emp_email_id}
                    disabled={hide.display}
                  />
                </li>
                {hide.display ? (
                  <li>
                    <label>Designation</label>
                    <input
                      type="text"
                      value={obj.designation || designation}
                      name="designation"
                      onChange={handleChange}
                      placeholder={designation}
                      disabled={hide.display}
                    />
                  </li>
                ) : (
                  <li>
                    <select name="designation" onChange={handleChange}>
                      <option readonly="true" hidden="true" selected>
                        Designation
                      </option>
                      <option value="Restaurant Manager">
                        Restaurant Manager
                      </option>
                      <option value="Room Service">Room Service</option>
                      <option value="Kitchen Staff">Kitchen Staff</option>
                      <option value="Head Chef">Head Chef</option>
                      <option value="Front Desk Manager">
                        Front Desk Manager
                      </option>
                      <option value="Housekeeping Manager">
                        Housekeeping Manager
                      </option>
                    </select>
                  </li>
                )}

                <>
                  {hide.display ? (
                    <li>
                      <label>Department</label>
                      <input
                        onChange={handleChange}
                        type="text"
                        value={obj.department || department}
                        name="department"
                        placeholder={department}
                        disabled={hide.display}
                      />
                    </li>
                  ) : (
                    <select name="department" onChange={handleChange}>
                      <option value="" readonly="true" hidden="true" selected>
                        Department
                      </option>
                      <option value="Front Office Department">
                        Front Office Department
                      </option>
                      <option value="Housekeeping Department">
                        Housekeeping Department
                      </option>
                      <option value="Food and Beverage Service Department">
                        Food and Beverage Service Department
                      </option>
                      <option value="Kitchen or Food Production Department">
                        Kitchen or Food Production Department
                      </option>
                    </select>
                  )}
                </>

                <li>
                  <label>PF Acc NO</label>
                  <input
                    type="number"
                    onChange={handleChange}
                    value={obj.pf_acc_no || pf_acc_no}
                    name="pf_acc_no"
                    placeholder={pf_acc_no}
                    disabled={hide.display}
                  />
                </li>

                <li>
                  <label>Date of joining</label>
                  <input
                    type="date"
                    placeholder="DOJ"
                    value={obj.doj.substring(0, 10) || doj.substring(0, 10)}
                    onChange={handleChange}
                    name="doj"
                    disabled={hide.display}
                  />
                </li>
                <li>
                  <label>Paydate</label>
                  <input
                    onChange={handleChange}
                    type="date"
                    placeholder="Pay Date"
                    value={
                      obj.pay_date.substring(0, 10) || pay_date.substring(0, 10)
                    }
                    name="pay_date"
                    disabled={hide.display}
                  />
                </li>
                <li>
                  <label>Bank info</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={bank_info}
                    value={obj.bank_info || bank_info}
                    name="bank_info"
                    disabled={hide.display}
                  />
                </li>

                <li>
                  <label>Address</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={bank_info}
                    value={obj.address || address}
                    name="address"
                    disabled={hide.display}
                  />
                </li>
                <>
                  {hide.display ? (
                    <li>
                      <label>Location</label>
                      <input
                        onChange={handleChange}
                        type="text"
                        placeholder={location}
                        value={obj.location || location}
                        name="location"
                        disabled={hide.display}
                      />
                    </li>
                  ) : (
                    <select name="location" onChange={handleChange}>
                      <option value="" readonly="true" hidden="true" selected>
                        Location
                      </option>
                      <option value="Banglore">Banglore</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Goa">Goa</option>
                      <option value="Pune ">Pune </option>
                      <option value="Mumbai">Mumbai</option>
                    </select>
                  )}
                </>
              </ul>
              <h1>Personal Details</h1>
              <ul>
                <li>
                  <label>First Name</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={location}
                    value={obj.first_name || first_name}
                    name="first_name"
                    disabled={hide.display}
                  />
                </li>
                <li>
                  <label>Last Name</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={location}
                    value={obj.last_name || last_name}
                    name="last_name"
                    disabled={hide.display}
                  />
                </li>
                <li>
                  <label>DOB</label>
                  <input
                    type="date"
                    value={obj.dob.substring(0, 10) || dob.substring(0, 10)}
                    onChange={handleChange}
                    name="doj"
                    disabled={hide.display}
                  />
                </li>
                <li>
                  <div>
                    {hide.empType ? (
                      <label>
                        Gender:{" "}
                        <input disabled={hide.display} value={gender}></input>
                      </label>
                    ) : (
                      <div>
                        <div>
                          <label>Gender</label>
                          <br />
                          <input
                            type="radio"
                            name="gender"
                            value="Male"
                            onChange={handleChange}
                          />
                          <label>Male</label>
                          <input
                            type="radio"
                            name="gender"
                            value="Female"
                            onChange={handleChange}
                          />
                          <label>Female</label>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
                <li>
                  <label>Father's Name</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={location}
                    value={obj.fathers_name || fathers_name}
                    name="fathers_name"
                    disabled={hide.display}
                  />
                </li>
                {hide.display ? (
                  <li>
                    <label>State</label>
                    <input
                      onChange={handleChange}
                      type="text"
                      placeholder={location}
                      value={obj.state || state}
                      name="state"
                      disabled={hide.display}
                    />
                  </li>
                ) : (
                  <li>
                    <select name="state" onChange={handleChange}>
                      <option value="" readonly="true" hidden="true" selected>
                        State
                      </option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Andaman and Nicobar Islands">
                        Andaman and Nicobar Islands
                      </option>
                      <option value="Arunachal Pradesh">
                        Arunachal Pradesh
                      </option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Dadar and Nagar Haveli">
                        Dadar and Nagar Haveli
                      </option>
                      <option value="Daman and Diu">Daman and Diu</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Lakshadweep">Lakshadweep</option>
                      <option value="Puducherry">Puducherry</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jammu and Kashmir">
                        Jammu and Kashmir
                      </option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                    </select>
                  </li>
                )}
                <li>
                  <label>Mobile No</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={location}
                    value={obj.mobile_no || mobile_no}
                    name="mobile_no"
                    disabled={hide.display}
                  />
                </li>
                <li>
                  <div>
                    {hide.empType ? (
                      <label>
                        Marital Status:
                        <input
                          disabled={hide.display}
                          value={marital_status}
                        ></input>
                      </label>
                    ) : (
                      <div>
                        <label>Marital Status</label>
                        <br />
                        <input
                          type="radio"
                          name="marital_status"
                          value="married"
                          onChange={handleChange}
                        />
                        <label>Married</label>
                        <input
                          type="radio"
                          name="marital_status"
                          value="single"
                          onChange={handleChange}
                        />
                        <label>Single</label>
                      </div>
                    )}
                  </div>
                </li>
              </ul>
              {hide.update ? (
                <button
                  onClick={
                    (handleSubmit,
                    (e) => {
                      e.preventDefault();
                      handleValue(i.proDetails, i.perDetails);
                      setHide({
                        empType: false,
                        display: false,
                        update: false,
                      });
                    })
                  }
                  type="submit"
                >
                  Edit
                </button>
              ) : (
                <button onClick={handleData}>update</button>
              )}
            </div>
          );
        })}
      </form>
      <form>
        <h1>Time Profile</h1>
        {time.map((i) => {
          const { emp_id, timedate, totalHr, days } = i;

          return (
            <div key={emp_id}>
              <ul>
                <li>
                  <label>Month</label>
                  <label htmlFor="">:{timedate.month || "N/A"} </label>
                </li>
                <li>
                  <label>Total Working Hours</label>
                  <label htmlFor="">:{totalHr || "N/A"}</label>
                </li>
                <li>
                  <label>Total Working Days:{days || "N/A"}</label>
                </li>
              </ul>
            </div>
          );
        })}
      </form>
      <form>
        {salary.map((i) => {
          const {
            DA,
            HRA,
            MA,
            PF,
            LIC,
            PTax,
            BasicSalary,
            TotalAllowances,
            TotalDeduction,
            NetSalary,
            emp_id,
            designation,
          } = i;

          return (
            <div key={emp_id}>
              <h1>Salary Profile</h1>
              <label>{designation}</label>
              <ul>
                <li>
                  <label>DA</label>
                  <label>{DA}%</label>
                </li>
                <li>
                  <label>HRA</label>
                  <label>{HRA}%</label>
                </li>
                <li>
                  <label>MA</label>
                  <label>{MA}%</label>
                </li>
                <li>
                  <label>PF</label>
                  <label>{PF}%</label>
                </li>
                <li>
                  <label>LIC</label>
                  <label>{LIC}%</label>
                </li>
                <li>
                  <label>PTax</label>
                  <label>{PTax}%</label>
                </li>
                <li>
                  <label>Basic salary</label>
                  <label>{BasicSalary}$</label>
                </li>
                <li>
                  <label>Total Deduction</label>
                  <label>{TotalDeduction}$</label>
                </li>

                <li>
                  <label htmlFor="">Total Allowances</label>
                  <label>{TotalAllowances}$</label>
                </li>

                <li>
                  <label htmlFor="">Net Salary</label>
                  <label>{NetSalary}$</label>
                </li>
              </ul>
            </div>
          );
        })}
      </form>
    </div>
  );
}

export default Employee_indv_details;
