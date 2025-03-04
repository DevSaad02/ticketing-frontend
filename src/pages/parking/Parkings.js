import React, { useState, useEffect } from "react";
import Header from "../../includes/Header";
import Sidebar from "../../includes/Sidebar";
import Footer from "../../includes/Footer";
import { Link } from "react-router-dom";
import { getParkings } from "../../api/api";
import { deleteParking } from "../../api/api";

const Parkings = () => {
    const [parkings, setParkings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const handleDelete = async (id) => {
        try {
            const response = await deleteParking(id);
            if (response.status === 'success') {
                fetchParkings();
            }
        } catch (error) {
            console.error("Failed to delete parking:", error);
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
                                <h1>Parkings</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li className="breadcrumb-item active">Parkings</li>
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
                                        <h3 className="card-title">Parkings List</h3>
                                        <div className="float-right">
                                            <Link to="/add-parking" className="btn btn-primary">
                                                Add New Parking
                                            </Link>
                                        </div>
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
                                                        <th>Place</th>
                                                        <th>Vehicle</th>
                                                        <th>Landmark</th>
                                                        <th>Address</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {parkings.length === 0 ? (
                                                        <tr>
                                                            <td colSpan="5" className="text-center">
                                                                No parkings found
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        parkings.map((parking) => (
                                                            <tr key={parking.id}>
                                                                <td>{parking.place}</td>
                                                                <td>{parking.vehicle_type}</td>
                                                                <td>{parking.landmark}</td>
                                                                <td>{parking.address}</td>
                                                                <td>
                                                                    <Link 
                                                                        to={`/parking/${parking.id}`}
                                                                        className="btn btn-info btn-sm mr-1"
                                                                    >
                                                                        <i className="fas fa-eye"></i>
                                                                    </Link>
                                                                    <Link 
                                                                        to={`/edit-parking/${parking.id}`}
                                                                        className="btn btn-warning btn-sm mr-1"
                                                                    >
                                                                        <i className="fas fa-edit"></i>
                                                                    </Link>
                                                                    <button 
                                                                        className="btn btn-danger btn-sm"
                                                                        onClick={() => handleDelete(parking.id)}
                                                                    >
                                                                        <i className="fas fa-trash"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    )}
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th>Place</th>
                                                        <th>Vehicle</th>
                                                        <th>Landmark</th>
                                                        <th>Address</th>
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

export default Parkings;