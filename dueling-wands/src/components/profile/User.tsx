/**
 * @author Thibaut Berthet
 */

import React from "react";
import IUser from "../../types/IUser";

interface IProps {
    user: IUser;
}

export const User = (props : IProps) => {
    return (
        <div>
            <h2>My ID : {props.user.id}</h2>
            <h3>Username : {props.user.login}</h3>
            <p>Firstname : {props.user.firstName}</p>
            <p>Lastname : {props.user.lastName}</p>
            <p>House : {props.user.house}</p>
        </div>
    );
    }
