import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import service from "../services/file-upload.service";
import axios from "axios";

function EditUserPage(props) {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/users/id/${userId}`)
            .then((response) => {
                const oneUser = response.data;
                setName(oneUser.name);
                setLastname(oneUser.lastname);
                setBirthdate(oneUser.birthdate);
                setImageUrl(oneUser.imageUrl);
            })
            .catch((error) => console.log(error));
    }, [userId]);

    const handleFileUpload = (e) => {
        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);

        service
            .uploadImage(uploadData)
            .then((response) => {
                setImageUrl(response.fileUrl);
            })
            .catch((err) =>
                console.log("Error while uploading the file: ", err)
            );
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { name, lastname, imageUrl, birthdate };
        axios
            .put(
                `${import.meta.env.VITE_API_URL}/api/users/${userId}`,
                requestBody
            )
            .then((response) => {
                navigate(`/users/${userId}`);
            });
    };

    const deleteUser = () => {
        axios
            .delete(`${import.meta.env.VITE_API_URL}/api/users/${userId}`)
            .then(() => {
                navigate("/users");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="bg-gray-100 min-h-screen py-12 flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <form onSubmit={handleFormSubmit} className="flex flex-col">
                    <img
                        src={imageUrl}
                        alt="User"
                        className="w-48 h-48 mx-auto rounded-full"
                    />
                    <input type="file" onChange={(e) => handleFileUpload(e)} />
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-3xl font-semibold mt-6 border border-solid border-black"
                    />
                    <p className="text-xl text-gray-600 mt-4">Your Birthday:</p>

                    <input
                        type="date"
                        name="birthdate"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                    />

                    <div className="mt-8 space-x-4">
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline-green active:bg-green-700"
                            type="submit"
                        >
                            Update
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline-red active:bg-red-700"
                            type="submit"
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditUserPage;
