import React, { useState, useEffect } from "react";
import Header from "../../includes/Header";
import Sidebar from "../../includes/Sidebar";
import Footer from "../../includes/Footer";
import { getAnalytics } from "../../api/api";

const Dashboard = () => {
    const [analytics, setAnalytics] = useState({
        total_parkings: 0,
        total_slots: 0,
        total_users: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch analytics when component mounts
    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const response = await getAnalytics();
            console.log(response);
            setAnalytics(response);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch Analytics:", error);
            setError("Failed to load Analytics");
            setLoading(false);
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
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Dashboard</h1>
                                </div>
                                {/* /.col */}
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item">
                                            <a href="#">Home</a>
                                        </li>
                                        <li className="breadcrumb-item active">Dashboard v1</li>
                                    </ol>
                                </div>
                                {/* /.col */}
                            </div>
                            {/* /.row */}
                        </div>
                        {/* /.container-fluid */}
                    </div>
                    {/* /.content-header */}
                    {/* Main content */}
                    <section className="content">
                        <div className="container-fluid">
                            {/* Small boxes (Stat box) */}
                            <div className="row">
                                <div className="col-md-4">
                                    {/* small box */}
                                    <div className="small-box bg-info">
                                        <div className="inner">
                                            <h3>{analytics.total_parkings}</h3>
                                            <p>Total Parkings</p>
                                        </div>
                                        <div className="icon">
                                            <i className="fas fa-car" />
                                        </div>
                                        <a href="#" className="small-box-footer">
                                            More info <i className="fas fa-arrow-circle-right" />
                                        </a>
                                    </div>
                                </div>
                                {/* ./col */}
                                <div className="col-md-4">
                                    {/* small box */}
                                    <div className="small-box bg-success">
                                        <div className="inner">
                                            <h3>{analytics.total_slots}</h3>
                                            <p>Total Slots</p>
                                        </div>
                                        <div className="icon">
                                            <i className="ion ion-grid" />
                                        </div>
                                        <a href="#" className="small-box-footer">
                                            More info <i className="fas fa-arrow-circle-right" />
                                        </a>
                                    </div>
                                </div>
                                {/* ./col */}
                                <div className="col-md-4">
                                    {/* small box */}
                                    <div className="small-box bg-warning">
                                        <div className="inner">
                                            <h3>{analytics.total_users}</h3>
                                            <p>Total Users</p>
                                        </div>
                                        <div className="icon">
                                            <i className="ion ion-person-add" />
                                        </div>
                                        <a href="#" className="small-box-footer">
                                            More info <i className="fas fa-arrow-circle-right" />
                                        </a>
                                    </div>
                                </div>
                                {/* ./col */}
                            </div>
                            {/* /.row */}
                            {/* Main row */}
                            <div className="row">
                                {/* Left col */}
                                <section className="col-lg-7 connectedSortable">

                                </section>
                                {/* /.Left col */}

                            </div>
                            {/* /.row (main row) */}
                        </div>
                        {/* /.container-fluid */}
                    </section>
                    {/* /.content */}
                </div>
            </>

            <Footer />
        </>
    )
}

export default Dashboard;