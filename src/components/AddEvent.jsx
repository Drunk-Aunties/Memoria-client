import { useContext, useState } from "react";
import axios from "axios";
import service from "../services/file-upload.service";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function AddEvent(props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [showAddEvent, setShowAddEvent] = useState(false);
    const navigate = useNavigate();
    const [showCreateForm, setShowCreateForm] = useState("hidden");

    const { isLoggedIn, user } = useContext(AuthContext);

    let token = localStorage.getItem("authToken");

    const toggleAddVisibility = () => {
        setShowAddEvent(!showAddEvent);
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const { groupId } = props;
        const requestBody = { title, content, groupId, imageUrl };

        axios
            .post(`${import.meta.env.VITE_API_URL}/api/events`, requestBody, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setTitle("");
                setContent("");
                setImageUrl("");
                setShowCreateForm("hidden");
                props.refreshEvents();
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="flex flex-col items-center justify-center m-10">
            <br />
            <button
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                onClick={() => {
                    showCreateForm === "hidden"
                        ? setShowCreateForm("visible")
                        : setShowCreateForm("hidden");
                }}
            >
                {" "}
                Add a Memory
            </button>

            {user && (
                <>
                    <div
                        className={
                            "flex border p-5 m-10 rounded-xl shadow-lg max-w-3xl w-full " +
                            showCreateForm
                        }
                    >
                        <form
                            onSubmit={handleSubmit}
                            id="addForm"
                            className="w-full"
                        >
                            <div className="flex flex-col w-full">
                                <div className="flex justify-between p-5">
                                    <div className="flex justify-between">
                                        <img
                                            src={
                                                user.imageUrl
                                                    ? user.imageUrl
                                                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                            }
                                            alt=""
                                            className="h-14 w-14 rounded-full border max-w-xs overflow-hidden"
                                        />
                                        <span className="font-bold text-xl m-2">
                                            {user.name}
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
                            </div>
                            <div>
                                <button
                                    className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                    onClick={handleSubmit}
                                    type="submit"
                                    form="addForm"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}

export default AddEvent;
