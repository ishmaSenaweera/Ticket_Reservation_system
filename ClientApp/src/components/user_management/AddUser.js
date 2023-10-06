import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [user, setUser] = useState({
    staffId: "",
    firstName: "",
    lastName: "",
    nic: "",
    type: "Backoffice User",
    email: "",
    phoneNumber: "",
    password: "",
    gender: "male",
  });

  let navigate = useNavigate();

  const addNewUser = (e) => {
    e.preventDefault();

    fetch("api/user", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        // console.log("responce from backend related to add new user: ", res);
        alert("New User Added Successfully");
        window.location = "/allUsers";
      })
      .catch((err) => console.log("error when adding a new user: ", err));
  };

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
    <div>
      <div className="registerTitle">
        <button
          type="button"
          class="btn btn-dark btn-lg orderBtn"
          onClick={() => {
            navigate("/addUser");
          }}
        >
          Register New User
        </button>

        <button
          type="button"
          class="btn btn-dark btn-lg orderBtn"
          onClick={() => {
            navigate("/allUsers");
          }}
        >
          All users
        </button>
        <button
          type="button"
          class="btn btn-dark btn-lg orderBtn"
          onClick={() => {
            navigate("/backofficeUsers");
          }}
        >
          Backoffice Users
        </button>
        <button
          type="button"
          class="btn btn-dark btn-lg orderBtn"
          onClick={() => {
            navigate("/travelAgents");
          }}
        >
          Travel Agents
        </button>
      </div>
      <div className="container">
        <h4 className="registerTitle">Register New User</h4>
        <form onSubmit={addNewUser} className="registerForm">
          <div className="form-group">
            <label for="inputStafId">Staff ID</label>
            <input
              type="text"
              className="form-control"
              id="inputStafId"
              placeholder="Enter Staff ID"
              name="staffId"
              value={user.staffId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label for="inputFirstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="inputFirstName"
              placeholder="Enter First Name"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label for="inputLastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="inputLastName"
              placeholder="Enter Last Name"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label for="inputNic">NIC</label>
            <input
              type="text"
              className="form-control"
              id="inputNic"
              placeholder="Enter NIC"
              name="nic"
              value={user.nic}
              onChange={handleChange}
              required
            />
          </div>
          <div class="form-group row">
            <label for="userType" className="col-sm-2 col-form-label">
              User Type
            </label>
            <div className="col-sm-10">
              <select
                id="userType"
                class="form-control"
                value={user.type}
                onChange={handleChange}
                name="type"
              >
                <option
                  selected={user.type === "Backoffice User"}
                  value="Backoffice User"
                >
                  Backoffice User
                </option>
                <option
                  selected={user.type === "Travel Agent"}
                  value="Travel Agent"
                >
                  Travel Agent
                </option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label for="gender" className="col-sm-2 col-form-label">
              Gender
            </label>
            <div className="col-sm-10">
              <select
                id="gender"
                class="form-control"
                value={user.gender}
                onChange={handleChange}
                name="gender"
              >
                <option selected={user.gender === "Male"} value="Male">
                  Male
                </option>
                <option selected={user.gender === "Female"} value="Female">
                  Female
                </option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label for="inputEmail">Email</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="Enter Email Address"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label for="inputMobileNumber">Phone Number</label>
            <input
              type="number"
              className="form-control"
              id="inputMobileNumber"
              placeholder="Enter Phone number"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label for="inputPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Enter Password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-dark btn-lg">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
