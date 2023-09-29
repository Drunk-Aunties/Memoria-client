import React from "react";

function UserGithubCard({ userData }) {
    return (
        <div
            onClick={() => window.open(userData.html_url, "_blank")}
            className="max-w-md mx-auto bg-white rounded-xl overflow-hidden md:max-w-2xl cursor-pointer hover:bg-gray-100"
        >
            <div className="md:flex items-center">
                <div className="md:flex-shrink-0">
                    <img
                        className="h-48 w-full object-cover md:w-48 mt-4"
                        src={userData.avatar_url}
                        alt={`${userData.name}'s Avatar`}
                    />
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
                        {userData.name}
                    </div>
                    <a
                        href={userData.html_url}
                        className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        @{userData.login}
                    </a>
                    <p className="mt-2 text-gray-500">{userData.bio}</p>
                    <ul className="mt-4 text-gray-500">
                        <li>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 inline mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M13.293 6.293a1 1 0 011.414 0L18 10l-3.293 3.293a1 1 0 01-1.414-1.414L15.586 10 13.293 6.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 6.293a1 1 0 10-1.414 1.414L4.586 10 6.293 13.293a1 1 0 101.414-1.414L5.414 10l1.293-1.293a1 1 0 000-1.414z"
                                    clipRule="evenodd"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M10 1a9 9 0 100 18 9 9 0 000-18zm0 1a8 8 0 100 16 8 8 0 000-16zm0 5a1 1 0 011 1v6a1 1 0 11-2 0V7a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Location: {userData.location || "N/A"}
                        </li>
                        <li>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 inline mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 1a9 9 0 1000 18 9 9 0 000-18zm0 1a8 8 0 1000 16 8 8 0 000-16zm0 5a1 1 0 011 1v6a1 1 0 11-2 0V7a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Public Repos: {userData.public_repos}
                        </li>
                        <li>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 inline mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1H3zm0-1a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H3z"
                                    clipRule="evenodd"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a2 2 0 100-4 2 2 0 000 4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Email: {userData.email || "N/A"}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default UserGithubCard;
