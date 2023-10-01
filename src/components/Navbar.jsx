import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

export default function Navbar() {
    const {user, logOutUser } = useContext(AuthContext);

    return (
        <>
            <nav className="bg-black w-screen">
                <div className="max-w-full flex flex-wrap items-center justify-between mx-5">
                    <a href="/" className="flex items-center">
                        <img src="/img/logo-flat.png" className="h-14" alt="Memoria Logo" />
                    </a>
                    <button data-collapse-toggle="navbar-default" type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul
                            className="font-medium flex flex-col p-4 md:p-0 mt-1 border border-gray-100 rounded-lg md:flex-row md:space-x-10 md:mt-0 md:border-0">
                            <li>
                                <NavLink to="/" className='text-md block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:bord md:hover:text-blue-700 md:p-0'>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/groups" className='text-md block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:bord md:hover:text-blue-700 md:p-0'>My Groups</NavLink>
                            </li>

                            {user ? (
                                <>
                                    <NavLink to={`/users/${user._id}`} className=" text-md block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0">Profile</NavLink>
                                    <NavLink onClick={logOutUser} className="text-md block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0">Logout</NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink to="/login" className="text-md block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0">Login</NavLink>
                                    <NavLink to="/signup" className="text-md block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0">Signup</NavLink>
                                </>
                            )}

                        </ul>
                    </div>
                </div>
            </nav>

        </>







    );
}
