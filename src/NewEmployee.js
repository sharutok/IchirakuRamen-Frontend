import React, { useState } from "react";
import axios from "axios";
import NewEmployeePer from "./NewEmployeePer";
function NewEmployee() {
  const urlPro = "http://127.0.0.1:8000/details/pro";

  let flag = 1;
  let x = 1;

  const postProData = async () => {
    await axios.post(urlPro, pro);
  };
  const [hide, setHide] = useState({
    pro: true,
    per: false,
  });
  const [mess, SetMess] = useState(false);
  const [pro, setPro] = useState({
    emp_id: "",
    emp_type: "",
    emp_email_id: "",
    designation: "",
    department: "",
    pf_acc_no: "",
    doj: "",
    pay_date: "",
    bank_info: "",
    location: "",
  });

  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setPro({ ...pro, [name]: value });
  }
  function handleClick(e) {
    e.preventDefault();
    Object.keys(pro).map((i) => {
      if (pro[i] === "") {
        SetMess(true);
        flag = 0;
      }

      x = x * flag;

      if (x === 1) {
        SetMess(false);
      }
    });
    if (x === 1) {
      postProData();

      setPro({
        emp_id: pro.emp_id,
        emp_type: "",
        emp_email_id: "",
        designation: "",
        department: "",
        pf_acc_no: "",
        doj: "",
        pay_date: "",
        bank_info: "",
        location: "",
      });
      hide.pro = false;
      hide.per = true;
    }
  }

  return (
    <div>
      {hide.pro && (
        <form action="">
          <h1>pro details</h1>
          {mess && <h4>All fields mandatory</h4>}
          <ul>
            <li>
              {" "}
              <input
                value={pro.emp_id}
                name="emp_id"
                type="number"
                onChange={handleChange}
                placeholder="Employee ID"
              />
            </li>
            <li>
              <div>
                <label>Employee Type</label>
                <div>
                  <input
                    type="radio"
                    id="fullTime"
                    name="emp_type"
                    value="Full Time"
                    onChange={handleChange}
                  />
                  <label>Full Time</label>

                  <input
                    type="radio"
                    id="partTime"
                    name="emp_type"
                    value="Part Time"
                    onChange={handleChange}
                  />
                  <label>Part Time</label>
                  <input
                    type="radio"
                    id="inter"
                    name="emp_type"
                    value="Intern"
                    onChange={handleChange}
                  />
                  <label for="female">Intern</label>
                </div>
              </div>
            </li>
            <li>
              {" "}
              <input
                value={pro.emp_email_id}
                name="emp_email_id"
                onChange={handleChange}
                type="email"
                placeholder="Email ID"
              />
            </li>
            <li>
              <select name="designation" onChange={handleChange}>
                <option value="" readonly="true" hidden="true" selected>
                  Designation
                </option>
                <option value="Restaurant Manager">Restaurant Manager</option>
                <option value="Room Service">Room Service</option>
                <option value="Kitchen Staff">Kitchen Staff</option>
                <option value="Head Chef">Head Chef</option>
                <option value="Front Desk Manager">Front Desk Manager</option>
                <option value="Housekeeping Manager">
                  Housekeeping Manager
                </option>
              </select>
            </li>
            <li>
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
            </li>
            <li>
              {" "}
              <input
                type="number"
                onChange={handleChange}
                value={pro.pf_acc_no}
                name="pf_acc_no"
                placeholder="PF No"
              />
            </li>
            <li>
              <input
                type="text"
                placeholder="DOJ"
                value={pro.doj}
                onChange={handleChange}
                name="doj"
                onFocus={(e) => {
                  e.target.type = "date";
                }}
                onBlur={(e) => {
                  e.target.type = "text";
                }}
              />
            </li>
            <li>
              {" "}
              <input
                onChange={handleChange}
                type="text"
                placeholder="Pay Date"
                value={pro.pay_date}
                name="pay_date"
                onFocus={(e) => {
                  e.target.type = "date";
                }}
                onBlur={(e) => {
                  e.target.type = "text";
                }}
              />
            </li>
            <li>
              <input
                onChange={handleChange}
                type="text"
                placeholder="Bank Info"
                value={pro.bank_info}
                name="bank_info"
              />
            </li>
            <li>
              <select name="location" onChange={handleChange}>
                <option value="" readonly="true" hidden="true" selected>
                  Location
                </option>
                <option value="Banglore">Banglore</option>
                <option value="Kerala">Kerala</option>
                <option value="Goa">Goa</option>
                <option value="Pune "> Pune</option>
                <option value="Mumbai">Mumbai</option>
              </select>
            </li>
          </ul>

          <button onClick={handleClick} type="submit">
            Next
          </button>
        </form>
      )}
      {hide.per && <NewEmployeePer empIdPro={pro.emp_id} />}
    </div>
  );
}

export default NewEmployee;
