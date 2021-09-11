import React from "react";
import Login from "./Login";
import Error from "./Error";
import Signup from "./Signup";
import Homepage from "./Homepage";
import All_emp from "./All_emp";
import Employee_indv_details from "./Employee_indv_details";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import NewEmployee from "./NewEmployee";
import Resetpassword from "./Resetpassword";
import LoginLogoutSim from "./LoginLogoutSim";

function App() {
  return (
    <>
      <Router>
        <Link to="/">Payroll Management Sys</Link>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>

          <Route path="/Login">
            <Login />
          </Route>

          <Route path="/Signup" children={<Login />}>
            <Signup />
          </Route>
          <Route path="/AllEmp">
            <All_emp />
          </Route>
          <Route path="/EmpDetails/:id" children={<Employee_indv_details />}>
            <Employee_indv_details />
          </Route>
          <Route path="/NewEmp">
            <NewEmployee />
          </Route>
          <Route path="/resetpassword">
            <Resetpassword />
          </Route>
          <Route path="/sim">
            {" "}
            <LoginLogoutSim />{" "}
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
