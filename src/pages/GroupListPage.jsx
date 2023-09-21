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
        <div className="GroupListPage">
            <AddGroup refreshGroups={getAllGroups} />
            {groups.map((group) => {
                return (
                    <div className="GroupCard card" key={group._id}>
                        <Link to={`/groups/${group._id}`}>
                            <h3>{group.name}</h3>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

export default GroupListPage;
