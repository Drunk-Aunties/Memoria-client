import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import MemoryCard from "../components/MemoryCard";

function EventDetailsPage(props) {
    const [events, setEvents] = useState();
    const { eventId } = useParams();

    const getEvent = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/events/${eventId}`)
            .then((response) => {
                const oneEvent = response.data;
                setEvents(oneEvent);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getEvent();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            {events && (
                <div className="w-full max-w-3xl">
                    <Link to={`/groups/${events.groupId._id}`}>
                        <button>Back to Events</button>
                    </Link>
                    <Link to={`/events/${eventId}/edit/`}>
                        <button>Edit Event</button>
                    </Link>
                    <MemoryCard memory={events} />
                </div>
            )}
        </div>
    );
}

export default EventDetailsPage;
