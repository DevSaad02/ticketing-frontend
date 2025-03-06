import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addBooking, getParkings, getAvailableSlots } from "../../api/api";
import Header from "../../includes/Header";
import Sidebar from "../../includes/Sidebar";
import Footer from "../../includes/Footer";

const AddBooking = () => {
    // State to manage form inputs
    const [formData, setFormData] = useState({
        slot_id: "",
        vehicle_type: "",
        vehicle_registration_number: "",
        vehicle_owner: "",
        contact_number: "",
        date: "",
        start_time: "",
        end_time: "",
    });

    const navigate = useNavigate();
    const [parkings, setParkings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Add selected slot state
    const [selectedSlot, setSelectedSlot] = useState(null);

    // Add these new state variables
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [slotError, setSlotError] = useState(null);
    const [timeError, setTimeError] = useState(null);

    // Fetch parkings when component mounts
    useEffect(() => {
        fetchParkings();
    }, []);

    const fetchParkings = async () => {
        try {
            const response = await getParkings();
            if (response.status === 'success') {
                setParkings(response.data);
            }
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch parkings:", error);
            setError("Failed to load parkings");
            setLoading(false);
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validate start time and end time
        if (name === 'start_time' || name === 'end_time') {
            const startTime = name === 'start_time' ? value : formData.start_time;
            const endTime = name === 'end_time' ? value : formData.end_time;

            if (startTime && endTime && startTime >= endTime) {
                setTimeError("End time must be greater than start time.");
            } else {
                setTimeError(null);
            }
        }
    };

    // Modify handleChange to include slot selection
    const handleSlotSelect = (slot) => {
        setSelectedSlot(slot);
        setFormData({ ...formData, slot_id: slot.id });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSlotError(null);
        setTimeError(null);

        if (!selectedSlot) {
            setSlotError("Please select a slot.");
            return;
        }

        try {
            await addBooking(formData); // Send data to API
            navigate("/bookings"); // Redirect to Bookings page after successful submission
        } catch (error) {
            console.error("Booking addition failed", error);
        }
    };

    // Add the checkRequiredFields function
    const checkRequiredFields = () => {
        return formData.parking_id && 
               formData.date && 
               formData.start_time && 
               formData.end_time;
    };

    // Add useEffect for fetching available slots
    useEffect(() => {
        const fetchAvailableSlots = async () => {
            if (!checkRequiredFields()) return;

            setLoadingSlots(true);
            setSlotError(null);

            try {
                const response = await getAvailableSlots({
                    parking_id: formData.parking_id,
                    date: formData.date,
                    start_time: formData.start_time,
                    end_time: formData.end_time
                });

                if (response.status === 'success') {
                    setAvailableSlots(response.data);
                } else {
                    setSlotError('Failed to fetch available slots');
                }
            } catch (error) {
                console.error('Error fetching slots:', error);
                setSlotError('Error loading available slots');
            } finally {
                setLoadingSlots(false);
            }
        };

        fetchAvailableSlots();
    }, [formData.parking_id, formData.date, formData.start_time, formData.end_time]);

    // Move the styles inside the component
    const styles = `
        .slot-card {
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .slot-card.available {
            background-color: #28a745;
            color: white;
        }

        .slot-card.occupied {
            background-color: #dc3545;
            color: white;
            cursor: not-allowed;
            opacity: 0.7;
        }

        .slot-card.selected {
            background-color: #007bff;
            color: white;
            transform: scale(1.05);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }

        .slot-card:hover:not(.occupied) {
            transform: translateY(-5px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .slot-content {
            width: 100%;
        }

        .slot-content i {
            font-size: 24px;
            margin-bottom: 8px;
        }

        .slot-number {
            font-weight: bold;
            margin-bottom: 4px;
        }

        .slot-status {
            font-size: 12px;
            text-transform: capitalize;
        }

        .slot-legend {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .slot-legend .badge {
            padding: 8px 12px;
            font-size: 14px;
        }
    `;

    // Add styles to document
    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
        return () => {
            document.head.removeChild(styleSheet);
        };
    }, []);

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
                                    <h1>Add Booking</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <Link to="/Bookings" className="breadcrumb-item">Booking</Link>
                                        <li className="breadcrumb-item active">Add Booking</li>
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
                                        <h3 className="card-title">Add Booking</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form onSubmit={handleSubmit}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="parking_id">Select Parking</label>
                                                    <select
                                                        className="form-control"
                                                        id="parking_id"
                                                        name="parking_id"
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option value="">Select Parking Location</option>
                                                        {loading ? (
                                                            <option disabled>Loading parkings...</option>
                                                        ) : error ? (
                                                            <option disabled>Error loading parkings</option>
                                                        ) : (
                                                            parkings.map((parking) => (
                                                                <option key={parking.id} value={parking.id}>
                                                                    {parking.place} - {parking.vehicle_type}
                                                                </option>
                                                            ))
                                                        )}
                                                    </select>
                                                    {error && <div className="text-danger">{error}</div>}
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="vehicle_name">Vehicle Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="vehicle_name"
                                                        name="vehicle_name"
                                                        placeholder="Enter Vehicle Name"
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="vehicle_type">Vehicle Type</label>
                                                    <select className="form-control" id="vehicle_type" name="vehicle_type" onChange={handleChange} required>
                                                        <option value="">Select Vehicle Type</option>
                                                        <option value="car">Car</option>
                                                        <option value="bike">Bike</option>
                                                    </select>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="vehicle_registration_number">Registration Number</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="vehicle_registration_number"
                                                        name="vehicle_registration_number"
                                                        placeholder="Enter Registration Number"
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="vehicle_owner">Owner Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="vehicle_owner"
                                                        name="vehicle_owner"
                                                        placeholder="Enter Owner Name"
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="contact_number">Phone Number</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="contact_number"
                                                        name="contact_number"
                                                        placeholder="Enter Registration Number"
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="date">Date</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="date"
                                                        name="date"
                                                        placeholder="Enter Registration Number"
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="start_time">Start Time</label>
                                                    <input
                                                        type="time"
                                                        className="form-control"
                                                        id="start_time"
                                                        name="start_time"
                                                        placeholder="Enter Start Time"
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="end_time">End Time</label>
                                                    <input
                                                        type="time"
                                                        className="form-control"
                                                        id="end_time"
                                                        name="end_time"
                                                        placeholder="Enter End Time"
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            {/* Replace the slots dropdown with this new interface */}
                                            <div className="col-12 mt-4">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h3 className="card-title">
                                                            {!checkRequiredFields()
                                                                ? "Fill in parking, date, and time to view available slots"
                                                                : "Available Parking Slots"}
                                                        </h3>
                                                    </div>
                                                    <div className="card-body">
                                                        {loadingSlots ? (
                                                            <div className="text-center py-4">
                                                                <div className="spinner-border text-primary" role="status">
                                                                    <span className="sr-only">Loading...</span>
                                                                </div>
                                                                <p className="mt-2">Loading available slots...</p>
                                                            </div>
                                                        ) : slotError ? (
                                                            <div className="alert alert-danger">{slotError}</div>
                                                        ) : !checkRequiredFields() ? (
                                                            <div className="alert alert-info">
                                                                <i className="fas fa-info-circle mr-2"></i>
                                                                Please select parking location, date, and time to view available slots
                                                            </div>
                                                        ) : availableSlots.length === 0 ? (
                                                            <div className="alert alert-warning">
                                                                <i className="fas fa-exclamation-triangle mr-2"></i>
                                                                No slots available for the selected time period
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <div className="slot-legend mb-3">
                                                                    <span className="badge badge-success mr-2">Available</span>
                                                                    <span className="badge badge-danger mr-2">Occupied</span>
                                                                    <span className="badge badge-primary">Selected</span>
                                                                </div>
                                                                <div className="row">
                                                                    {availableSlots.map((slot) => (
                                                                        <div key={slot.id} className="col-md-2 col-sm-4 col-6 mb-3">
                                                                            <div
                                                                                className={`slot-card ${selectedSlot?.id === slot.id
                                                                                        ? 'selected'
                                                                                        : slot.slot_status === 'available'
                                                                                            ? 'available'
                                                                                            : 'occupied'
                                                                                    }`}
                                                                                onClick={() => {
                                                                                    if (slot.slot_status === 'available') {
                                                                                        handleSlotSelect(slot);
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <div className="slot-content">
                                                                                    <i className="fas fa-car mb-2"></i>
                                                                                    <div className="slot-number">Slot #{slot.system_id}</div>
                                                                                    <div className="slot-status">{slot.slot_status}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            {timeError && <div className="alert alert-danger">{timeError}</div>}
                                        </div>
                                        {/* /.card-body */}
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-primary">
                                                Submit
                                            </button>
                                            <Link to="/bookings" className="btn btn-secondary ml-2">
                                                Back
                                            </Link>
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

export default AddBooking;