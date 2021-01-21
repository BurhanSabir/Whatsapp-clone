import React from 'react'
import "./sidebarchatstyle.css";
import  { Avatar } from "@material-ui/core";

function Sidebarchat() {
    return (
        <div className = "side_chat">
            <Avatar />
            <div className = "sidebarchat_info">
            <h2> Room Name</h2>
            <p>This is the last message</p>
            </div>
        </div>
    )
}

export default Sidebarchat
