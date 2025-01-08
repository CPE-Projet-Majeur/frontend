/**
 * @author Thibault Berthet
 */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { update_user } from "../slices/userSlice";
import { register } from "../services/userService";
import styles from "./CSS/signup.module.css";
import Cookies from 'js-cookie';

import IUser from '../types/IUser';

export const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, setLogin] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        //event.preventDefault();
        setError(null);

        // if (!login.trim() || !surName.trim() || !lastName.trim() || !email.trim()) {
        //     alert("All the fields are required");
        //     return;
        // }

        if (password !== passwordConfirmation) {
            alert("The passwords provided aren't the same");
            return;
        }

        const user: IUser = {
            id: -1,  // Cas ou le user n'a pas encore d'ID attribué
            login,
            pwd :password,
            firstName,
            lastName,
            email,
        };

        try {
            const createdUser = await register(user);

            // Mise de l'id du user dans les cookies en tant que token
            // À terme le token sera généré par le serveur pour l'aspect sécuritaire
            Cookies.set('user', createdUser.id.toString(), { expires: 7, path: '/' }); 
            console.log("Utilisateur créé avec succès :", createdUser);

            // Mise à jour du store Redux avec le nouvel utilisateur
            dispatch(update_user({ user: createdUser }));

            // Redirection vers la page du profile
            navigate("/profile");
        } catch (error: any) {
            setError("Sign up error " + error.message);
            console.error(error);
        }
    };

    return (
        <div className={styles["signup-container"]}>
            <div className={styles["signup-card"]}>
                <h1>Create an account</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles["input-container"]}>
                        <label htmlFor="login">Username :</label>
                        <input
                            type="text"
                            id="login"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="surName">Name :</label>
                        <input
                            type="text"
                            id="surName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="lastName">Surname :</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="email">Email :</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <div className={styles["input-container"]}>
                        <label htmlFor="confirmPassword">Confirm password :</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                        />
                    </div>
                    { password !== passwordConfirmation && (
                        <p className={styles["error-message"]}>The passords provided aren't the same</p>
                    )}
                    {error && <p className={styles["error-global"]}>{error}</p>}
                    <button type="submit" className={styles["signup-button"]}>
                        Create an account
                    </button>
                </form>
            </div>
        </div>
    );
};
