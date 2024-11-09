import React from "react";
import './NaviLinks.css';
import { NavLink } from "react-router-dom";

const NaviLinks = (props) =>{
    return(
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact="true">All Books</NavLink>
            </li>
            {/* <li>
                <NavLink to="/u1/places" exact>My Employees</NavLink>
            </li> */}
            {/* <li>
                <NavLink to="/emp/new" exact>Add Employees</NavLink>
            </li> */}
            <li>
                <NavLink to="/search" exact="true">Search</NavLink>
            </li>
            <li>
                <NavLink to="/auth" exact="true">Authenticate</NavLink>
            </li>
        </ul>
    );
}
export default NaviLinks;