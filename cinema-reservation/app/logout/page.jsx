"use client";

import React from "react";

export default function LoginPage() {
    localStorage.removeItem("authToken");
    window.location.reload();
    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-center">
                Vous êtes maintenant déconnecté.
            </h1>
        </div>
    );
}
