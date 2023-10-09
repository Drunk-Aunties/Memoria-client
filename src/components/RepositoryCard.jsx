import React from "react";

// Component to display GitHub Repository on the homepage
function RepositoryCard({ repository }) {
    return (
        <>
            <div className="p-4">
                <a
                    href={repository.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                    <h2 className="text-xl font-semibold text-gray-800 hover:underline">
                        {repository.name}
                    </h2>
                </a>
                <p className="text-gray-600">
                    {repository.description || "No description"}
                </p>
                <div className="flex items-center mt-4">
                    <div className="mr-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 inline mr-1 text-gray-700"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 4a1 1 0 011 1v10a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1H3zm0-1a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H3z"
                                clipRule="evenodd"
                            />
                            <path
                                fillRule="evenodd"
                                d="M10 18a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        {repository.language || "N/A"}
                    </div>
                </div>
            </div>
        </>
    );
}

export default RepositoryCard;
