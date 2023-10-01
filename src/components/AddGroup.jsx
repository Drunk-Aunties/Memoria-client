import { useState } from "react";
import axios from "axios";
import service from "../services/file-upload.service";

function AddGroup(props) {
    //Functional States & Variables
    let token = localStorage.getItem("authToken");

    //Form States
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    //Conditional Visibility States
    const [showCreateForm, setShowCreateForm] = useState("hidden");

    //Uploads image and stores imageUrl
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

    //Creates new Group object ib DB
    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = { name, description, imageUrl };
        axios
            .post(`${import.meta.env.VITE_API_URL}/api/groups`, requestBody,
                { headers: { Authorization: `Bearer ${token}` } }) //Headers mandatory for auth verification
            .then((response) => {
                setName("");
                setDescription("");
                setImageUrl("")
                props.refreshGroups();
            })
            .catch((error) => console.log(error));
    };

    return (

        <>
            {/* Button to show Group Create Form */}
            <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                onClick={() => {
                    showCreateForm === "hidden"
                        ? setShowCreateForm("visible")
                        : setShowCreateForm("hidden")
                }}>
                <img src="/public/img/logo.png" alt="" className="w-8 inline" />
                Create New Group
            </button>


            {/* Form to create new Group */}
            <form onSubmit={handleSubmit} className={showCreateForm}>
                <div className="flex flex-col border justify-center ">

                    {/* Frame, File Input, Picture Preview, Group Name*/}
                    <div className=" flex flex-col shadow-lg border-solid border-black bg-stone-100	w-fit items-center pb-8">
                        <p className="text-lg font-bold">Choose a group picture</p>
                        <br />
                        <input id="imgInp" type="file" name="filename"
                            onChange={(e) => handleFileUpload(e)} />

                        <div className="flex justify-center items-center bg-black h-64 w-80 m-5 shadow-[inset_0_-4px_4px_rgba(0,0,0,0.6)]">
                            <img id='previewPic' src={imageUrl} alt="Preview of the group picture" className=" p-0.5" />
                        </div>

                        <input type="text" placeholder="Enter your group name" name="name" value={name} onChange={(e) => setName(e.target.value)}
                            className="font-bold text-xl tracking-widest text-black border p-2 text-center" />
                        <hr />
                    </div>

                    {/* Description*/}
                    <div className="">
                        <textarea
                            rows="4" cols="40"
                            name="description" value={description} onChange={(e) => setDescription(e.target.value)}
                            className="text-lg p-2 text-black border m-2"
                            placeholder="Enter description here" />
                    </div>

                </div>
                <br />
                {/* Submit Form Button */}
                <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Create Group</button>
            </form>
        </>
    );
}

export default AddGroup;
