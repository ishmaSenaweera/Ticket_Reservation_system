import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

function UpdateUser() {
  const [user, setUser] = useState({
    staffId: "",
    firstName: "",
    lastName: "",
    nic: "",
    type: "",
    email: "",
    phoneNumber: "",
    password: "",
    gender: "male",
  });

  let navigate = useNavigate();

  const { id } = useParams();

  //get the relevant user for update
  useEffect(() => {
    fetch("api/user/" + id)
      .then((res) => res.json())
      .then((data) => {
        console.log("user for update: ", data);
        setUser(data);
      })
      .catch((err) =>
        console.log("error related to get the user for update: ", err)
      );
  }, []);

  const updateUser = (e) => {
    e.preventDefault();

    fetch("api/user/" + id, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        alert("User Updated Successfully");
        window.location = "/allUsers";
      })
      .catch((err) => console.log("error when updating a user: ", err));
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
        <h4 className="registerTitle">Update User Profile</h4>
        <form onSubmit={updateUser} className="registerForm">
          <div className="form-group">
            <label for="inputStafId">Staff ID</label>
            <input
              type="text"
              className="form-control"
              id="inputStafId"
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
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-dark btn-lg">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
