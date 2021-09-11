import React, { useState } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";
function Resetpassword() {
  const history = useHistory();

  const sendAccessCodeURL = "http://127.0.0.1:8000/passwordReset";
  const updatePassword = "http://127.0.0.1:8000/updatePassword";
  const [hide, setHide] = useState({
    unique: false,
    password: false,
    disableEmail: false,
    msgAccess: false,
    button: true,
  });
  const [data, setData] = useState({
    email_id: "",
    access_code: "",
    password: "",
  });

  function handleClick(e) {
    e.preventDefault();
    sendUniqueCode();
    setHide({
      unique: true,
      disableEmail: true,
      msgAccess: true,
      password: true,
    });
    setTimeout(() => {
      setHide({
        unique: true,
        disableEmail: true,
        msgAccess: false,
        password: true,
        button: false,
      });
    }, 2000);
    console.log("in handleClick");
  }
  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setData({ ...data, [name]: value });
  }
  const sendUniqueCode = async () => {
    try {
      await axios.post(sendAccessCodeURL, data);
    } catch (error) {
      console.log(error);
    }
  };
  function handleChangePassword(e) {
    e.preventDefault();
    changePassword();
    history.push("/Login");
  }
  const changePassword = async () => {
    await axios.patch(updatePassword, data);
  };
  return (
    <div>
      <h1>Reset password</h1>
      {hide.msgAccess && <h4> Access code sent to {data.email_id} </h4>}
      <ul>
        <li>
          <input
            value={data.email}
            name="email_id"
            type="email"
            placeholder="Email ID"
            onChange={handleChange}
            disabled={hide.disableEmail}
          />
        </li>
        {hide.unique && (
          <li>
            <input
              value={data.access_code}
              name="access_code"
              type="text"
              placeholder="enter unique code"
              onChange={handleChange}
            />
          </li>
        )}
        {hide.password && (
          <li>
            <input
              value={data.password}
              name="password"
              type="password"
              placeholder="enter password"
              onChange={handleChange}
            />
          </li>
        )}
      </ul>
      {hide.button ? (
        <button onClick={handleClick} type="submit">
          send
        </button>
      ) : (
        <button onClick={handleChangePassword}>change password</button>
      )}
    </div>
  );
}

export default Resetpassword;
