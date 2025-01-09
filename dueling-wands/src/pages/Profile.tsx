/**
 * @author Thibault Berthet
 */

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { User } from "../components/profile/User";
import styles from "./CSS/profile.module.css";
import React from "react";

export const Profile = () => {
    let submitted_user = useSelector((state: RootState) => state.user.user);

    return (
        <div className={styles["profil-container"]}>
            {submitted_user ? (
                <>
                    {/* Vidéo de fond */}
                    <div className={styles["video-container"]}>
                        <video
                            src="https://videos.pexels.com/video-files/5453622/5453622-uhd_2560_1440_24fps.mp4"
                            autoPlay
                            muted
                            playsInline
                        />
                    </div>

                    {/* Overlay et carte de profil */}
                    <div className={styles.overlay}>
                        <div className={styles["profil-card"]}>
                            <h1 className={styles["profil-title"]}>Profile</h1>
                            <div className={styles["profil-user"]}>
                                <User user={submitted_user} />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p className={styles["no-user-message"]}>No user connected</p>
            )}
        </div>
    );
};