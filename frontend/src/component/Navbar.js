import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { getUserID, logOut } from "../App";
// eslint-disable-next-line
import { MeetingRoom, Settings } from '@material-ui/icons/';

export const Navbar = (props) => {
    const [userID, setUserID] = useState("none");

    getUserID().then(res => setUserID(res));

    return(
        <main>
            <header>
                <div className="menu-bar">
                    <ul>
                        {/* <div className="topnav">
                            {(userID !== "none") && <li style={{marginLeft: "2vw"}} ><a className={props.page === "footagedetection" && "active"} href="/footagedetection" >Footage Detection</a></li> }
                            {(userID !== "none") && <li><a className={props.page === "capturedcrime" && "active"} href="/capturedcrime" >Captured Crime</a></li> }
                        </div> */}
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
            <li id="logo" className="logo" ><a href="/" onClick={setHomepageStatusFalse}>CTV</a></li>
            {userID !== "none" && 
            <div className="topnav-dropdown-content">
                {/* <button onClick={null}><Settings />Set Folder Directory</button> */}
                <a href="/signin" onClick={logOut}><MeetingRoom />Log Out</a>
            </div>
            }
        </div>
    );
};
const setHomepageStatusFalse = _ => {
    sessionStorage.setItem("homepageStatus", "0");
};