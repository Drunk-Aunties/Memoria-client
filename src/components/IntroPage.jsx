import React from "react";
import { Link } from "react-router-dom";

const FeaturesList = () => {
    const features = [
        {
            title: "Private Groups",
            description:
                "Create private groups with your closest friends or family members. Share your daily life moments securely within these groups, fostering a sense of intimacy and privacy.",
            logo: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                >
                    <g fill="#FF5733">
                        <path d="M37.2 21.3V16c0-6.1-4.9-11-11-11h-3.3v7.4l-7.9 7.9h-5.8l-5.7-5.7V5H9c-6.1 0-11 4.9-11 11v5.3l11 11.1v8.6l3.7 3.7v-12l7.1-7.1h9.1l7.9 7.9v12.7l4.4-4.3V32l11-11.1v-8.6L37.2 21.3zM8 16c0-4.4 3.6-8 8-8h10.7l-5.5 5.5 3.2 3.2 1.5-1.5v-4.9l3.2 3.2 1.4-1.4V24h5.7l6.8 6.8H8V16z" />
                        <path d="M36.5 31.2l-5.7-5.7v-6.6l-2.7-2.7V23l-4.1-4.1V14h3.9l6.6 6.6V31.2zM28 11.4l4.3 4.3 2.4 2.4v4.4l3.1 3.1v4.9l-1.9-1.9-3.5-3.5v-4.9l-2.1-2.1V14h-2.3z" />
                    </g>
                </svg>
            ),
        },
        {
            title: "Post and Share",
            description:
                "Easily post text, images, and videos to your private groups. Share your experiences, thoughts, and adventures with those who matter most.",
            logo: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                >
                    <g fill="#33FF57">
                        <path d="M38 8h-7.1l-4-4H19l-4 4H8c-2.2 0-4 1.8-4 4v28c0 2.2 1.8 4 4 4h30c2.2 0 4-1.8 4-4V12c0-2.2-1.8-4-4-4zm2 32c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V12c0-1.1.9-2 2-2h4.1l4-4h9.7l4 4H38c1.1 0 2 .9 2 2v28z" />
                        <path d="M30.5 14h-13c-.3 0-.5.2-.5.5s.2.5.5.5h13c.3 0 .5-.2.5-.5s-.2-.5-.5-.5zm0 5h-13c-.3 0-.5.2-.5.5s.2.5.5.5h13c.3 0 .5-.2.5-.5s-.2-.5-.5-.5zm0 5h-13c-.3 0-.5.2-.5.5s.2.5.5.5h13c.3 0 .5-.2.5-.5s-.2-.5-.5-.5zm0 5h-13c-.3 0-.5.2-.5.5s.2.5.5.5h13c.3 0 .5-.2.5-.5s-.2-.5-.5-.5z" />
                    </g>
                </svg>
            ),
        },
        {
            title: "Story Generation",
            description:
                "Memoria leverages cutting-edge AI technology, including OpenAI's API, to automatically generate stories from the content posted within your groups. These stories can take various forms, from casual chat-like conversations to formal newspaper-style articles.",
            logo: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                >
                    <g fill="#FFB733">
                        <path d="M37.2 21.3V16c0-6.1-4.9-11-11-11h-3.3v7.4l-7.9 7.9h-5.8l-5.7-5.7V5H9c-6.1 0-11 4.9-11 11v5.3l11 11.1v8.6l3.7 3.7v-12l7.1-7.1h9.1l7.9 7.9v12.7l4.4-4.3V32l11-11.1v-8.6L37.2 21.3zM8 16c0-4.4 3.6-8 8-8h10.7l-5.5 5.5 3.2 3.2 1.5-1.5v-4.9l3.2 3.2 1.4-1.4V24h5.7l6.8 6.8H8V16z" />
                        <path d="M36.5 31.2l-5.7-5.7v-6.6l-2.7-2.7V23l-4.1-4.1V14h3.9l6.6 6.6V31.2zM28 11.4l4.3 4.3 2.4 2.4v4.4l3.1 3.1v4.9l-1.9-1.9-3.5-3.5v-4.9l-2.1-2.1V14h-2.3z" />
                    </g>
                </svg>
            ),
        },
        {
            title: "Personalized Narratives",
            description:
                "Tailor the way Memoria generates stories to your liking. Whether you prefer a friendly chatbot tone or a more formal tone reminiscent of a newspaper, Memoria lets you choose the narrative style.",
            logo: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                >
                    <g fill="#3333FF">
                        <path d="M33.5 8H30l-3 10h9l-8 24H22l8-24h-8l3-10H14l-3 10H4l8-24h9l-8 24h8z" />
                        <path d="M24 12c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14h-2v-2h2v2zm0-4h-2V16h2v6z" />
                    </g>
                </svg>
            ),
        },
        {
            title: "Text-to-Speech",
            description:
                "Memoria integrates with Speech API, allowing you to convert your generated stories into spoken words. Listen to your memories being narrated by your computer, adding an extra layer of immersion to your shared experiences.",
            logo: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                >
                    <g fill="#FF33FF">
                        <path d="M37 28c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 12c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zM11 28c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 12c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zM24 8C13.5 8 5 16.5 5 27s8.5 19 19 19 19-8.5 19-19-8.5-19-19-19zm0 36c-9.4 0-17-7.6-17-17s7.6-17 17-17 17 7.6 17 17-7.6 17-17 17z" />
                    </g>
                </svg>
            ),
        },
        {
            title: "Cloudinary Integration",
            description:
                "Seamlessly upload and store multimedia content using Cloudinary. Your images and videos are securely stored and easily accessible within Memoria.",
            logo: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                >
                    <g fill="#33FFFF">
                        <path d="M44 18h-8v-2h8c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H24v-8h4v-4h-4V6c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v8h8c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2z" />
                        <path d="M38 12h-8c-1.1 0-2-.9-2-2V2H14c-1.1 0-2 .9-2 2v8H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h8v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8h8c1.1 0 2-.9 2-2V14c0-1.1-.9-2-2-2zm0 18h-8v-2h8v2zm0-6h-8v-2h8v2zm0-6h-8v-2h8v2zm-6-12v8h-8v-8h8z" />
                    </g>
                </svg>
            ),
        },
        {
            title: "Github Integration",
            description:
                "Keep track of your development progress by integrating with Github API. Stay organized and monitor changes to your codebase effortlessly.",
            logo: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                >
                    <g fill="#FF6633">
                        <path d="M42 2H6c-2.2 0-4 1.8-4 4v32c0 2.2 1.8 4 4 4h12v-8h-2v-6h2V16c0-5 4-9 9-9s9 4 9 9v12h2v6h-2v8h12c2.2 0 4-1.8 4-4V6c0-2.2-1.8-4-4-4zM24 40h-4v-4h4v4zm8-8h-4v-4h4v4zm0-8h-4v-4h4v4zm0-8h-4v-4h4v4zm4-8H32V8h4v8z" />
                    </g>
                </svg>
            ),
        },
        {
            title: "Modern UI with React and Tailwind",
            description:
                "Memoria boasts a sleek and responsive user interface built with React and styled with Tailwind CSS. Enjoy a user-friendly experience on both desktop and mobile devices.",
            logo: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                >
                    <g fill="#33FF33">
                        <path d="M4 4h40c2.2 0 4 1.8 4 4v36c0 2.2-1.8 4-4 4H4c-2.2 0-4-1.8-4-4V8c0-2.2 1.8-4 4-4zm36 2H8c-1.1 0-2 .9-2 2v28h32V6c0-1.1-.9-2-2-2zm0 32H6c-1.1 0-2-.9-2-2V14h32v20c0 1.1-.9 2-2 2zm-2-24h-6v-4h6v4z" />
                        <path d="M18 10h12v2H18zm0 4h12v2H18zm0 4h12v2H18zm0 4h12v2H18zm0 4h6v2h-6z" />
                    </g>
                </svg>
            ),
        },
        {
            title: "Job Integration",
            description:
                "For users like us, who are actively seeking software development roles, Memoria provides the opportunity to showcase our skills. We demonstrate our expertise in using technologies like Express.js, MongoDB, NodeJS, OpenAI API and React.",
            logo: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                >
                    <g fill="#FF9933">
                        <path d="M37 12v4h-4v4h-4v-4h-4v4h-4v-4h-4v4h-4v-4h-4v4h-4v-4H9c-2.2 0-4 1.8-4 4v20c0 2.2 1.8 4 4 4h28c2.2 0 4-1.8 4-4V16c0-2.2-1.8-4-4-4h-2z" />
                        <path d="M24 36h-4v-4h4v4zm0-8h-4v-4h4v4z" />
                    </g>
                </svg>
            ),
        },
    ];

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-3/4">
                <h2 className="text-center mb-8 font-bold text-xl">
                    Please Login to see the groups
                </h2>
                <div className="flex justify-center space-x-4">
                    <Link to="/signup">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Sign up
                        </button>
                    </Link>
                    <Link to="/login">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Login
                        </button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 hover:scale-105"
                        >
                            <div className="p-4">
                                <div className="flex items-center justify-center mb-4">
                                    {feature.logo}
                                </div>
                                <h2 className="text-xl font-semibold mb-2">
                                    {feature.title}
                                </h2>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturesList;
