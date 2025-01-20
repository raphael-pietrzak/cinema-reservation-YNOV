"use client";

import React, { useState } from "react";
import UserForm from "@/components/UserForm";
import { loginUser, loginFakeUser } from "@/services/sessionService";
import useAuth from "../hooks/useAuth"; // Import du hook personnalisé
import { useRouter } from "next/router";

const Login = () => {
    const { isAuthenticated } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginFakeUser(formData);

            if(response?.success) {
                localStorage.setItem("authToken", response.token);
                setMessage("Connexion réussie!");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }

        } catch (error) {
            setMessage(error.response?.data?.message || "Erreur de connexion.");
        }
    };

    return (
        <UserForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isRegister={false}
            message={message}
        />
    );
};

export default Login;
