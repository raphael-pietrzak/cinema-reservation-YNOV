"use client";

import React, { useState } from "react";
import UserForm from "@/components/UserForm";
import { registerUser } from "@/services/sessionService";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
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
            await registerUser(formData);
            setMessage("Inscription réussie ! Vous pouvez maintenant vous connecter.");
        } catch (error) {
            setMessage(error.response?.data?.message || "Erreur d'inscription.");
        }
    };

    return (
        <UserForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isRegister={true}
            message={message}
        />
    );
};

export default Register;
