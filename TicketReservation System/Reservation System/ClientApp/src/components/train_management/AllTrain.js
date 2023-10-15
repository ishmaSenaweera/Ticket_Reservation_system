import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../forms.css";

function AllTrains() {
  const [trains, setTrains] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    fetch("api/train")
      .then((res) => res.json())
      .then((data) => {
        console.log("the trains are: ", data);
        setTrains(data);
      })
      .catch((e) => console.log("error when fetching train data: ", e));
  }, []);

  function deleteTrain(id) {
    fetch("api/train/" + id, {
      method: "DELETE",
    })
      .then((res) => {
        alert("Train Deleted Successfully");
      })
      .catch((err) => console.log("error when deleting a train: ", err));

    setTrains(trains.filter((train) => train.Id !== id));  // Use train.Id because the property in Train model is "Id".
  }

  return (
    <div className="">
      <div className="registerTitle">
        <button
          type="button"
          className="btn btn-dark btn-lg orderBtn"
          onClick={() => {
            navigate("/addTrain");
          }}
        >
          Add New Train
        </button>

        <button
          type="button"
          className="btn btn-dark btn-lg orderBtn"
          onClick={() => {
            navigate("/allTrain");
          }}
        >
          All Trains
        </button>
      </div>
      <div className="trainTable">
        <h4 className="registerTitle">All Trains</h4>
        <div className="">
          <div>
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Train ID</th>
                  <th scope="col">Train Name</th>
                  <th scope="col">Schedule</th>
                  <th scope="col">Active</th>
                  <th scope="col">Published</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="table-light">
                {trains.map((train, index) => {
                  return (
                    <tr key={train.Id}>
                      <td>{index + 1}</td>
                      <td>{train.id}</td>
                      <td>{train.name}</td>
                      <td>{train.schedule}</td>
                      <td>{train.active }</td>
                      <td>{train.published }</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-success btn-md orderBtn"
                          onClick={() => {
                            navigate(`/updateTrain/${train.id}`);
                          }}
                        >
                          <b>Update</b>
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-md orderBtn"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete this train?"
                              )
                            )
                              deleteTrain(train.id);
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

export default AllTrains;
