import React, { useContext, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

export default function EditMemoryCard(props) {
    //Functional States and Variables
    const navigate = useNavigate();
    const { eventId } = useParams();
    let token = localStorage.getItem('authToken');

    //Form States
    const [title, setTitle] = useState(props.memory.title);
    const [content, setContent] = useState(props.memory.content);
    const [imageUrl, setImageUrl] = useState(props.memory.imageUrl);

    //Function to delete Memory from DB
    const deleteEvent = async (e) => {
        let result = await axios.delete(`${import.meta.env.VITE_API_URL}/api/events/${props.memory._id}`, { headers: { Authorization: `Bearer ${token}` } });
        navigate(`/groups/${props.memory.groupId._id}`)
    }

    //Function to upload File
    const handleFileUpload = (e) => {
        const uploadData = new FormData();
        console.log("The file to be uploaded is: ", e.target.files[0]);
        uploadData.append("imageUrl", e.target.files[0]);

        service
            .uploadImage(uploadData)
            .then((response) => {
                // response carries "fileUrl" which we can use to update the state
                setImageUrl(response.fileUrl);
                console.log("response is: ", response);
            })
            .catch((err) =>
                console.log("Error while uploading the file: ", err)
            );
    };

    //Function to update Memory 
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { title, content, imageUrl };
        axios
            .put(`${import.meta.env.VITE_API_URL}/api/events/${eventId}`,
                requestBody, { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                navigate(`/events/${eventId}`);
            });
    };

    return (

        <div className="flex flex-col items-center justify-center">

            {props.memory && (
                <>
                    {/* Update and Delete buttons */}
                    <div>
                        <button
                            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            onClick={handleFormSubmit}
                            type="submit"
                            form="editForm"
                        >
                            Update
                        </button>

                        <button
                            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                            onClick={deleteEvent}
                        >
                            Delete
                        </button>
                    </div>

                    {/* Form to edit the Memory */}
                    <div className="flex border p-5 m-10 rounded-xl shadow-lg max-w-3xl w-full">
                        <form
                            onSubmit={handleFormSubmit}
                            id="editForm" //This id is mandatory as the submit button is outside the form
                            className="w-full"
                        >
                            <div className="flex flex-col w-full">
                                <div className="flex justify-between p-5">
                                    <div className="flex justify-between">
                                        <img
                                            src={props.memory.userId?.imageUrl}
                                            alt=""
                                            className="h-14 w-14 rounded-full border max-w-xs overflow-hidden"
                                        />
                                        <span className="font-bold text-xl m-2">
                                            {props.memory.userId?.name}
                                        </span>
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="border"
                                />
                                <br />
                                <textarea
                                    name="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="border"
                                />
                                <br />
                                <img
                                    src={imageUrl}
                                    alt=""
                                    className="rounded-lg p-10"
                                />
                                <input
                                    type="file"
                                    name="imageUrl"
                                    onChange={(e) => handleFileUpload(e)}
                                    className="rounded-lg p-10"
                                />
                                <br />
                                <span className="text-right">
                                    {props.memory.createdAt}
                                </span>

                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}

