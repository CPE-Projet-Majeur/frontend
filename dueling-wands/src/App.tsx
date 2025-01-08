// Import des modules
import { useSelector} from "react-redux";
import React from "react";
import { RootState } from "./store";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";

// Import du CSS
import './App.css'

// Import des Pages
import {Home} from "./pages/Home.tsx";
import {Signup} from "./pages/Signup.tsx";
import {SignIn} from "./pages/SignIn.tsx";


function App() {

  const { user } = useSelector((state: RootState) => state.user);

  return (
    <>
        <BrowserRouter>
            <header>
                {/* Barre de navigation */}
                <nav>
                    {user ? (
                        <>
                            <NavLink to="/tournament" className={({ isActive }) => (isActive ? "isActive" : "")}>
                                Tournament
                            </NavLink>
                            <NavLink to="/history" className={({ isActive }) => (isActive ? "isActive" : "")}>
                                Duels History
                            </NavLink>
                            <NavLink to="/grimoire" className={({ isActive }) => (isActive ? "isActive" : "")}>
                                Spell Grimoire
                            </NavLink>
                            <NavLink to="/market" className={({ isActive }) => (isActive ? "isActive" : "")}>
                                Market
                            </NavLink>
                            <NavLink to="/profile" className={({ isActive }) => (isActive ? "isActive" : "")}>
                                {/* <User user={user}/> */}
                                USER
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
                {/* <Route path="/inventory" element={<SpellsInventory />} />
                <Route path="/history" element={<DuelsHistory />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/market" element={<Market />} />
                <Route path="/tournament" element={<Tournament />} /> */}
            </Routes>
        </BrowserRouter>
    </>
)
}

export default App
