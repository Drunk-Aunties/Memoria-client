import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddGroup from "../components/AddGroup";

const API_URL = "http://localhost:5005";

function GroupListPage() {
    const [groups, setGroups] = useState([]);

    const getAllGroups = () => {
        axios
            .get(`${API_URL}/api/groups`)
            .then((response) => setGroups(response.data))
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        getAllGroups();
    }, []);

    return (
        <div className="flex justify-center gap-10 p-10">
            <div className="flex-col gap-20 w-1/2 m-2 border">
            {groups.map((group) => {
                return (
                    <div className="GroupCard card shadow border m-2 hover:bg-gray-100" key={group._id}>
                        <Link to={`/groups/${group._id}`}>
                            <h3>{group.name}</h3>
                            <h2>{group.description}</h2>
                        </Link>
                    </div>
                );
            })}
            </div>
            
            <AddGroup refreshGroups={getAllGroups} />

        </div>
    );
}

export default GroupListPage;
