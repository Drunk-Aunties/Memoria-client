import { useState } from "react";
import axios from "axios";

function AddComment(props) {
    const [comments, setComments] = useState("");
    let token = localStorage.getItem("authToken");

    // API call to update event passing comment in body
    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .put(`${import.meta.env.VITE_API_URL}/api/events/${props.infoEvent._id}`,
                { comments },
                { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                setComments("");
                props.onFavCallback();
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
                    className="border w-full p-5 mt-2 rounded-lg"
                />
                <button type="submit" className="bg-gray-100 border">Send</button>
            </form>
        </div>
    );
}

export default AddComment;
