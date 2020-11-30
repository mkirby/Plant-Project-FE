import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar(props) {
    return(
        <div className="navbar">
            <div className="site-name">
                <h1>Plant App</h1>
            </div>
            <div className="nav-menu">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/search">Search</NavLink>
                <NavLink to="/collection">Collection</NavLink>
                {props.user ?
                    <NavLink to="/" onClick={ props.logoutHandler }>Log Out</NavLink>
                    :
                    <NavLink to="/login">Log in</NavLink>
                }
            </div>
        </div>
    )
}

export default Navbar