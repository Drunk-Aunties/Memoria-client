import { useState } from "react";
import axios from "axios";
import service from "../services/file-upload.service";

function AddGroup(props) {
    //Functional States & Variables
    let token = localStorage.getItem("authToken");

    //Form States
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("/img/group-chat.jpeg");

    //Conditional Visibility States
    const [showCreateForm, setShowCreateForm] = useState("hidden");

    //Uploads image and stores imageUrl
    const handleFileUpload = (e) => {
        const uploadData = new FormData();
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

    //Creates new Group object ib DB
    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = { name, description, imageUrl };
        axios
            .post(`${import.meta.env.VITE_API_URL}/api/groups`, requestBody, {
                headers: { Authorization: `Bearer ${token}` },
            }) //Headers mandatory for auth verification
            .then((response) => {
                setName("");
                setDescription("");
                setImageUrl("");
                props.refreshGroups();
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            {/* Button to show Group Create Form */}
            <button
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 flex items-center space-x-2"
                onClick={() => {
                    showCreateForm === "hidden"
                        ? setShowCreateForm("visible")
                        : setShowCreateForm("hidden");
                }}
            >
                <img src="/img/logo.png" alt="" className="w-8 inline" />
                Create New Group
            </button>

            {/* Form to create a new Group */}
            <form
                onSubmit={handleSubmit}
                className={`transition-all duration-300 ease-in-out ${showCreateForm}`}
            >
                <div className="flex flex-col border justify-center items-center max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
                    {/* Frame, File Input, Picture Preview, Group Name*/}
                    <div className="flex flex-col space-y-4 items-center">
                        <p className="text-xl font-semibold">
                            Choose a group picture
                        </p>
                        <input
                            id="imgInp"
                            type="file"
                            name="filename"
                            onChange={(e) => handleFileUpload(e)}
                            className="hidden"
                        />
                        <label
                            htmlFor="imgInp"
                            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                        >
                            Select Image
                        </label>
                        <div className="w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
                            <img
                                id="previewPic"
                                src={imageUrl}
                                alt="Preview of the group picture"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Enter your group name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="text-black border p-2 text-center focus:outline-none focus:border-blue-500 rounded-lg"
                        />
                        <hr className="border-gray-300 w-full" />
                    </div>

                    {/* Description */}
                    <div className="mt-4">
                        <textarea
                            rows="4"
                            cols="40"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="text-lg p-2 text-black border rounded-lg resize-none w-full focus:outline-none focus:border-blue-500"
                            placeholder="Enter description here"
                        />
                    </div>

                    {/* Submit Form Button */}
                    <button
                        type="submit"
                        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 transition duration-300 ease-in-out"
                    >
                        Create Group
                    </button>
                </div>
            </form>
        </>
    );
}

export default AddGroup;
