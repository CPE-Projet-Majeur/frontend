import React from "react";
import { QRCodeCanvas } from 'qrcode.react';

interface Iprops {
    qrdata: string;
}

export const QrCode = (props : Iprops) => {

    let qrdata = props.qrdata;

    return (
        <div>
            <h2>Pairing</h2>
            <p>Please scan the following QR Code to connect to your opponent</p>
            <QRCodeCanvas value={qrdata} />
        </div>
    );
    }