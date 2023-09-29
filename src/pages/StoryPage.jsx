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
            .get(`${import.meta.env.VITE_API_URL}/api/events/story/${groupId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
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
            <p>{story}</p>
            <Link to="/groups">
                <button>Back</button>
            </Link>
        </>
    );
}
