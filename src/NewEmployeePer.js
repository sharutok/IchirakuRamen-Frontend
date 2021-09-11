import React, { useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

function NewEmployeePer(empid) {
  const urlPer = "http://127.0.0.1:8000/details/per";
  let flag = 1;
  let x = 1;
  const history = useHistory();
  const location = useLocation();

  const [mess, SetMess] = useState(false);
  const [per, setPer] = useState({
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

  const postPerData = async () => {
    await axios.post(urlPer, per);
  };
  const calculateAndPostData = async (id) => {
    console.log(id);
    const link = `http://127.0.0.1:8000//ss/calc/${id}`;
    await axios.post(link);
  };

  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setPer({ ...per, [name]: value });
  }
  function handleClick(e) {
    e.preventDefault();
    Object.keys(per).map((i) => {
      if (per[i] === "") {
        SetMess(true);
        flag = 0;
      }
      x = x * flag;
      if (x === 1) {
        SetMess(false);
      }
    });
    if (x === 1) {
      postPerData();
      calculateAndPostData(empid.empIdPro);
      setPer({
        first_name: "",
        last_name: "",
        gender: "",
        fathers_name: "",
        state: "",
        address: "",
        mobile_no: "",
        marital_status: "",
      });
      history.push({
        pathname: "/AllEmp",
        state: { data: { username: location.state.data } },
      });
    }
  }
  return (
    <div>
      {mess && <h4>All fields mandatory</h4>}
      <h1> per details</h1>
      <form>
        <ul>
          <li>
            <label htmlFor="">
              Employee ID for <span>{empid.empIdPro} </span>
            </label>
          </li>
          <li>
            <input
              name="first_name"
              value={per.first_name}
              type="text"
              placeholder="First name"
              onChange={handleChange}
            />
          </li>
          <li>
            <input
              name="last_name"
              value={per.last_name}
              type="text"
              placeholder="Last name"
              onChange={handleChange}
            />
          </li>
          <li>
            <div>
              <label>Gender</label>
              <div>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                />
                <label>Male</label>

                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                />
                <label>Female</label>
              </div>
            </div>
          </li>
          <li>
            <input
              name="fathers_name"
              value={per.fathers_name}
              type="text"
              placeholder="Father's name"
              onChange={handleChange}
            />
          </li>
          <li>
            <input
              type="type"
              placeholder="DOB"
              onChange={handleChange}
              name="dob"
              value={per.dob}
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
              type="text"
              placeholder="Address"
              onChange={handleChange}
              name="address"
              value={per.address}
            />
          </li>
          <li>
            <select name="state" onChange={handleChange}>
              <option value="" readonly="true" hidden="true" selected>
                State
              </option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Andaman and Nicobar Islands">
                Andaman and Nicobar Islands
              </option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
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
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
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
          <li>
            <input
              type="tel"
              pattern="[0-9]{10}"
              placeholder="Mobile no"
              onChange={handleChange}
              name="mobile_no"
              value={per.mobile_no}
            />
          </li>
          <li>
            <div>
              <label>Marital status</label>
              <div>
                <input
                  type="radio"
                  id="married"
                  name="marital_status"
                  value="married"
                  onChange={handleChange}
                />
                <label for="married">Married</label>

                <input
                  type="radio"
                  id="single"
                  name="marital_status"
                  value="single"
                  onChange={handleChange}
                />
                <label for="single">Single</label>
              </div>
            </div>
          </li>
        </ul>
        <button type="submit" onClick={handleClick}>
          Next
        </button>
      </form>
    </div>
  );
}

export default NewEmployeePer;
