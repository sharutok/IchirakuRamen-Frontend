import React, { useState } from "react";
// import  from "@mui/material/Button";
import axios from 'axios'
import { TextField, Box, Link, Snackbar } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import "../CSS/LoginPage.css";
import logo from "../Images/AWL_logo_new.png";

function LoginPage() {
  const [mess, setMess] = useState({
    state: false,
    content: true
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    state: false, content: ""
  })
  const [loginData, setLoginData] = useState({
    username: "", password: ""
  })
  const LoginURL = `http://localhost:8080/login`
  const checkUserExists = `http://localhost:8080/login/`

  async function handleOnChange(e) {
    e.preventDefault()
    let name = e.target.name
    let value = e.target.value
    setLoginData({ ...loginData, [name]: value })
  }
  async function handleOnClick(e) {
    e.preventDefault()
    if (loginData.password && loginData.username) {

      try {
        const isOk = await axios.post(LoginURL, loginData)
        console.log(isOk.status);
        setError({ state: false, content: "" })
        setTimeout(async () => {
          console.log("sent");
          window.location.href = 'http://localhost:3000/acc';
        }, 2000)
        setLoading(true)
      } catch (error) {
        setError({ state: true, content: "Invalid username or password" })
        console.log("error");
      }


    }
  }
  return (
    <div className="holder">
      <Box
        className="card"
        component="form"
        sx={{
          "& .MuiTextField-root": { width: "40ch", mb: 4 },
        }}
        noValidate
        autoComplete="off"
      >
        <img src={logo} alt="" />
        <TextField
          onChange={handleOnChange} error={error.state} name="username" required variant="filled" label="Username"></TextField>
        <TextField
          required
          name="password"
          variant="filled"
          label="Password"
          type="password"
          error={error.state}
          helperText={error.content}
          onChange={handleOnChange}
        ></TextField>

        <LoadingButton
          color="secondary"
          onClick={handleOnClick}
          loading={loading}
          loadingPosition="start"
          variant="contained"

        >
          LogIn
        </LoadingButton>

        <Link
          sx={{ ml: 13, mt: 2 }}
          href="/account/password/reset"
          variant="body2"
        >
          Forgot password?
        </Link>
      </Box>
    </div>
  );
}

export default LoginPage;
