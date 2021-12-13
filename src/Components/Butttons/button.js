import React from "react";
import Button from '@material-ui/core/Button';
import "./button.scss"

export default function CustomButton(props) {
    return (
        <Button variant="contained" color={props.btnColor} disabled={props.btnDisable} className={`${props.custombtnCSS} btnContainer ${props.btnCustomColor === "customPrimary" && "customPrimary"}`} onClick={props.onBtnClick} >
            {props.btnName}
        </Button>
    )
}