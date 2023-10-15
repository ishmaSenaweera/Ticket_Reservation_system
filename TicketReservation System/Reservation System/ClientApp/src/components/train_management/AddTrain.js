import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTrain() {
    const [train, setTrain] = useState({
        name: "",
        schedule: "",
        active: "active",
        published: "published",
    });

    const navigate = useNavigate();

    const addNewTrain = (e) => {
        e.preventDefault();

        fetch("api/train", {
            method: "POST",
            body: JSON.stringify(train),
            headers: {
                "content-type": "application/json"
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to add new train");
                }
                alert("New Train Added Successfully");
                navigate("/allTrain");
            })
            .catch((err) => console.error("Error when adding a new train:", err));
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
            <h4 className="trainTitle">Add New Train</h4>
            <form onSubmit={addNewTrain} className="trainForm">
                <div className="form-group">
                    <label htmlFor="trainName">Train Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="trainName"
                        placeholder="Enter Train Name"
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
                        placeholder="Enter Train Schedule"
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
                    Add Train
                </button>
            </form>
        </div>
    );
}

export default AddTrain;