import React, { useState, useEffect } from "react";
import Header from "../../includes/Header";
import Sidebar from "../../includes/Sidebar";
import Footer from "../../includes/Footer";
import { Link } from "react-router-dom";
import { getBookings, cancelBooking } from "../../api/api";
import { useAuthStore } from "../../store/AuthStore";

const Bookings = () => {
    const role_id = parseInt(useAuthStore((state) => state.role_id), 10);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await getBookings();
            if (response.status === 'success') {
                setBookings(response.data);
            }
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch bookings:", error);
            setError("Failed to load bookings");
            setLoading(false);
        }
    };

    const handleCancelBooking = async (id) => {
        try {
            await cancelBooking(id);
            fetchBookings(); // Refresh the bookings list after cancellation
        } catch (error) {
            console.error("Failed to cancel booking:", error);
            setError("Failed to cancel booking");
        }
    };

    return (
        <>
            <Header />
            <Sidebar />
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Bookings</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li className="breadcrumb-item active">Bookings</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    {/* /.container-fluid */}
                </section>
                {/* Main content */}
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                {/* /.card */}
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Bookings List</h3>
                    {role_id === 2 && (

                                        <div className="float-right">
                                            <Link to="/add-booking" className="btn btn-primary">
                                                Add New Booking
                                            </Link>
                                        </div>
                    )}
                                    </div>
                                    {/* /.card-header */}
                                    <div className="card-body">
                                        {loading ? (
                                            <div className="text-center">Loading...</div>
                                        ) : error ? (
                                            <div className="alert alert-danger">{error}</div>
                                        ) : (
                                            <table
                                                id="example1"
                                                className="table table-bordered table-striped"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>Owner</th>
                                                        <th>Vehicle Name</th>
                                                        <th>Vehicle Type</th>
                                                        <th>Registration Number</th>
                                                        <th>Phone</th>
                                                        <th>Date</th>
                                                        <th>Time</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {bookings.length === 0 ? (
                                                        <tr>
                                                            <td colSpan="8" className="text-center">
                                                                No bookings found
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        bookings.map((booking) => (
                                                            <tr key={booking.id}>
                                                                <td>{booking.vehicle_owner}</td>
                                                                <td>{booking.vehicle_name}</td>
                                                                <td>{booking.vehicle_type}</td>
                                                                <td>{booking.vehicle_registration_number}</td>
                                                                <td>{booking.contact_number}</td>
                                                                <td>{booking.date}</td>
                                                                <td>{booking.start_time} - {booking.end_time}</td>
                                                                <td>
                                                                    {booking.status !== 'canceled' ? (
                                                                        <button
                                                                            className="btn btn-danger btn-sm"
                                                                            onClick={() => handleCancelBooking(booking.id)}
                                                                        >
                                                                            Cancel
                                                                        </button>
                                                                    ) : (
                                                                        <span>Canceled</span>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))
                                                    )}
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th>Owner</th>
                                                        <th>Vehicle Name</th>
                                                        <th>Vehicle Type</th>
                                                        <th>Registration Number</th>
                                                        <th>Phone</th>
                                                        <th>Date</th>
                                                        <th>Time</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        )}
                                    </div>
                                    {/* /.card-body */}
                                </div>
                                {/* /.card */}
                            </div>
                            {/* /.col */}
                        </div>
                        {/* /.row */}
                    </div>
                    {/* /.container-fluid */}
                </section>
                {/* /.content */}
            </div>
            {/* /.content-wrapper */}

            <Footer />
        </>
    )
}

export default Bookings;