import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import MemoryCard from "../components/MemoryCard";
import EditMemoryCard from "../components/EditMemoryCard";

function EventDetailsPage(props) {
    //Functional States and Variables
    const [events, setEvents] = useState();
    const { eventId } = useParams();

    //Conditional Visibility States
    const [updateView, setUpdateView] = useState(false);

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

                    <button onClick={() => { setUpdateView(!updateView) }}>Edit Event</button>
                    {updateView
                        ? <EditMemoryCard memory={events} />
                        : <MemoryCard memory={events} />
                    }
                </div>
            )}
        </div>
    );
}

export default EventDetailsPage;
