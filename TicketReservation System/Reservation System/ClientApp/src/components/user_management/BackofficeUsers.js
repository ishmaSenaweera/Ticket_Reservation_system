import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../forms.css";

function BackofficeUsers() {
  const [users, setUsers] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    fetch("api/user")
      .then((res) => res.json())
      .then((data) => {
        const allUsers = data;

        const backofficeUsers = allUsers.filter((usr) => {
          return usr.type === "Backoffice User";
        });

        setUsers(backofficeUsers);
      })
      .catch((e) => console.log("error when fetching users data: ", e));
  }, []);

  return (
    <div className="">
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
      <div className="staffTable">
        <h4 className="registerTitle">All Backoffice Users</h4>

        <div className="">
          <div>
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Staff ID</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">NIC</th>
                  <th scope="col">User Type</th>
                  <th scope="col">Email</th>
                  <th scope="col">PhoneNumber</th>
                  <th scope="col">Gender</th>
                </tr>
              </thead>
              <tbody className="table-light">
                {users.map((user, index) => {
                  return (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.staffId}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.nic}</td>
                      <td>{user.type}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.gender}</td>
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

export default BackofficeUsers;
