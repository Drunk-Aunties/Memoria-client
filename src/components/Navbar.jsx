import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

export default function Navbar() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
        <div className="bg-black text-white w-screen h-16 flex gap-10 p-2 items-center">
            <img src="/img/logo-flat.png" alt="" className="h-16" />
            <NavLink to="/">Home</NavLink>
            <NavLink to="/groups">Group</NavLink>

            {user ? (
                <>
                    <NavLink to={`/users/${user._id}`}>Profile</NavLink>
                    <NavLink onClick={logOutUser}>Logout</NavLink>
                </>
            ) : (
                <>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/signup">Signup</NavLink>
                </>
            )}
        </div>
    );
}
