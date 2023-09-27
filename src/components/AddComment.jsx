import { useState } from "react";
import axios from "axios";

function AddComment(props) {
    const [comments, setComments] = useState("");
    let token = localStorage.getItem("authToken");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newComment = comments;

        axios
            .put(
                `${import.meta.env.VITE_API_URL}/api/events/${
                    props.infoEvent._id
                }`,
                { comments },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                setComments("");
                // props.infoEvent.refreshEvents();
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="AddComment">
            <form onSubmit={handleSubmit}>
                <textarea
                    type="text"
                    name="comments"
                    placeholder="Add Comment"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default AddComment;
