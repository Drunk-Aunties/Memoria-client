import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddEvent from "../components/AddEvent";

const API_URL = "http://localhost:5005";

function EventDetailsPage(props) {
    const [event, setEvents] = useState(null);
    const { eventId } = useParams();

    const getEvent = () => {
        axios
            .get(`${API_URL}/api/events/${eventId}`)
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
        <div className="EventDetails">
            {event && (
                <>
                    <h1>{event.title}</h1>
                    <p>{event.content}</p>
                </>
            )}
            <AddEvent refreshEvent={getEvent} eventId={eventId} />
            {event &&
                event.map((e) => (
                    <li className="EventCard card" key={e._id}>
                        <h3>{e.title}</h3>
                        <h4>Content:</h4>
                        <p>{e.content}</p>
                    </li>
                ))}

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
