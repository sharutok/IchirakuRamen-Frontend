import React, { useState } from "react";
import logo from "../Images/AWL_logo_new.png";
import { Box, TextField, Button, Snackbar } from "@mui/material";
// import { LoadingButton } from "@mui/lab";
import axios from 'axios'
function ResetPassword() {
  const [data, setData] = useState({
    email: "",
    otp: "",
    password: "",
    verify_password: ""
  })
  const [error, setError] = useState({
    state: false, content: ""
  })
  const [disabled, setDisabled] = useState(false)
  const [hide, setHide] = useState({
    otp: false, password: false, button: false
  })
  const [mess, setMess] = useState({
    states: false,
    content: "",

  }
  )
  const URLToSendOTP = "http://localhost:8080/login/password/otp"
  const URLToRestPassword = "http://localhost:8080/login/password/reset"
  const URLFindUserByEmail = `http://localhost:8080/login/email`
  const url = `http://localhost:3000/login/`
  function handleOnchange(e) {
    const name = e.target.name
    const value = e.target.value
    setData({ ...data, [name]: value })

  }

  async function sendOtp(e) {
    e.preventDefault()
    if (data.email !== "") {
      try {
        const response = await fetch(`${URLFindUserByEmail}/${data.email}`)
        const resData = await response.json()
        console.log("sendOtp");
        // console.log(resData.email);

        if (resData.email === data.email) {
          console.log("yes");
          await axios.post(URLToSendOTP, { email: data.email })
          setMess({
            content: "OTP sent", states: true,
          })
          setTimeout(async () => {
            setMess({
              content: "", states: false
            })
            console.log("sent")
          }, 2000)
          setDisabled(true)
          setHide({ password: true, otp: true, button: true })
          // setHide({ password: true, otp: true, button: true })
        }

      } catch (error) {
        setMess({ content: `there is no email id of ${data.email} present!!! `, states: true })
        setTimeout(async () => {
          setMess({
            content: "", states: false
          })
        }, 2000)
      }

    }
  }


  async function resetPassword(e) {
    e.preventDefault()

    const response = await fetch(`${URLFindUserByEmail}/${data.email}`)
    const resData = await response.json()
    console.log(resData);
    if (resData.otp === data.otp) {
      console.log("in otp");
      if (data.password === data.verify_password) {
        console.log("in password");
        console.log(data.password, data.verify_password);
        try {
          await axios.patch(URLToRestPassword, { otp: data.otp, password: data.password, verify_password: data.verify_password })
        } catch (error) {
          console.log("error");
        }
        setError({ content: "", state: false })
        setMess({ content: `login page will be directed in 5sec `, states: true })
        setTimeout(async () => {
          setMess({
            content: "", states: false
          })
          window.location.href = url;

        }, 3000)
      }
      else {
        setError({ content: `Password does'nt matches  `, state: true })
      }
    }
    else {

      setMess({ content: `invalid OTP `, states: true })
      setTimeout(async () => {
        setMess({
          content: "", states: false
        })
      }, 2000)
    }
  }
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
        message={mess.content}
        open={mess.states}
      ></Snackbar>
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

          <p>
            Enter your email address below and we'll send you a OTP to your email
          </p>
          <TextField

            name="email"
            required
            disabled={disabled}
            onChange={handleOnchange}
            variant="filled"
            label="Email address"
            type="email"
          ></TextField>
          {hide.otp && <TextField
            required
            name="otp"
            // disabled={disabled}  
            onChange={handleOnchange}
            variant="filled"
            label="OTP"
            type="text"
          ></TextField>}
          {hide.password && <TextField
            required
            // disabled={disabled}
            onChange={handleOnchange}
            variant="filled"
            label="Password"
            type="password"
            name="password"
            error={error.state}
          ></TextField>}

          {hide.password && <TextField
            required
            // disabled={disabled}
            onChange={handleOnchange}
            variant="filled"
            name="verify_password"
            label="Confirm Password "
            type="password"
            error={error.state}
            helperText={error.content}
          ></TextField>}
          {hide.button ? <Button onClick={resetPassword} varient="contained" color="success" size="medium">
            Reset Password
          </Button> : <Button onClick={sendOtp} varient="contained" color="success" size="medium">
            Send OTP
          </Button>}

        </Box>
      </div>
    </div>
  );
}

export default ResetPassword;
