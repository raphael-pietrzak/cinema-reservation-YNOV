"use client";

import React from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

const Navbar = () => {
    const { isAuthenticated } = useAuth();

    return (
        <nav className="bg-blue-500 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">
                    <Link href="/">🎥 Cinema Reservation</Link>
                </h1>
                <div className="space-x-4">
                    <Link href="/" className="hover:underline">
                        Accueil
                    </Link>
                    <Link href="/login" className="hover:underline" hidden={isAuthenticated}>
                        Connexion
                    </Link>
                    <Link href="/register" className="hover:underline" hidden={isAuthenticated}>
                        Inscription
                    </Link>
                    <Link href="/movies" className="hover:underline" hidden={!isAuthenticated}>
                        Films
                    </Link>
                    <Link href="/sessions" className="hover:underline" hidden={!isAuthenticated}>
                        Sessions
                    </Link>
                    <Link href="/logout" className="hover:underline" hidden={!isAuthenticated}>
                        Déconnexion
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
