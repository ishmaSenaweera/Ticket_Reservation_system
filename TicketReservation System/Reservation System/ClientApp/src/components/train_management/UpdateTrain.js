import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

function UpdateTrain() {
    const [train, setTrain] = useState({
        name: "",
        schedule: "",
        active: "",
        published: "",
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetch("api/train/" + id)
            .then((res) => res.json())
            .then((data) => {
                console.log("train for update: ", data);
                setTrain(data);
            })
            .catch((err) =>
                console.error("error related to get the train for update:", err)
            );
    }, [id]);

    const updateTrain = (e) => {
        e.preventDefault();

        fetch("api/train/" + id, {
            method: "PUT",
            body: JSON.stringify(train),
            headers: {
                "content-type": "application/json",
            },
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to update train");
            }
            alert("Train Updated Successfully");
            navigate("/allTrains");
        })
        .catch((err) => console.error("error when updating a train:", err));
    };

    function handleChange(event) {
        const { name, value } = event.target;
        setTrain((preValue) => ({
            ...preValue,
            [name]: value,
        }));
    }

    return (
        <div className="container">
            <h4 className="updateTitle">Update Train Profile</h4>
            <form onSubmit={updateTrain} className="updateForm">
                <div className="form-group">
                    <label htmlFor="trainName">Train Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="trainName"
                        name="name"
                        value={train.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="trainSchedule">Train Schedule</label>
                    <input
                        type="text"
                        className="form-control"
                        id="trainSchedule"
                        name="schedule"
                        value={train.schedule}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group row">
                    <label htmlFor="active_" className="col-sm-2 col-form-label">Active</label>
                    <div className="col-sm-10">
                        <select
                            id="active_"
                            className="form-control"
                            value={train.active}
                            onChange={handleChange}
                            name="active"
                        >
                            <option value="active">active</option>
                            <option value="inactive">inactive</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="published_" className="col-sm-2 col-form-label">Published</label>
                    <div className="col-sm-10">
                        <select
                            id="published_"
                            className="form-control"
                            value={train.published}
                            onChange={handleChange}
                            name="published"
                        >
                            <option value="published">published</option>
                            <option value="unpublished">unpublished</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-dark btn-lg">
                    Update
                </button>
            </form>
        </div>
    );
}

export default UpdateTrain;
