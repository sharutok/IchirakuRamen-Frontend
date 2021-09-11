import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

function Login() {
  const history = useHistory();
  const url = "http://127.0.0.1:8000/login";
  const [data, setData] = useState({
    username: "",
    email_id: "",
    password: "",
  });
  const [mess, setMess] = useState(false);

  const checkData = async () => {
    try {
      await axios.post(url, data);
      setMess(false);
      return 1;
    } catch (e) {
      setMess(true);
      return 0;
    }
  };

  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    checkData().then((flag) => {
      if (flag) {
        history.push({ pathname: "/AllEmp", state: { data } });
      }
    });
  }
  return (
    <div>
      <h1>Login</h1>
      <ul>
        <li>
          {" "}
          <input
            name="username"
            type="text"
            placeholder="username"
            value={data.username}
            onChange={handleChange}
            required
          />
        </li>
        <li>
          <input
            name="email_id"
            type="email"
            placeholder="Email Id"
            value={data.emailid}
            onChange={handleChange}
            required
          />
        </li>
        <li>
          <input
            name="password"
            type="password"
            placeholder="password"
            value={data.password}
            onChange={handleChange}
            required
          />
        </li>
        <li>
          <Link to="/resetpassword">Forgot password?</Link>
        </li>
      </ul>

      <button onClick={handleSubmit}>Login</button>

      {mess && <h4>Enter correct username or email-id or password</h4>}
    </div>
  );
}

export default Login;
