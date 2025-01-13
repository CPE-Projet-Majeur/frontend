// Import des modules
import { useDispatch, useSelector} from "react-redux";
import React from "react";
import { RootState } from "./store";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";

// Import du CSS
import './App.css'

// Import des Pages
import {Home} from "./pages/Home.tsx";
import {Signup} from "./pages/Signup.tsx";
import {SignIn} from "./pages/SignIn.tsx";
import {History} from "./pages/History.tsx";
import {Grimoire} from "./pages/Grimoire.tsx";
import {Profile} from "./pages/Profile.tsx";
import {Tournament} from "./pages/Tournament.tsx";
import { update_user } from "./slices/userSlice.ts";
import { Duel } from "./pages/Duel.tsx";


function App() {

  let { user } = useSelector((state: RootState) => state.user);

  return (
    <>
        <BrowserRouter>
            <header>
                {/* Barre de navigation */}
                <nav>
                    {user ? ( //TODO: Comparaison abérante pour tester le rendu de la page sans connexion (à enlever)
                        <>
                            <NavLink to="/tournament" className={({ isActive }) => (isActive ? "isActive" : "")}>
                                Tournament
                            </NavLink>
                            <NavLink to="/history" className={({ isActive }) => (isActive ? "isActive" : "")}>
                                Duels History
                            </NavLink>
                            <NavLink to="/market" className={({ isActive }) => (isActive ? "isActive" : "")}>
                                Market
                            </NavLink>
                            <NavLink to="/profile" className={({ isActive }) => (isActive ? "isActive" : "")}>
                                {/* <User user={user}/> */}
                                Profile
                            </NavLink>
                            <button /*onClick={handleLogout}*/ style={{ marginLeft: "10px" }}>
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/" className={({ isActive }) => (isActive ? "isActive" : "")}>
                              Home
                            </NavLink>
                            <NavLink to="/grimoire" className={({ isActive }) => (isActive ? "isActive" : "")}>
                                Spell Grimoire
                            </NavLink>
                            <NavLink to="/duel" className={({ isActive }) => (isActive ? "isActive" : "")}>
                                Duel
                            </NavLink>
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
                <Route path="/history" element={<History />} />
                <Route path="/grimoire" element={<Grimoire />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/tournament" element={<Tournament />} />
                <Route path="/duel" element={<Duel />} />
                {/*<Route path="/market" element={<Market />} /> */}
            </Routes>
        </BrowserRouter>
    </>
)
}

export default App
