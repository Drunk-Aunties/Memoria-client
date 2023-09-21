import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function AddGroup(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = { name, description };
        axios
            .post(`${API_URL}/api/groups`, requestBody)
            .then((response) => {
                setName("");
                setDescription("");
                props.refreshProjects();
            })
            .catch((error) => console.log(error));
    };
    return (
        <div className="AddProject">
            <h3>Add Group</h3>

            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label>Description:</label>
                <textarea
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddGroup;
