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
                //  useAuthStore.setState({ token: null });
                // window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;

export const addParking = async (data) => {
    const response = await api.post("/parking", data);
    return response.data;
}   

export const getParkings = async () => {
    const response = await api.get("/parking");
    return response.data;
}
export const getParkingById = async (id) => {
    const response = await api.get(`/parking/${id}`);
    return response.data;
}
export const updateParking = async (id, data) => {
    const response = await api.put(`/parking/${id}`, data);
    return response.data;
}
export const deleteParking = async (id) => {
    const response = await api.delete(`/parking/${id}`);
    return response.data;
}

export const getSlotsByParkingId = async (parkingId) => {
    const response = await api.get(`/parking/${parkingId}/slots`);
    return response.data;
};

export const addBooking = async (data) => {
    const response = await api.post("/booking", data);
    return response.data;
}  

export const getAvailableSlots = async (data) => {
    const response = await api.post("/booking/available-slots", data);
    console.log('response', response);
    // return response.data;
}
export const cancelBooking = async (id) => {
    const response = await api.put(`/booking/${id}/cancel`);
    return response.data;
}