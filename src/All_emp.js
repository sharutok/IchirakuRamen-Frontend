import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
function All_emp() {
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const history = useHistory();

  const getUsers = async () => {
    const res = await fetch("http://127.0.0.1:8000/details/per");
    const data = await res.json();
    setUsers(data.user);
  };
  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (emp_id) => {
    await axios.delete(
      `http://127.0.0.1:8000/details/deleteemployee/${emp_id}`
    );
    window.location.reload();
  };

  function handleClick(emp_id) {
    deleteUser(emp_id);
  }

  return (
    <div>
      <h1>Welcome, {location.state.data.username}</h1>

      <button
        onClick={() => {
          history.push({
            pathname: "/NewEmp",
            state: { data: location.state.data.username },
          });
        }}
      >
        Enter New Employee
      </button>
      {console.log(users)}
      {users.map((user) => {
        const { emp_id, first_name, last_name, _id } = user;

        return (
          <div key={_id}>
            <hr />
            <span>
              <span>{emp_id} </span>
              <span>{first_name} </span>
              <span>{last_name} </span>
            </span>
            <Link to={`/EmpDetails/${emp_id}`}>details </Link>
            <MdDeleteForever
              onClick={() => {
                handleClick(emp_id);
              }}
            />
          </div>
        );
      })}
      <hr />
    </div>
  );
}

export default All_emp;
