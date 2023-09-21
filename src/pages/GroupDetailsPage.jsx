import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddEvent from "../components/AddEvent";

const API_URL = "http://localhost:5005";

function GroupDetailsPage(props) {
    const [group, setGroup] = useState(null);
    const { groupId } = useParams();

    const getGroup = () => {
        axios
            .get(`${API_URL}/api/groups/${groupId}`)
            .then((response) => {
                const oneGroup = response.data;
                setGroup(oneGroup);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getGroup();
    }, []);

    return (
        <div className="GroupDetails">
            {group && (
                <>
                    <h1>{group.title}</h1>
                    <p>{group.description}</p>
                </>
            )}
            <AddEvent refreshGroup={getGroup} groupId={groupId} />
            {group &&
                group.events.map((event) => (
                    <li className="EventCard card" key={event._id}>
                        <h3>{event.title}</h3>
                        <h4>Description:</h4>
                        <p>{event.description}</p>
                    </li>
                ))}

            <Link to="/groups">
                <button>Back to Groups</button>
            </Link>
            <Link to={`/groups/edit/${groupId}`}>
                <button>Edit Group</button>
            </Link>
        </div>
    );
}

export default GroupDetailsPage;
