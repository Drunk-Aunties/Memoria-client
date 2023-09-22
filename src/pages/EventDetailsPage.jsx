import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddEvent from "../components/AddEvent";

const API_URL = "http://localhost:5005";

function EventDetailsPage(props) {
    const [events, setEvents] = useState([]);
    const { eventId } = useParams();

    const getEvent = () => {
        axios
            .get(`${API_URL}/api/events/${eventId}`)
            .then((response) => {
                const oneEvent = response.data;
                console.log(oneEvent);
                setEvents(oneEvent);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getEvent();
    }, []);

    return (
        <div className="EventDetails">
            {events && (
                <>
                    <h1>{events.title}</h1>
                    <h4>Content:</h4>
                    <p>{events.content}</p>
                    <img src={events.imageUrl} alt="event" width="200" />
                </>
            )}
            <AddEvent refreshEvent={getEvent} eventId={eventId} />

            <Link to="/events">
                <button>Back to Events</button>
            </Link>
            <Link to={`/events/edit/${eventId}`}>
                <button>Edit Event</button>
            </Link>
        </div>
    );
}

export default EventDetailsPage;
