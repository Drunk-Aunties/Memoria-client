import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import AddEvent from "../components/AddEvent";
import MemoryCard from "../components/MemoryCard";

const API_URL = "http://localhost:5005";

function EventListPage() {
    const [memories, setMemories] = useState([]);
    const { groupId } = useParams();

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
        getEvent();
    }, []);


    return (
        <>
        <p>hello</p>
        <div className="EventListPage">
            <div className="flex flex-col border max-w-2xl">
                <AddEvent refreshEvents={getEvent} groupId = {groupId}/>
                {memories &&
                    memories.map((memory) => (
                        <NavLink to={`/events/${memory._id}`} key = {memory._id}>
                            <MemoryCard memory={memory} key={memory._id} />
                        </NavLink>
                    ))}
            </div>
        </div>
        
        </>
        
    );
}

export default EventListPage;
