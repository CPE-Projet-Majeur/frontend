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
            <h3>{props.user.login}</h3>
            <p>------------</p>
            <p>Firstname : {props.user.firstName}</p>
            <p>Lastname : {props.user.lastName}</p>
            <p>House : {props.user.house}</p>
        </div>
    );
    }
