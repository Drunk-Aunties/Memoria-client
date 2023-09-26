import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddGroupMember from "../components/AddGoupMember";
import EventListPage from "../pages/EventListPage";

function GroupDetailsPage(props) {
    const navigate = useNavigate();
    const [group, setGroup] = useState(null);
    const { groupId } = useParams();
    let token = localStorage.getItem("authToken");

    const getGroup = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/groups/${groupId}`, {
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

    useEffect(() => {
        getGroup();
    }, []);

    return (
        <div className="w-screen p-10">
            <div className="flex items-end gap-10">
                {group && (
                    <>
                        <h1>{group.name}</h1>
                        <p>{group.description}</p>
                        <img src={group.imageUrl} alt="event" width="200" />
                    </>
                )}
            </div>
            <div className="flex p-10 gap-10 justify-center">
                <div className="flex-col w-1/2 justify-start border max-w-sm">
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
                <EventListPage />
                {console.log(group)}
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
