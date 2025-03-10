import axios from "axios";

const API_URL = "http://localhost:8000";

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data;
};
export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/login`, userData, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data;
};