import React, { useRef, useState } from "react";
import styles from "./CSS/home.module.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();

    const [buttonDisplay, setButtonDisplay] = useState<boolean>(false);

    const handleLoginClick = () => {
        navigate("/signin");
    };

    function displayButton () {
        setButtonDisplay(true);
    }

    return (
        <div className={styles["home-container"]}>
            <div className={styles["video-container"]}>
                <video
                    // src="https://videos.pexels.com/video-files/5453622/5453622-uhd_2560_1440_24fps.mp4"
                    src="/videos/intro.mov"
                    autoPlay
                    //muted
                    //loop
                    playsInline
                    onEnded={displayButton}
                />
                {buttonDisplay && (
                    <div className={styles.overlay}>
                        <button
                            onClick={handleLoginClick}
                            className={styles["login-button"]}
                        >
                            Sign in
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
