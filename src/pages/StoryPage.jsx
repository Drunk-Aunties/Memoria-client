import React, { useState, useEffect } from "react";
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

    // Function to trigger text-to-speech
    const synth = window.speechSynthesis;
    const speak = () => {
        let utterance = new SpeechSynthesisUtterance();

        utterance.text = story;
        utterance.voice = window.speechSynthesis.getVoices()[1];

        synth.speak(utterance);
    };
    const speakCancel = () => {
        synth.cancel();
    };

    useEffect(() => {
        getStory();
    }, []);

    return (
        <>
            <div className="flex justify-center items-center w-auto h-auto">
                <img
                    src="/img/logo.png"
                    alt="Image Description"
                    className="w-auto h-auto"
                />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl text-center mt-5 mb-5">
                Your Story
            </h1>
            <div className="flex justify-center items-center mt-10 mb-10">
                <br />

                {story ? (
                    <h1 className="text-2xl md:text-3xl lg:text-4xl text-center w-3/4 leading-relaxed">
                        {story}
                    </h1>
                ) : (
                    <h1 className="text-2xl md:text-3xl lg:text-4xl text-center w-3/4 leading-relaxed">
                        Your Story is Generating
                    </h1>
                )}
            </div>
            <div className="flex justify-center items-center mt-10 mb-10">
                <Link
                    to="/groups"
                    className="text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-xl md:text-2xl lg:text-3xl"
                >
                    Back
                </Link>
            </div>
            <br />
            <div id="text-to-speech">
                <button
                    onClick={speak}
                    className="text-center bg-green-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-xl md:text-2xl lg:text-3xl"
                >
                    Read it!
                </button>{" "}
                <button
                    onClick={speakCancel}
                    className="text-center bg-red-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-xl md:text-2xl lg:text-3xl"
                >
                    Stop Reading
                </button>
            </div>
        </>
    );
}
