import React from "react";
import styles from "./CSS/home.module.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/signin");
    };

    return (
        <div className={styles["home-container"]}>
            <div className={styles["video-container"]}>
                <video
                    src="https://videos.pexels.com/video-files/5453622/5453622-uhd_2560_1440_24fps.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
                <div className={styles.overlay}>
                    <button
                        onClick={handleLoginClick}
                        className={styles["login-button"]}
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    );
};
