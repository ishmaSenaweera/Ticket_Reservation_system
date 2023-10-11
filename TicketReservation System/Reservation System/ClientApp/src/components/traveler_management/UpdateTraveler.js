/*
 * File Name: UpdateTraveler.js
 * Description: Component to update traveler details.
 * Author: IT20123468
 */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

function UpdateTraveler() {
  const [traveler, setTraveler] = useState({
    nic: "",
    email: "",
    accountStatus: "Active",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  let navigate = useNavigate();
  const { nic } = useParams();

  //get the relevant user for update
  useEffect(() => {
    fetch("api/traveler/" + nic)
      .then((res) => res.json())
      .then((data) => {
        console.log("user for update: ", data);
        setTraveler(data);
      })
      .catch((err) => console.log("error getting traveler for update: ", err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function isValidNic(nic) {
    return nic.length === 10;
  }

  function isValidPhoneNumber(phoneNumber) {
    return /^\d{10}$/.test(phoneNumber);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const updateTraveler = (e) => {
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

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      fetch("api/traveler/" + nic, {
        method: "PUT",
        body: JSON.stringify(traveler),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => {
          alert("Traveler Updated Successfully");
          window.location = "/allTravelers";
        })
        .catch((err) => console.log("error when updating the Traveler: ", err));
    }
  };

  function handleChange(event) {
    const { name, value } = event.target;

    setTraveler((preValue) => {
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
            navigate("/addTraveler");
          }}
        >
          Register New Traveler
        </button>
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
        <h4 className="registerTitle">Update Traveler Profile</h4>
        <form onSubmit={updateTraveler} className="registerForm">
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

          <button type="submit" className="btn btn-dark btn-lg">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateTraveler;
