import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddEvent from "../components/AddEvent";

const API_URL = "http://localhost:5005";

function EventListPage() {
    const [events, setEvents] = useState([]);

    const getAllEvents = () => {
        axios
            .get(`${API_URL}/api/events`)
            .then((response) => setEvents(response.data))
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        getAllEvents();
    }, []);

    return (
        <div className="EventListPage">
            <AddEvent refreshEvents={getAllEvents} />
            {events.map((event) => {
                return (
                    <div className="EventCard card" key={event._id}>
                        <Link to={`/events/${event._id}`}>
                            <h3>{event.title}</h3>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

export default EventListPage;
