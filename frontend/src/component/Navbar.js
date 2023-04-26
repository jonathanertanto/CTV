import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { getUserID } from "../App";
import { MeetingRoom } from '@material-ui/icons/';

export const Navbar = (props) => {
    const [userID, setUserID] = useState("none");

    // getUserID().then(res => setUserID(res));

    return(
        <main>
            <header>
                <div className="menu-bar">
                    <ul>
                        <div className="topnav">
                            {(userID !== "none") && <li style={{marginLeft: "2vw"}} ><a className={props.page === "footagedetection" && "active"} href="/footagedetection" >Footage Detection</a></li> }
                            {(userID !== "none") && <li><a className={props.page === "capturedcrime" && "active"} href="/capturedcrime" >Captured Crime</a></li> }
                        </div>
                        {/* <li id="logo" className="logo" ><a href="/">CTV</a></li> */}
                        {accountMenu(userID)}
                        <hr/>
                    </ul>
                </div>
            </header>
            <div id="content" className="content">
                <Outlet />
            </div>
        </main>
    );
};

const accountMenu = (userID) => {
    return(
        <div className={userID !== "none" && "topnav-dropdown"} style={{float: "right"}} >
            <li id="logo" className="logo" ><a href="/">CTV</a></li>
            {userID !== "none" && 
            <div className="topnav-dropdown-content">
                <a href="/" onClick={null}><MeetingRoom />Log Out</a>
            </div>
            }
        </div>
    );
};