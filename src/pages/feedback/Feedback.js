import React, { useState, useEffect } from 'react';
import { addFeedback, getFeedback } from '../../api/api';
import Header from '../../includes/Header';
import Sidebar from '../../includes/Sidebar';
import Footer from '../../includes/Footer';

const Feedback = () => {
    const [feedback, setFeedback] = useState('');
    const [feedbackList, setFeedbackList] = useState([]);

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        try {
            const response = await getFeedback();
            if (response.status === 'success') {
                setFeedbackList(response.data);
            } else {
                console.error('Error fetching feedback:', response.message);
            }
        } catch (error) {
            console.error('Error fetching feedback:', error);
        }
    };

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        try {
            await addFeedback({ feedback });
            setFeedback('');
            fetchFeedback();
        } catch (error) {
            console.error('Error adding feedback:', error);
        }
    };

    return (
        <div className="wrapper">
            <Header />
            <Sidebar />
            <div className="content-wrapper">
                <div className="container mt-5">
                    <h1 className="mb-4">Feedback</h1>
                    <form onSubmit={handleFeedbackSubmit} className="mb-4">
                        <div className="form-group">
                            <textarea
                                className="form-control"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                placeholder="Enter your feedback"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit Feedback</button>
                    </form>
                    <div>
                        <h2 className="mb-4">Feedback List</h2>
                        {Array.isArray(feedbackList) && feedbackList.length > 0 ? (
                            feedbackList.map((item) => (
                                <div key={item.id} className="card mb-3">
                                    <div className="card-body">
                                        <p className="card-text">{item.message}</p>
                                        {item.adminReply && <p className="card-text"><strong>Admin Reply:</strong> {item.adminReply}</p>}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No feedback available.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Feedback;
