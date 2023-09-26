import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function UserDetailsPage(props) {
    const [users, setUsers] = useState([]);
    const { userId } = useParams();

    const getUser = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/users/${userId}`)
            .then((response) => {
                const oneUser = response.data;
                console.log(oneUser);
                setUsers(oneUser);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className="UserDetails">
            {users && (
                <>
                    <h1>
                        Welcome {users.name} {users.lastname}
                    </h1>
                    <img src={users.imageUrl} alt="user" width="200" />
                    <p>Your Birthday: {users.birthdate}</p>
                </>
            )}
            <Link to="/users">
                <button>Back to Users</button>
            </Link>
            <Link to={`/users/edit/${userId}`}>
                <button>Edit User</button>
            </Link>
        </div>
    );
}

export default UserDetailsPage;
