/**
 * @author Thibault Berthet
 */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { update_user } from "../slices/userSlice";
import { register, manageCookies } from "../services/userService";
import styles from "./CSS/signup.module.css";

import IUser from '../types/IUser';
import CarouselComponent from "../components/signup/CarouselComponent";
//import Grimoire from "./Grimoire"
import EHouses from "../types/EHouses";

export const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, setLogin] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [house, setHouse] = useState(EHouses.GRYFFINDOR);
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    // Dans l'idéal il faudra aussi faire une garde sur les login (username) quoi doivent être uniques
    let checkPassword = () : boolean => {
        if (password.length < 8) {
            alert("The password must be at least 8 characters long");
            return false;
          }
          
        else if (!/\d/.test(password)) {
            alert("The password must contain at least one number");
            return false;
          }
          
        else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            alert("The password must contain at least one special character");
            return false;
          }   
        
        return  true;      

    }

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();

        // Gestion des critères d'acceptation du mot de passe
        if (!checkPassword()){return;}

        const user: IUser = {
            login,
            password : password.toString(),
            firstName,
            lastName,
            email,
            house,
            account : 0,
            wins: 0,
            defeats : 0,
            roleList : [],
        };

        // Contact de la backend et gestion des erreurs
        try {
            const registration = await register(user);
            const token = registration.token;
            user.id = registration.user.id;
            
            if (!token) {
                throw new Error("Token not found in the response");
            }
            // Mise du token du user dans les cookies #securité
            manageCookies(token);
            console.log("Utilisateur créé avec succès :", user);

            // Mise à jour du store Redux avec le nouvel utilisateur
            dispatch(update_user({ user: user }));

            // Redirection vers la page du profile
            navigate("/profile");
        } catch (error: any) {
            console.error("Sign up error " + error.message);
        }
    };

    // Gestion des changements de slides actives du caroussel pour attribuer une maison à un user
    const handleSlideChange = (index: number, activeItem: { title: EHouses, description: string }) => {
    console.log(`Slide actif : ${index}, Titre : ${activeItem.title}`);
    setHouse(activeItem.title);
    };

    return (
        <div className={styles["signup-container"]}>
            <div className={styles["signup-card"]}>
                <h1>Create an account</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles["input-container"]}>
                    <CarouselComponent onSlideChange={handleSlideChange}/>
                    
                    </div>
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
                    { password !== passwordConfirmation || password === "" || passwordConfirmation === "" ? (
                        <p className={styles["error-message"]}>Please provide the same passwords</p>
                    ) : 
                    <button type="submit" className={styles["signup-button"]}>
                        Create an account
                    </button>
                    }
                </form>
            </div>
        </div>
    );
};
