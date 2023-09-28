import { useState } from "react";
import axios from "axios";
import service from "../services/file-upload.service";
import { useNavigate } from "react-router-dom";

function AddEvent(props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [showAddEvent, setShowAddEvent] = useState(false);
    const navigate = useNavigate();

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
                props.refreshEvents();
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="AddEvent">
            <button onClick={toggleAddVisibility}>Add New Memory</button>
            {showAddEvent && (
                <>
                    <form onSubmit={handleSubmit}>
                        <br />
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <br />
                        <br />
                        <hr />
                        <br />
                        <label>Content:</label>
                        <textarea
                            type="text"
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <br />
                        <br />
                        <hr />
                        <br />
                        <input
                            type="file"
                            onChange={(e) => handleFileUpload(e)}
                        />
                        <br />
                        <br />
                        <button type="submit">Add Event</button>
                    </form>
                </>
            )}
        </div>
    );
}

export default AddEvent;
