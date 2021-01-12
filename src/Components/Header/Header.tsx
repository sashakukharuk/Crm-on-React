import React from 'react'
import {NavLink} from "react-router-dom";

export const Header = () => {
    return <nav>
        <div className="nav-wrapper grey darken-1">
            <NavLink to="/login" className="brand-logo">Newborn</NavLink>
            <ul id="nav-mobile" className="right">
                <li><NavLink  to='/login'>Login in</NavLink></li>
                <li><NavLink to='/register'>Register</NavLink></li>
            </ul>
        </div>
    </nav>
}
