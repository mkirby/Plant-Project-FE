import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar(props) {
    return(
        <ul>
            <NavLink to="/">
                <li>Home</li>
            </NavLink>
            <NavLink to="/search">
                <li>Search</li>
            </NavLink>
            <NavLink to="/collection">
                <li>Collection</li>
            </NavLink>
            {props.user ?
                <NavLink to="/" onClick={ props.logoutHandler }>
                    <li>Log Out</li>
                </NavLink>
                :
                <NavLink to="/login">
                    <li>Log in</li>
                </NavLink>
            }
        </ul>
    )
}

export default Navbar