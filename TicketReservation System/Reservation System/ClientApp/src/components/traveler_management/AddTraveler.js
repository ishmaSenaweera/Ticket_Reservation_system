/*
 * File Name: AddTraveler.js
 * Description: Component for registering new travelers.
 * Author: IT20123468
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../forms.css";

function AddTraveler() {
  const [traveler, setTraveler] = useState({
    nic: "",
    email: "",
    password: "",
    accountStatus: "Active",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  function isValidNic(nic) {
    return nic.length === 10;
  }

  function isValidPhoneNumber(phoneNumber) {
    return /^\d{10}$/.test(phoneNumber);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPassword(password) {
    return password.length > 8;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const addNewTraveler = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!isValidNic(traveler.nic)) {
      newErrors.nic = "NIC should have exactly 10 characters.";
    }

    if (!isValidPhoneNumber(traveler.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number.";
    }
    if (!isValidEmail(traveler.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!isValidPassword(traveler.password)) {
      newErrors.password = "Password should be at least 8 characters.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      fetch("api/traveler", {
        method: "POST",
        body: JSON.stringify(traveler),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => {
          alert("New Traveler Added Successfully");
          navigate("/allTravelers");
        })
        .catch((err) => console.log("error when adding a new traveler: ", err));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTraveler((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <div className="registerTitle">
        <button
          type="button"
          class="btn btn-dark btn-lg orderBtn"
          onClick={() => {
            navigate("/allTravelers");
          }}
        >
          All Travelers
        </button>
      </div>
      <div className="container">
        <h4 className="registerTitle">Register New Traveler</h4>
        <form onSubmit={addNewTraveler} className="registerForm">
          <div className="form-group">
            <label for="inputFirstName">
              First Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="inputFirstName"
              placeholder="Enter First Name"
              name="firstName"
              value={traveler.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label for="inputLastName">
              Last Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="inputLastName"
              placeholder="Enter Last Name"
              name="lastName"
              value={traveler.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label for="inputNic">
              NIC <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="inputNic"
              placeholder="Enter NIC"
              name="nic"
              value={traveler.nic}
              onChange={handleChange}
              required
            />
            {errors.nic && <p className="error-text">{errors.nic}</p>}
          </div>
          <div className="form-group">
            <label for="inputMobileNumber">
              Phone Number <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="number"
              className="form-control"
              id="inputMobileNumber"
              placeholder="Enter Phone number"
              name="phoneNumber"
              value={traveler.phoneNumber}
              onChange={handleChange}
              required
            />
            {errors.phoneNumber && (
              <p className="error-text">{errors.phoneNumber}</p>
            )}
          </div>
          <div className="form-group">
            <label for="inputEmail">
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="Enter Email Address"
              name="email"
              value={traveler.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label for="inputPassword">
              Password <span style={{ color: "red" }}>*</span>
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="inputPassword"
                placeholder="Enter Password"
                name="password"
                value={traveler.password}
                onChange={handleChange}
                required
              />
              <i
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
              ></i>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <button type="submit" className="btn btn-dark btn-lg">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTraveler;
