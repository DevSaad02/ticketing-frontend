import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../includes/Header";
import Sidebar from "../../includes/Sidebar";
import Footer from "../../includes/Footer";
import { getParkingById } from "../../api/api";
import { updateParking } from "../../api/api";


const EditParking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        place: "",
        vehicleType: "",
        landmark: "",
        address: "",
        slots: ""
    });

    // Fetch parking details when component mounts
    useEffect(() => {
        fetchParkingDetails();
    }, [id]);

    const fetchParkingDetails = async () => {
        try {
            const response = await getParkingById(id);
            if (response.status === 'success') {
                setFormData({
                    place: response.data.place,
                    vehicleType: response.data.vehicle_type,
                    landmark: response.data.landmark,
                    address: response.data.address,
                    slots: response.data.slots || ""
                });
            }
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch parking details:", error);
            setError("Failed to load parking details");
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateParking(id, formData);
            if (response.status === 'success') {
                alert('Parking updated successfully');
                navigate('/parkings');
            }
        } catch (error) {
            console.error("Failed to update parking:", error);
            setError(error.response?.data?.message || "Failed to update parking");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <Header />
            <Sidebar />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Edit Parking</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <a href="/dashboard">Home</a>
                                    </li>
                                    <li className="breadcrumb-item active">Edit Parking</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Edit Parking Details</h3>
                                    </div>
                                    <div className="card-body">
                                        {error && (
                                            <div className="alert alert-danger">{error}</div>
                                        )}
                                        <form onSubmit={handleSubmit}>
                                        <div className="row">

                                            <div className="form-group col-md-6">
                                                <label>Place</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="place"
                                                    value={formData.place}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Vehicle Type</label>
                                                <select
                                                    className="form-control"
                                                    name="vehicleType"
                                                    value={formData.vehicleType}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Select Vehicle Type</option>
                                                    <option value="car">Car</option>
                                                    <option value="bike">Bike</option>
                                                    <option value="both">Both</option>
                                                </select>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Landmark</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="landmark"
                                                    value={formData.landmark}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Number of Slots</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="slots"
                                                    value={formData.slots}
                                                    onChange={handleChange}
                                                    disabled  // Disable slots editing
                                                />
                                                <small className="text-muted">Slots cannot be modified after creation</small>
                                            </div>
                                            <div className="form-group col-md-12">
                                                <label>Address</label>
                                                <textarea
                                                    className="form-control"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    rows="3"
                                                    required
                                                />
                                            </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary">
                                                Update Parking
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default EditParking;