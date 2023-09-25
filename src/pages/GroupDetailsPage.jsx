import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddEvent from "../components/AddEvent";
import AddGroupMember from "../components/AddGoupMember";

const API_URL = "http://localhost:5005";

function GroupDetailsPage(props) {
    const navigate = useNavigate();
    const [group, setGroup] = useState(null);
    const [memories, setMemories] = useState([]);
    const { groupId } = useParams();
    let token = localStorage.getItem("authToken");

    const getGroup = () => {
        axios
            .get(`${API_URL}/api/groups/${groupId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                const oneGroup = response.data;
                setGroup(oneGroup);
            })
            .catch((error) => {
                error &&
                    navigate("/error", {
                        state: {
                            id: error.response.status,
                            message: error.response.statusText,
                            reason: error.response.data.message,
                        },
                    });
                console.log(error);
            });
    };

    const getEvent = () => {
        axios
            .get(`${API_URL}/api/groups/${groupId}/events`)
            .then((response) => setMemories(response.data))
            .catch((error) => {
                error &&
                    navigate("/error", {
                        state: {
                            id: error.response.status,
                            message: error.response.statusText,
                            reason: error.response.data.message,
                        },
                    });
                console.log(error);
            });
    };
    useEffect(() => {
        getGroup();
        getEvent();
    }, []);

    return (
        <div className="GroupDetails w-full p-10">
            <div className="flex items-end gap-10">
                {group && (
                    <>
                        <h1>{group.name}</h1>
                        <p>{group.description}</p>
                        <img src={group.imageUrl} alt="event" width="200" />
                    </>
                )}
            </div>
            <div className="flex p-10 gap-10">
                <div className="flex-col w-1/2 justify-start border ">
                    {group?.members
                        ? group.members.map((member) => {
                              return <p key={member._id}>{member.name}</p>;
                          })
                        : null}
                    <br />
                    <AddGroupMember
                        members={group?.members}
                        fnUpdate={getGroup}
                    />
                </div>
                <div className="flex flex-col border">
                    <AddEvent refreshGroup={getEvent} groupId={groupId} />


                    {memories &&
                        memories.map((memory) => (
                            <div className="EventCard card" key={memory._id}>
                                <h3>{memory.title}</h3>
                                <h4>Description:</h4>
                                <p>{memory.content}</p>
                                <img src={memory.imageUrl} alt="" />
                            </div>
                        ))}
                </div>
            </div>
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
