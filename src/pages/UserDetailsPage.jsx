import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import MemoryCard from "../components/MemoryCard";

function UserDetailsPage() {
    const [users, setUsers] = useState([]);
    const [memories, setMemories] = useState([]);
    const { userId } = useParams();

    const getUser = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/users/id/${userId}`)
            .then((response) => {
                const oneUser = response.data;
                setUsers(oneUser);
            })
            .catch((error) => console.log(error));
    };
    const getEvent = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/events`)
            .then((response) => {
                const personalPosts = response.data.filter((e) => {
                    return e.userId._id === userId;
                });
                setMemories(personalPosts);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getUser();
        getEvent();
    }, []);

    return (
        <div className="bg-gray-100 flex flex-col">
            {users && (
                <>
                    <div className=" flex justify-center">
                        <div className="w-1/4 p-4">
                            {users && (
                                <div className="bg-white p-8 rounded-lg shadow-md text-center sticky top-10">
                                    <img
                                        src={users.imageUrl}
                                        alt="User"
                                        className="w-48 h-48 mx-auto rounded-full"
                                    />
                                    <h1 className="text-3xl font-semibold mt-6">
                                        Welcome {users.name} {users.lastname}
                                    </h1>
                                    <p className="text-xl text-gray-600 mt-4">
                                        Your Birthday: {users.birthdate}
                                    </p>

                                    <div className="mt-8 space-x-4">
                                        <Link to={`/users/edit/${userId}`}>
                                            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline-green active:bg-green-700">
                                                Edit
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="w-2/4 p-4">
                            {memories &&
                                memories.map((memory) => (
                                    <MemoryCard
                                        memory={memory}
                                        key={memory._id}
                                    />
                                ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default UserDetailsPage;
