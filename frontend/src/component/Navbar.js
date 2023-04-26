import React from "react";
import { Outlet } from "react-router-dom";

export const Navbar = (props) => {
    return(
        <main>
            <header>
                <div className="menu-bar">
                    <ul>
                        <li id="logo" className="logo" ><a href="/">CTV</a></li>
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