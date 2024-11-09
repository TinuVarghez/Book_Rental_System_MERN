import React from "react";
import './MainNavigation.css';
import MainHeader from "./MainHeader";
import { Link } from "react-router-dom";
import NaviLinks from "./NaviLinks";

const MainNavigation = (props)=>{
    return(
        <MainHeader className="main-navigation__menu-btn">
            {/* <button>
                <span>---</span>
            </button> */}
            <h1 className="main-navigation__title">
                <Link to="/">Book Rental System</Link>   
            </h1>
            <nav>
                <NaviLinks/>
            </nav>
        </MainHeader>
    );
}

export default MainNavigation