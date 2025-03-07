import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

const Sidebar = () => {
    const role_id = parseInt(useAuthStore((state) => state.role_id), 10);
    const [isParkingMenuOpen, setIsParkingMenuOpen] = useState(false);
    const [isBookingMenuOpen, setIsBookingMenuOpen] = useState(false);
    const [isFeedbackMenuOpen, setIsFeedbackMenuOpen] = useState(false);
    const [isAdminRepliesMenuOpen, setIsAdminRepliesMenuOpen] = useState(false);

    const toggleParkingMenu = (e) => {
        e.preventDefault();
        setIsParkingMenuOpen(!isParkingMenuOpen);
    };

    const toggleBookingMenu = (e) => {
        e.preventDefault();
        setIsBookingMenuOpen(!isBookingMenuOpen);
    };

    const toggleFeedbackMenu = (e) => {
        e.preventDefault();
        setIsFeedbackMenuOpen(!isFeedbackMenuOpen);
    };

    const toggleAdminRepliesMenu = (e) => {
        e.preventDefault();
        setIsAdminRepliesMenuOpen(!isAdminRepliesMenuOpen);
    };

    return (
        <>
            <>
                {/* Main Sidebar Container */}
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    {/* Brand Logo */}
                    <a href="index3.html" className="brand-link">
                        <img
                            src="theme/admin/dist/img/AdminLTELogo.png"
                            alt="AdminLTE Logo"
                            className="brand-image img-circle elevation-3"
                            style={{ opacity: ".8" }}
                        />
                        <span className="brand-text font-weight-light">Ticketing System</span>
                    </a>
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Sidebar user panel (optional) */}
                        <div className="">
                            
                        </div>

                        {/* Sidebar Menu */}
                        <nav className="mt-2">
                            <ul
                                className="nav nav-pills nav-sidebar flex-column"
                                data-widget="treeview"
                                role="menu"
                                data-accordion="false"
                            >
                                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                                {role_id === 1 && (
                                    <>
                                        <li className="nav-item menu-open">
                                            <Link to="/dashboard" className="nav-link active">
                                                <i className="nav-icon fas fa-tachometer-alt" />
                                                <p>
                                                    Dashboard
                                                </p>
                                            </Link>
                                        </li>
                                        <li className={`nav-item ${isParkingMenuOpen ? 'menu-open' : ''}`}>
                                            <a href="#" 
                                            className={`nav-link ${isParkingMenuOpen ? 'active' : ''}`}
                                            onClick={toggleParkingMenu}
                                            >
                                                <i className="nav-icon fas fa-parking" />
                                                <p>
                                                    Parkings
                                                    <i className={`right fas fa-angle-${isParkingMenuOpen ? 'down' : 'left'}`} />
                                                </p>
                                            </a>
                                            <ul className="nav nav-treeview">
                                                <li className="nav-item">
                                                    <Link to="/parkings" className="nav-link">
                                                        <i className="far fa-circle nav-icon" />
                                                        <p>All Parkings</p>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="/add-parking" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                        <p>Add Parking</p>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className={`nav-item ${isAdminRepliesMenuOpen ? 'menu-open' : ''}`}>
                                            <a href="#" 
                                            className={`nav-link ${isAdminRepliesMenuOpen ? 'active' : ''}`}
                                            onClick={toggleAdminRepliesMenu}
                                            >
                                                <i className="nav-icon fas fa-calendar-check" />
                                                <p>
                                                    Admin Replies
                                                    <i className={`right fas fa-angle-${isAdminRepliesMenuOpen ? 'down' : 'left'}`} />
                                                </p>
                                            </a>
                                            <ul className="nav nav-treeview">
                                                <li className="nav-item">
                                                    <Link to="/replies" className="nav-link">
                                                        <i className="far fa-circle nav-icon" />
                                                        <p>All Admin Replies</p>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                    </>
                                )}
                                {role_id === 2 && (
                                    <li className={`nav-item ${isFeedbackMenuOpen ? 'menu-open' : ''}`}>
                                        <a href="#" 
                                        className={`nav-link ${isFeedbackMenuOpen ? 'active' : ''}`}
                                        onClick={toggleFeedbackMenu}
                                        >
                                            <i className="nav-icon fas fa-calendar-check" />
                                            <p>
                                                Feedbacks
                                                <i className={`right fas fa-angle-${isFeedbackMenuOpen ? 'down' : 'left'}`} />
                                            </p>
                                        </a>
                                        <ul className="nav nav-treeview">
                                            <li className="nav-item">
                                                <Link to="/feedback" className="nav-link">
                                                    <i className="far fa-circle nav-icon" />
                                                    <p>All Feedbacks</p>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                )}
                                <li className={`nav-item ${isBookingMenuOpen ? 'menu-open' : ''}`}>
                                    <a href="#" 
                                    className={`nav-link ${isBookingMenuOpen ? 'active' : ''}`}
                                    onClick={toggleBookingMenu}
                                    >
                                        <i className="nav-icon fas fa-calendar-check" />
                                        <p>
                                            Bookings
                                            <i className={`right fas fa-angle-${isBookingMenuOpen ? 'down' : 'left'}`} />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to="/bookings" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>All Bookings</p>
                                            </Link>
                                        </li>
                                {role_id === 2 && (
                                        <li className="nav-item">
                                            <Link to="/add-booking" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                                <p>Add Booking</p>
                                            </Link>
                                        </li>
                                 )}
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                        {/* /.sidebar-menu */}
                    </div>
                    {/* /.sidebar */}
                </aside>
            </>

        </>
    )
}

export default Sidebar;