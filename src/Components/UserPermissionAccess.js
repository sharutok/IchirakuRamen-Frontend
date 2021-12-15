import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import DataSetGraph from './DataSetGraph';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import Button from '@mui/material/Button';
import "../CSS/UserPermissionAccess.scss"
const getUser = `http://localhost:8080/login/user/all`
const newUser = `http://localhost:8080/login/create/user`
// const UpdateUser = `http://localhost:8080/`
// const DeleteUser = `http://localhost:8080/`

function UserPermissionAccess() {
    const cookie = new Cookies()
    // const user = cookie.get("user")
    // const plant = cookie.get('plant')
    const role = cookie.get('role')
    const [snack, setSnack] = useState({
        content: "", state: false
    })
    const [users, setUsers] = useState([])
    const [mess, setMess] = useState({
        content: "", state: false
    })
    const [hide, setHide] = useState(false)
    const [values, setValue] = useState({
        email: "", username: "", password: "", verify_password: "", plant: "", role: ""
    })
    const getData = async () => {
        let respond = await axios.get(getUser)
        const { result } = respond.data
        setUsers(result)
    }
    const postData = async () => {
        console.log(values);
        const res = await axios.post(newUser, values)
        console.log(res);
    }
    useEffect(() => {
        getData()
    }, [])

    function handleChange(e) {
        let name = e.target.name
        let value = e.target.value
        setValue({ ...values, [name]: value })
    }
    function handelClick(e) {
        e.preventDefault()
        if (values.email && values.password && values.verify_password && values.plant && values.role) {
            if (values.password !== values.verify_password) {
                return setMess({ content: "passwords does'nt match", state: true })
            }
            setMess({ content: "", state: false })
            postData()
            setSnack({ state: true, content: "user created successfully" })
            setTimeout(() => {
                setSnack({ state: false, content: "" })
            }, 2000)

        }
    }


    return (
        <div>
            {hide &&
                <div className="create-new-block">
                    <Snackbar
                        open={snack.state}
                        autoHideDuration={1000}
                        message={snack.content}
                    // action={action}
                    />
                    <h1>Create New User</h1>
                    <div className="create-new-container" >
                        <TextField size="small" autoComplete="off" className="filled-basic" label="Email ID" name="email" variant="outlined" onChange={handleChange} />
                        <TextField size="small" autoComplete="off" className="filled-basic" label="Username" name="username" variant="outlined" onChange={handleChange} />
                        <TextField size="small" autoComplete="off" className="filled-basic" type="password" label="Password" name="password" error={mess.state} helperText={mess.content} variant="outlined" onChange={handleChange} />
                        <TextField size="small" autoComplete="off" className="filled-basic" type="password" label="Verify Passsword" name="verify_password" error={mess.state} variant="outlined" onChange={handleChange} />
                        <FormControl size="small" autoComplete="off" sx={{ minWidth: 120, }}>
                            <InputLabel id="demo-simple-select-label">Plant</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.plant}
                                label="Plant"
                                name="plant"
                                onChange={handleChange}>
                                <MenuItem onChange={handleChange} value={"CHI"}>CHINCHWAD</MenuItem>
                                <MenuItem onChange={handleChange} value={"SIL"}>SILVASA</MenuItem>
                                <MenuItem onChange={handleChange} value={"RPR"}>RAIPUR</MenuItem>
                                <MenuItem onChange={handleChange} value={"HO"}>HEAD OFFICE</MenuItem>
                                <MenuItem onChange={handleChange} value={"CHN"}>CHENNAI</MenuItem>
                                {role === "ADMIN" && <MenuItem onChange={handleChange} value={"ALL"}>ALL</MenuItem>}
                            </Select>
                        </FormControl>
                        <FormControl size="small" sx={{ minWidth: 120 }}  >
                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.role}
                                label="Role"
                                name="role"
                                onChange={handleChange}>
                                <MenuItem onChange={handleChange} value={"USER"}>User</MenuItem>
                                <MenuItem onChange={handleChange} value={"PLANT_HEAD"}>Plant Head</MenuItem>
                                {role === "ADMIN" && <MenuItem onChange={handleChange} value={"ADMIN"}>Admin</MenuItem>}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="Button">
                        <button className="vendor_form_send_link" onClick={handelClick} type="">Success</button>
                        <button className="vendor_form_del" onClick={() => setHide(!hide)} type="">Close</button>
                    </div>
                </div>}
            {/* <DataSetGraph /> */}
            <div className="grid-view">
                <table>
                    <h4 className="create_new" onClick={() => setHide(!hide)}>create new user</h4>
                    <tr>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Plant</th>
                        <th>User</th>
                        <th>Active</th>
                    </tr>
                    {users.map(x => {
                        const { email, username, plant, role, active } = x
                        return (<>
                            <tr>
                                <td>{email}</td>
                                <td>{username}</td>
                                <td>{plant}</td>
                                <td>{role}</td>
                                <td style={{ color: active === "1" ? "green" : 'red', fontWeight: "bolder" }}>{active === "1" ? "Yes" : "No"}</td>
                            </tr>
                        </>)
                    })}
                </table>
            </div>

        </div >
    )

}

export default UserPermissionAccess
