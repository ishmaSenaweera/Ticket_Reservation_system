/*
 * File Name: AllTravelers.js
 * Description: Component to display and manage all travelers.
 * Author: IT20123468
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../forms.css";

function AllTravelers() {
  const [travelers, setTravelers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    fetch("api/traveler")
      .then((res) => res.json())
      .then((data) => {
        setTravelers(data);
      })
      .catch((e) => console.log("error when fetching users data: ", e));
  }, []);

  function deleteTraveler(nic) {
    fetch("api/traveler/" + nic, {
      method: "DELETE",
    })
      .then((res) => {
        alert("Traveler Delete Successfully");
      })
      .catch((err) => console.log("error when deleting a user: ", err));
    setTravelers(travelers.filter((traveler) => traveler.nic !== nic));
  }

  function changeAccountStatus(traveler) {
    const status =
      traveler.accountStatus === "Active" ? "deactivate" : "activate";
    const newStatus =
      traveler.accountStatus === "Active" ? "Deactivated" : "Active";

    if (
      window.confirm(
        `Are you sure you want to ${status} this traveler profile?`
      )
    ) {
      fetch("api/traveler/" + traveler.nic, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...traveler,
          accountStatus: newStatus,
        }),
      })
        .then((res) => res.text())
        .then((data) => {
          // Update the local state to reflect the change without having to re-fetch
          setTravelers((prevTravelers) =>
            prevTravelers.map((t) =>
              t.nic === traveler.nic ? { ...t, accountStatus: newStatus } : t
            )
          );
          alert(`Traveler account has been ${status} successfully.`);
        })
        .catch((err) => {
          console.log("Error when changing account status: ", err);
          alert("Failed to change account status. Please try again.");
        });
    }
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
      </div>
      <div className="staffTable">
        <h4 className="registerTitle">All Travelers</h4>
        <div>
          <div>
            <div>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
              >
                <input
                  type="text"
                  placeholder="Search by First Name, Last Name or NIC"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control"
                />
                <i
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  className="fas fa-search"
                ></i>
              </div>
            </div>
            <table
              className="table table-bordered table-hover"
              style={{ textAlign: "center" }}
            >
              <thead className="table-dark">
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">NIC</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Account Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className="table-light">
                {travelers
                  .filter((traveler) => {
                    return (
                      traveler.firstName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      traveler.lastName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      traveler.nic
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    );
                  })
                  .map((traveler, index) => {
                    return (
                      <tr key={traveler.id}>
                        <td>{index + 1}</td>
                        <td>{traveler.nic}</td>
                        <td>{traveler.firstName}</td>
                        <td>{traveler.lastName}</td>
                        <td>{traveler.email}</td>
                        <td>{traveler.phoneNumber}</td>
                        <td>
                          {traveler.accountStatus}
                          <br />
                          {traveler.accountStatus === "Active" ? (
                            <button
                              type="button"
                              class="btn btn-danger btn-md orderBtn"
                              onClick={() => changeAccountStatus(traveler)}
                            >
                              <b>Deactivate</b>
                            </button>
                          ) : (
                            <button
                              type="button"
                              class="btn btn-warning btn-md orderBtn"
                              onClick={() => changeAccountStatus(traveler)}
                            >
                              <b>Activate</b>
                            </button>
                          )}
                        </td>

                        <td>
                          <button
                            type="button"
                            class="btn btn-success btn-md orderBtn"
                            onClick={() => {
                              navigate(`/updateTraveler/${traveler.nic}`);
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
                                deleteTraveler(traveler.nic);
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

export default AllTravelers;
