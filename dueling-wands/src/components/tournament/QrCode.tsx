import React from "react";
import { QRCodeCanvas } from 'qrcode.react';

interface Iprops {
    qrdata: number;
}

export const QrCode = (props : Iprops) => {
    let qrdata = props.qrdata;
    return (
        <div>
            <h2>Pairing</h2>
            <p  style={{ marginBottom: '2vh' }}>Please scan the following <b>QR Code</b> to link your magic to your <b>opponent</b></p>
            <QRCodeCanvas value={qrdata.toString()} />
        </div>
    );
    }