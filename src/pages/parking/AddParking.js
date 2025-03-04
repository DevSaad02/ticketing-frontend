import React from "react";
import { useState } from "react";
import Header from "../../includes/Header";
import Sidebar from "../../includes/Sidebar";
import Footer from "../../includes/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addParking } from "../../api/api";
import { useAuthStore } from "../../store/AuthStore";
const AddParking = () => {
    const token = useAuthStore.getState().token;
    console.log("Token being sent:", token);
    // State to manage form inputs
    const [formData, setFormData] = useState({
        place: "",
        vehicleType: "",
        landmark: "",
        slots: "",
        address: ""
    });

    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addParking(formData); // Send data to API
            navigate("/parkings"); // Redirect to parkings page after successful submission
        } catch (error) {
            console.error("Parking addition failed", error);
        }
    };
    return (
        <>
            <Header />
            <Sidebar />
            <>
                {/* Content Wrapper. Contains page content */}
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Add Parking</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <Link to="/parkings" className="breadcrumb-item">Parking</Link>
                                        <li className="breadcrumb-item active">Add Parking</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        {/* /.container-fluid */}
                    </section>
                    {/* Main content */}
                    <section className="content">
                        <div className="container-fluid">
                            {/* left column */}
                            <div className="col-md-12">
                                {/* general form elements */}
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Add Parking</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form onSubmit={handleSubmit}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="place">Place</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="place"
                                                        name="place"
                                                        placeholder="Enter Place"
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="vehicleType">Vehicle Type</label>
                                                    <select className="form-control" id="vehicleType" name="vehicleType" onChange={handleChange} required>
                                                        <option value="">Select Vehicle Type</option>
                                                        <option value="car">Car</option>
                                                        <option value="bike">Bike</option>
                                                    </select>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="landmark">Landmark</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="landmark"
                                                        name="landmark"
                                                        placeholder="Enter Landmark"
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="slots">Slots</label>
                                                    <input type="number" min="1" className="form-control" id="slots" name="slots" placeholder="Enter Slots" onChange={handleChange} required    />
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label htmlFor="address">Address</label>
                                                    <textarea
                                                        className="form-control"
                                                        id="address"
                                                        name="address"
                                                        rows="3"
                                                        placeholder="Enter Address"
                                                        onChange={handleChange}
                                                        required
                                                    ></textarea>
                                                </div>

                                            </div>

                                        </div>
                                        {/* /.card-body */}
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-primary">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                {/* /.card */}

                            </div>
                        </div>
                        {/* /.container-fluid */}
                    </section>
                    {/* /.content */}
                </div>
                {/* /.content-wrapper */}
            </>

            <Footer />
        </>
    )
}

export default AddParking;