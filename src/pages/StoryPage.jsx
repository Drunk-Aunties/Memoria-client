import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function StoryPage() {
    const [story, setStory] = useState("");
    const navigate = useNavigate();
    let token = localStorage.getItem("authToken");
    const { groupId } = useParams();

    const getStory = () => {
        axios
            .get(
                `${import.meta.env.VITE_API_URL}/api/events/story/${groupId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                const oneStory = response.data;
                setStory(oneStory);
            })
            .catch((error) => {
                error &&
                    navigate("/error", {
                        state: {
                            id: error.response.status,
                            message: error.response.statusText,
                            reason: error.response.data.message,
                        },
                    });
                console.log(error);
            });
    };

    useEffect(() => {
        getStory();
    }, []);
    return (
        <>
            {console.log(story)}
            <div className="flex justify-center items-center w-auto h-auto">
                <img
                    src="./public/img/logo.png"
                    alt="Image Description"
                    className="w-auto h-auto"
                />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl text-center mt-5 mb-5">
                Your Story
            </h1>
            <div className="flex justify-center items-center mt-10 mb-10">
                <br />
                <h1 className="text-2xl md:text-3xl lg:text-4xl text-center w-3/4 leading-relaxed">
                    {story}
                </h1>
            </div>
            <div className="flex justify-center items-center mt-10 mb-10">
                <Link
                    to="/groups"
                    className="text-center bg-green-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-xl md:text-2xl lg:text-3xl"
                >
                    Back
                </Link>
            </div>
        </>
    );
}
