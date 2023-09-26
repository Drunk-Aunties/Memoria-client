import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import service from "../services/file-upload.service";
import axios from "axios";

function EditUserPage(props) {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/users/id/${userId}`)
            .then((response) => {
                const oneUser = response.data;
                setName(oneUser.name);
                setLastname(oneUser.lastname);
                setBirthdate(oneUser.birthdate);
                setImageUrl(oneUser.imageUrl);
            })
            .catch((error) => console.log(error));
    }, [userId]);

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

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { name, lastname, imageUrl, birthdate };
        axios
            .put(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, requestBody)
            .then((response) => {
                navigate(`/users/${userId}`);
            });
    };

    const deleteUser = () => {
        axios
            .delete(`${import.meta.env.VITE_API_URL}/api/users/${userId}`)
            .then(() => {
                navigate("/users");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="EditUserPage">
            <h3>Edit User</h3>

            <form onSubmit={handleFormSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Last Name:</label>
                <input
                    type="text"
                    name="lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
                <label>Birthdate:</label>
                <input
                    type="date"
                    name="birthdate"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                />

                <label>Picture:</label>
                <input type="file" onChange={(e) => handleFileUpload(e)} />

                <input type="submit" value="Submit" />
            </form>
            <button onClick={deleteUser}>Delete User</button>
        </div>
    );
}

export default EditUserPage;
