import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function EditGroupPage(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const { groupId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${API_URL}/api/groups/${groupId}`)
            .then((response) => {
                const oneGroup = response.data;
                setName(oneGroup.name);
                setDescription(oneGroup.description);
            })
            .catch((error) => console.log(error));
    }, [groupId]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { title, description };
        axios
            .put(`${API_URL}/api/groups/${groupId}`, requestBody)
            .then((response) => {
                navigate(`/groups/${groupId}`);
            });
    };

    const deleteGroup = () => {
        axios
            .delete(`${API_URL}/api/groups/${groupId}`)
            .then(() => {
                navigate("/groups");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="EditGroupPage">
            <h3>Edit the Group</h3>

            <form onSubmit={handleFormSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label>Description:</label>
                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <input type="submit" value="Submit" />
            </form>
            <button onClick={deleteGroup}>Delete Group</button>
        </div>
    );
}

export default EditGroupPage;
