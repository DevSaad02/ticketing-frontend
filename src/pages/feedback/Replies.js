import React, { useState, useEffect } from 'react';
import { getFeedbacks, addReply } from '../../api/api';
import Header from '../../includes/Header';
import Sidebar from '../../includes/Sidebar';
import Footer from '../../includes/Footer';

const Replies = () => {
    const [feedbackList, setFeedbackList] = useState([]);
    const [reply, setReply] = useState('');
    const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        try {
            const response = await getFeedbacks();
            if (response.status === 'success') {
                setFeedbackList(response.data);
            } else {
                console.error('Error fetching feedback:', response.message);
            }
        } catch (error) {
            console.error('Error fetching feedback:', error);
        }
    };

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        try {
            await addReply({ feedback_id: selectedFeedbackId, reply });
            setReply('');
            setSelectedFeedbackId(null);
            fetchFeedback();
        } catch (error) {
            console.error('Error adding reply:', error);
        }
    };

    return (
        <div className="wrapper">
            <Header />
            <Sidebar />
            <div className="content-wrapper">
                <div className="container mt-5">
                    <h1 className="mb-4">User Feedback</h1>
                    <div>
                        <h2 className="mb-4">Feedback List</h2>
                        {Array.isArray(feedbackList) && feedbackList.length > 0 ? (
                            feedbackList.map((item) => (
                                <div key={item.id} className="card mb-3">
                                    <div className="card-body">
                                        <p className="card-text"><strong>User:</strong> {item.message}</p>
                                        {item.adminReply && <p className="card-text"><strong>Admin Reply:</strong> {item.adminReply}</p>}
                                        <button
                                            className="btn btn-secondary mt-2"
                                            onClick={() => setSelectedFeedbackId(item.id)}
                                        >
                                            Reply
                                        </button>
                                        {selectedFeedbackId === item.id && (
                                            <form onSubmit={handleReplySubmit} className="mt-3">
                                                <div className="form-group">
                                                    <textarea
                                                        className="form-control"
                                                        value={reply}
                                                        onChange={(e) => setReply(e.target.value)}
                                                        placeholder="Enter your reply"
                                                        required
                                                    />
                                                </div>
                                                <button type="submit" className="btn btn-primary">Submit Reply</button>
                                            </form>
                                        )}
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

export default Replies;
