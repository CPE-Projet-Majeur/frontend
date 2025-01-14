/**
 * @author Thibault Berthet
 */

import React, { useState } from "react";
import { login, fetchUserById, manageCookies } from "../services/userService";
import { useDispatch } from "react-redux";
import { update_user } from "../slices/userSlice";
import { NavLink, useNavigate } from "react-router-dom";
import IUser from "../types/IUser";
import Ilogin from "../types/Ilogin";
import styles from "./CSS/signin.module.css";

export const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            // Première requête : Authentification
            const userLogin : Ilogin = await login(username, password);
            console.log("Données de connexion récupérées :", userLogin);
            console.log(`Utilisateur authentifié avec l'ID : ${userLogin.user.id}`);

            // // Deuxième requête : Récupération des informations utilisateur
            // const user: IUser = await fetchUserById(userLogin.user.id);
            // console.log("Données utilisateur récupérées :", user);
            const user : IUser = userLogin.user;
            // Gestion du Token, mise dans les cookies
            manageCookies(userLogin.token);

            // Mise à jour du user dans le store Redux
            dispatch(update_user({ user }));

            console.log("User connected :", user);
            navigate("/profile");
        } catch (error: any) {
            setError("Wrong Username or password");
            console.error("Error :", error);
        }
    };

    return (
        <div className={styles["login-container"]}>
            <div className={styles["login-card"]}>
                <h1>log In</h1>
                <form onSubmit={handleLogin}>
                    <div className={styles["input-container"]}>
                        <label htmlFor="username">Username :</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="password">Password :</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className={styles["error-message"]}>{error}</p>}
                    <button type="submit" className={styles["login-button"]}>
                        Log In
                    </button>
                </form>
                <p className={styles["signup-link"]}>
                    You don't have an account ? {" "}
                    <NavLink to="/signup">Create an account</NavLink>
                </p>
            </div>
        </div>
    );
};
