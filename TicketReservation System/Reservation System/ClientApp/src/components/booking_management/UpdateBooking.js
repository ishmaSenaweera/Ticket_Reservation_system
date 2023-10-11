import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

/*
 * File Name: UpdateBooking.js
 * Description: Component to update booking details.
 * Author: IT20168704
 */


function UpdateBooking() {
  const [booking, setBooking] = useState({
    name:"",
    mobile:"",
    email:"",
    date: "",
    details: "",
    tickets:"",
  });

  let navigate = useNavigate();

  const { id } = useParams();

  //get the relevant booking for update
  useEffect(() => {
    fetch("api/reservation/" + id)
      .then((res) => res.json())
      .then((data) => {
        console.log("booking for update: ", data);
        setBooking(data);
      })
      .catch((err) =>
        console.log("error related to get the booking for update: ", err)
      );
  }, []);

  const updateBooking = (e) => {
    e.preventDefault();

    fetch("api/reservation/" + id, {
      method: "PUT",
      body: JSON.stringify(booking),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        alert("Reservation Updated Successfully");
        window.location = "/allBookings";
      })
      .catch((err) => console.log("error when updating a booking: ", err));
  };

  function handleChange(event) {
    const { name, value } = event.target;

    setBooking((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }

  function calculateMaxDate() {
    const today = new Date();
    today.setDate(today.getDate() + 30); // Add 30 days to today's date
    const maxDate = today.toISOString().split('T')[0]; // Format it as yyyy-mm-dd
    return maxDate;
  }

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  

  return (
    <div>
      <div className="registerTitle">
        <button
          type="button"
          class="btn btn-dark btn-lg orderBtn"
          onClick={() => {
            navigate("/addBooking");
          }}
        >
          Register New Reservation
        </button>

        <button
          type="button"
          class="btn btn-dark btn-lg orderBtn"
          onClick={() => {
            navigate("/allBookings");
          }}
        >
          All Reservations
        </button>
       
      </div>
      <div className="container">
        <h4 className="registerTitle">Update Reservation Details</h4>
        <form onSubmit={updateBooking} className="registerForm">

        <div className="form-group">
            <label for="name">Traveler Name</label>
            <input
              type="text"
              className="form-control"
              id="inputTravelerName"
              placeholder="Enter Traveler Name"
              name="name"
              value={booking.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label for="reference">Mobile Number</label>
            <input
              type="text"
              className="form-control"
              id="inputRefId"
              placeholder="Enter Traveler Mobile Number"
              name="mobile"
              value={booking.mobile}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label for="reference">Traveler Email</label>
            <input
              type="text"
              className="form-control"
              id="inputRefId"
              placeholder="Enter Traveler Email"
              name="email"
              value={booking.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label for="date">Reservation date (Select Only Date Within 30 Days)</label>
            <input
             type="date"
             className="form-control"
             id="inputBookingDate"
             placeholder="Enter Reservation Date"
             name="date"
             value={booking.date}
             onChange={handleChange}
             required
             min={getCurrentDate()} // Set the minimum date here
             max={calculateMaxDate()} // Set the maximum date here
            />
          </div>
          <div className="form-group">
            <label for="detalis">Travel Details</label>
            <input
              type="text"
              className="form-control"
              id="inputDetails"
              placeholder="Enter Travel Details"
              name="details"
              value={booking.details}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label for="nic">Number of Tickets</label>
            <input
              type="number"
              className="form-control"
              id="inputNic"
              placeholder="Enter Number of Tickets"
              name="tickets"
              value={booking.tickets}
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

export default UpdateBooking;
