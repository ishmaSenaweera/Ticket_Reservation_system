import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../forms.css";

function UserLogin() {
  const [user, setUser] = useState({
    nic: "",
    password: "",
  });

  let navigate = useNavigate();

  function sendData(e) {
    e.preventDefault();

    let nic = user.nic;

    fetch("api/user/" + nic)
      .then((res) => res.json())
      .then((data) => {
        console.log("user for login: ", data);
        if (data.status === 404) {
          alert("Invalid User Login");
        } else if (data.password === user.password) {
          alert("User Validated Successfully");
          navigate("/home");
        } else {
          alert("Invalid Password");
        }
      })
      .catch((err) =>
        console.log("error related to get the user for update: ", err)
      );
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setUser((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }

  return (
    <div className="container">
      <h4 className="registerTitle">User Login</h4>
      <form onSubmit={sendData} className="loginForm">
        <div className="form-group">
          <label for="inputNic">NIC</label>
          <input
            type="text"
            className="form-control"
            id="inputNic"
            placeholder="Enter NIC Number"
            name="nic"
            value={user.nic}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label for="inputPaswod">Password</label>
          <input
            type="password"
            className="form-control"
            id="inputPaswod"
            placeholder="Enter Password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-dark btn-lg">
          Login
        </button>
      </form>
    </div>
  );
}

export default UserLogin;
