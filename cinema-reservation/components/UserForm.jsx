"use client";

import React from "react";

const UserForm = ({ formData, onChange, onSubmit, isRegister, message }) => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded shadow">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    {isRegister ? "Créer un compte" : "Connexion"}
                </h1>
                <form onSubmit={onSubmit}>
                    {isRegister && (
                        <div className="mb-4">
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Nom d'utilisateur
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={onChange}
                                className="mt-1 block w-full border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={onChange}
                            className="mt-1 block w-full border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={onChange}
                            className="mt-1 block w-full border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-primary transition"
                    >
                        {isRegister ? "S'inscrire" : "Se connecter"}
                    </button>
                </form>
                {message && (
                    <p
                        className={`mt-4 text-center text-sm ${
                            message.includes("réussie") ? "text-green-500" : "text-red-500"
                        }`}
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default UserForm;

