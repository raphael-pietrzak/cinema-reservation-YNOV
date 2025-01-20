import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Change selon ton backend

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
    return response.data;
};


export const loginFakeUser = async (userData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userData.email === "admin@admin.com" && userData.password === "admin") {
                resolve({success : true, token: "fake"});
            }
            reject({success : false, message: "Email ou mot de passe incorrect."});
        });
    });
}