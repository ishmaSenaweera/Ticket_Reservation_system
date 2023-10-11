import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../forms.css";

/*
 * File Name: AllBookings.js
 * Description: Component to display and manage all reservations.
 * Author: IT20168704
 */

function AllBookings() {
  const [bookings, setBookings] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    fetch("api/reservation")
      .then((res) => res.json())
      .then((data) => {
        console.log("the bookings are: ", data);
        setBookings(data);
      })
      .catch((e) => console.log("error when fetching bookings data: ", e));
  }, []);

  function deletebooking(id, reservationDate) {
    const currentDate = new Date();
    const reservationDateObj = new Date(reservationDate);
  
    // Calculate the difference in days between the current date and the reservation date
    const daysUntilReservation = Math.floor(
      (reservationDateObj - currentDate) / (1000 * 60 * 60 * 24)
    );
  
    if (daysUntilReservation >= 5) {
      fetch(`api/reservation/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Reservation Deleted Successfully");
        })
        .catch((err) => console.log("Error when deleting a booking: ", err));
  
      setBookings(bookings.filter((booking) => booking.id !== id));
    } else {
      alert("Reservations can only be deleted at least 5 days before the reservation date.");
    }
  }
  
  
  return (
    <div className="">
      <div className="registerTitle">
        <button
          type="button"
          class="btn btn-dark btn-lg orderBtn"
          onClick={() => {
            navigate("/addbooking");
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
      <div className="staffTable">
        <h4 className="registerTitle">All Reservation Details</h4>

        <div className="">
          <div>
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Reference No</th>
                  <th scope="col">Traveler Name</th>
                  <th scope="col">Mobile Number</th>
                  <th scope="col">Traveler Email</th>
                  <th scope="col">Reservation date</th>
                  <th scope="col">Travel Details</th>
                  <th scope="col">Number of Tickets</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="table-light">
                {bookings.map((booking, index) => {
                  return (
                    <tr key={booking.id}>
                      <td>000{index + 1}</td>
                      <td>{booking.name}</td>
                      <td>{booking.mobile}</td>
                      <td>{booking.email}</td>
                      <td>{booking.date}</td>
                      <td>{booking.details}</td>
                      <td>{booking.tickets}</td>
                      
                      <td>
                        <button
                          type="button"
                          class="btn btn-success btn-md orderBtn"
                          onClick={() => {
                            navigate(`/updateBooking/${booking.id}`);
                          }}
                        >
                          <b>Update</b>
                        </button>

                        <button
                          type="button"
                          class="btn btn-danger btn-md orderBtn"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete this record?"
                              )
                            )
                              deletebooking(booking.id, booking.date);
                          }}
                        >
                          <b>Delete</b>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllBookings;
