import React from "react";
import { useState } from "react";
import axios from "axios";
import { isEmail, isStrongPassword } from "validator";
import { useHistory } from "react-router-dom";
const url = "http://127.0.0.1:8000/signup";

function Signup() {
  let history = useHistory();
  let flag = 0;
  const [message, setMessage] = useState("");
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const [values, setValue] = useState({
    username: "",
    email_id: "",
    password: "",
    role: "",
  });

  const postData = async () => {
    try {
      await axios.post(url, values);
    } catch (error) {
      console.log({ error });
    }
  };

  const check = () => {
    if (
      !(values.username && values.email_id && values.password && values.role)
    ) {
      setMessage("all fields must be filled");
      return (flag = 1);
    } else {
      setMessage("");
    }
    if (!isEmail(values.email_id)) {
      Setemail("enter valid email");
      return (flag = 1);
    } else {
      Setemail("");
    }
    if (!isStrongPassword(values.password)) {
      Setpassword("enter valid password");
      return (flag = 1);
    } else {
      Setpassword("");
    }
    if (flag === 0) {
      return (flag = 0);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(values);
    check();

    if (flag === 0) {
      setValue({
        username: "",
        email_id: "",
        password: "",
        role: "",
      });
      console.log("all valid");
      postData();

      history.push("/login");
    }
  }

  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    setValue({
      ...values,
      [name]: value,
    });
  }

  return (
    <div>
      <h1>Signup</h1>
      <form action="">
        <ul>
          <li>
            {" "}
            <input
              type="text"
              placeholder="Username"
              value={values.username}
              onChange={handleChange}
              name="username"
            />
          </li>
          <li>
            {" "}
            <input
              type="email"
              placeholder="Email Id"
              value={values.email_id}
              onChange={handleChange}
              name="email_id"
            />
          </li>
          <li>
            <input
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              name="password"
            />
          </li>
          <li>
            {" "}
            <select name="role" id="" onChange={handleChange}>
              <option hidden={true} selected>
                Role
              </option>
              <option value="hr">hr</option>
              <option value="admin">admin</option>
              <option value="user">user</option>
              <option value="it">it</option>
            </select>
          </li>
          <li></li>
        </ul>

        <button onClick={handleSubmit} type="submit">
          signup
        </button>
      </form>
      <h4>{message}</h4>
      <h4>{email}</h4>
      <h4>{password}</h4>
    </div>
  );
}

export default Signup;
