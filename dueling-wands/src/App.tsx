// Import des modules
import { useDispatch, useSelector} from "react-redux";
import React, { useEffect, useState } from "react";
import { RootState } from "./store";
import {BrowserRouter, Navigate, NavLink, Route, Routes, useNavigate} from "react-router-dom";
import isTokenValid from "./services/tokenService.ts"
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import {fetchUserByName} from "./services/userService.ts"

// Import du CSS
import './App.css'

// Import des Pages
import {Home} from "./pages/Home.tsx";
import {Signup} from "./pages/Signup.tsx";
import { SignIn } from "./pages/Signin.tsx";
import {History} from "./pages/History.tsx";
import {Grimoire} from "./pages/Grimoire.tsx";
import {Profile} from "./pages/Profile.tsx";
import {Tournament} from "./pages/Tournament.tsx";
import { update_user, logout_user } from "./slices/userSlice.ts";

interface DecodedToken {
    sub: string;
    exp: number;
}

function ProtectedApp() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { user } = useSelector((state: RootState) => state.user);
    const [tokenUserName, setTokenUserName] = useState("");

    // Gestion du token d'authentification
    useEffect(() => {
        const token = Cookies.get("access_token"); 
        // Token invalide ou manquant
        if (!token || !isTokenValid(token)) {
            dispatch(logout_user());
            //alert("You have been logged out for security reasons (token expired)")
            //navigate("/signin");
            console.log("Token KO - Navigation connectée refusée")
        } else {
            const decoded : DecodedToken = jwtDecode(token);
            const userName = decoded.sub;
            // Met à jour l'utilisateur dans Redux
            if (userName){
                setTokenUserName(userName);
                console.log(`Try to fetch user ${userName}`)
                fetchUserByName(userName)
                .then(user => {
                  dispatch(update_user({ user }));
                  console.log("Utilisateur mis à jour :", user);
                })
                .catch(error => {
                  console.error('Erreur lors de la récupération de l\'utilisateur', error);
                });
            }
            console.log("Token OK - Navigation connectée autorisée")
        }
    }, [navigate]);

    // Gestion de la déconnexion
    const handleLogout = () => {
        Cookies.remove('access_token');
        setTokenUserName("")
        dispatch(logout_user());
        navigate("/");
      };

    // Gestion de l'autorisation des routes 
    function PrivateRoute({ children, user }) {
        const token = Cookies.get("access_token");
        //console.log("Token : " + token)
        return token ? children : <Navigate to="/signin" />;
    }

    return (
    <>
        <header>
            {/* Barre de navigation */}
            <nav>
                {/* {user && tokenUserName === user.firstName ? ( */}
                {tokenUserName != "" ? (
                    <>
                        <NavLink to="/tournament" className={({ isActive }) => (isActive ? "isActive" : "")}>
                            Tournament
                        </NavLink>
                        {/* <NavLink to="/history" className={({ isActive }) => (isActive ? "isActive" : "")}>
                            Duels History
                        </NavLink> */}
                        {/* <NavLink to="/market" className={({ isActive }) => (isActive ? "isActive" : "")}>
                            Market
                        </NavLink> */}
                        <NavLink to="/grimoire" className={({ isActive }) => (isActive ? "isActive" : "")}>
                            Spell Grimoire
                        </NavLink>
                        <NavLink to="/profile" className={({ isActive }) => (isActive ? "isActive" : "")}>
                            {/* <User user={user}/> */}
                            Profile
                        </NavLink>
                        <NavLink to="/" onClick={handleLogout} style={{ marginLeft: "10px" }}>
                            Log Out
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to="/" className={({ isActive }) => (isActive ? "isActive" : "")}>
                            Home
                        </NavLink>
                        {/* <NavLink to="/duel" className={({ isActive }) => (isActive ? "isActive" : "")}>
                            Duel
                        </NavLink> */}
                        <NavLink to="/signin" className={({ isActive }) => (isActive ? "isActive" : "")}>
                            Sign In
                        </NavLink>
                        <NavLink to="/signup" className={({ isActive }) => (isActive ? "isActive" : "")}>
                            Sign Up
                        </NavLink>
                    </>
                )}
            </nav>
        </header>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/history" element={<PrivateRoute user={user}><History /></PrivateRoute>} />
            <Route path="/grimoire" element={<PrivateRoute user={user}><Grimoire /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute user={user}><Profile /></PrivateRoute>} />
            <Route path="/tournament" element={<PrivateRoute user={user}><Tournament /></PrivateRoute>} />
            {/* <Route path="/duel" element={<Duel />} /> */}
            {/*<Route path="/market" element={<Market />} /> */}
        </Routes>
    </>
    )
}

function App() {
    return (
        <BrowserRouter>
          <ProtectedApp />
        </BrowserRouter>
    );
  }
  
  export default App;
