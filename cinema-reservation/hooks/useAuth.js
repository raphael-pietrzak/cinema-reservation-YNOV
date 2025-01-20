"use client";
// hooks/useAuth.js
import { useEffect, useState } from "react";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Vérifier la présence de l'authToken dans localStorage
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return { isAuthenticated };
};

export default useAuth;
