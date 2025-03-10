import axios from "axios";
import { useAuthStore } from "../store/AuthStore";

const API_URL = "http://localhost:8000";

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log('error',error);
        if (error.response) {
            // Check specifically for token-related errors
            if (error.response.status === 401 && 
                (error.response.data?.message === 'Invalid or expired token' || 
                 error.response.data?.message === 'No token provided')) {
                 // Logout using Zustand
                 useAuthStore.setState({ token: null });
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
// Get analytics
export const getAnalytics = async (id) => {
    const response = await api.get("/analytics");
    return response.data;
}
// Add parking api call
export const addParking = async (data) => {
    const response = await api.post("/parking", data);
    return response.data;
}   
// Get parkings list 
export const getParkings = async () => {
    const response = await api.get("/parking");
    return response.data;
}
// Get parking by id
export const getParkingById = async (id) => {
    const response = await api.get(`/parking/${id}`);
    return response.data;
}
// Update parking data
export const updateParking = async (id, data) => {
    const response = await api.put(`/parking/${id}`, data);
    return response.data;
}
//Delete parking
export const deleteParking = async (id) => {
    const response = await api.delete(`/parking/${id}`);
    return response.data;
}
// Fetch slots by parking id
export const getSlotsByParkingId = async (parkingId) => {
    const response = await api.get(`/parking/${parkingId}/slots`);
    return response.data;
};
// Get bookings
export const getBookings = async () => {
    const response = await api.get("/booking");
    return response.data;
}  
// Add Booking
export const addBooking = async (data) => {
    const response = await api.post("/booking", data);
    return response.data;
}  
// Get available parking slots
export const getAvailableSlots = async (data) => {
    const response = await api.post("/booking/available-slots", data);
    return response.data;
}
// Cancel booking
export const cancelBooking = async (id) => {
    const response = await api.put(`/booking/${id}/cancel`);
    return response.data;
}
// Add feedback
export const addFeedback = async (data) => {
    const response = await api.post("/feedback", data);
    return response.data;
}

// Get feedback
export const getFeedback = async () => {
    const response = await api.get("/feedback");
    return response.data;
}

// Get feedback
export const getFeedbacks = async () => {
    const response = await api.get("/feedback/admin");
    return response.data;
}

// Add reply
export const addReply = async (data) => {
    const response = await api.post("/feedback/reply", data);
    return response.data;
}

