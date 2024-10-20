'use client';
import ReduxProvider from "../Provider/ReduxProvider";
import NavBarComponent from "./NavBarComponent";

const NavBar = () => {
    return (
        <ReduxProvider>
            <NavBarComponent />
        </ReduxProvider>
    )
}
 
export default NavBar;