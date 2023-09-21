import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function AddEvent(props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const { groupId } = props;
        const requestBody = { title, description, groupId };

        axios
            .post(`${API_URL}/api/events`, requestBody)
            .then((response) => {
                setTitle("");
                setContent("");
                props.refreshGroup();
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="AddEvent">
            <h3>Add New Event</h3>

            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Content:</label>
                <textarea
                    type="text"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button type="submit">Add Event</button>
            </form>
        </div>
    );
}

export default AddEvent;
