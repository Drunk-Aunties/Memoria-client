import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import AddEvent from "../components/AddEvent";
import MemoryCard from "../components/MemoryCard";

function EventListPage() {
    const [memories, setMemories] = useState([]);
    const { groupId } = useParams();

    const getEvent = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/groups/${groupId}/events`)
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
        <div className="EventListPage">
            <div className="flex flex-col border max-w-2xl">
                <AddEvent refreshEvents={getEvent} groupId = {groupId}/>
                {memories &&
                    memories.map((memory) => (
                            <MemoryCard memory={memory} key={memory._id}  />
                    ))}
            </div>
        </div>
        
        </>
        
    );
}

export default EventListPage;
