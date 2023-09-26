// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const API_URL = "http://localhost:5005";

// function EditEventPage(props) {
//     const [title, setTitle] = useState("");
//     const [content, setContent] = useState("");
//     const { eventId } = useParams();
//     const navigate = useNavigate();

//     useEffect(() => {
//         axios
//             .get(`${API_URL}/api/events/${eventId}`)
//             .then((response) => {
//                 const oneEvent = response.data;
//                 setTitle(oneEvent.title);
//                 setContent(oneEvent.content);
//             })
//             .catch((error) => console.log(error));
//     }, [eventId]);

//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         const requestBody = { title, content };
//         axios
//             .put(`${API_URL}/api/events/${eventId}`, requestBody)
//             .then((response) => {
//                 navigate(`/events/${eventId}`);
//             });
//     };

//     const deleteEvent = () => {
//         axios
//             .delete(`${API_URL}/api/events/${eventId}`)
//             .then(() => {
//                 navigate("/events");
//             })
//             .catch((err) => console.log(err));
//     };

//     return (
//         <div className="EditEventPage">
//             <h3>Edit the Event</h3>

//             <form onSubmit={handleFormSubmit}>
//                 <label>Title:</label>
//                 <input
//                     type="text"
//                     name="title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                 />

//                 <label>Content:</label>
//                 <textarea
//                     name="content"
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}
//                 />

//                 <input type="submit" value="Submit" />
//             </form>
//             <button onClick={deleteEvent}>Delete Event</button>
//         </div>
//     );
// }

// export default EditEventPage;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function EditEventPage(props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [event, setEvent] = useState();
    const { eventId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${API_URL}/api/events/${eventId}`)
            .then((response) => {
                const oneEvent = response.data;
                setEvent(oneEvent);
                setTitle(oneEvent.title);
                setContent(oneEvent.content);
            })
            .catch((error) => console.log(error));
    }, [eventId]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { title, content };
        axios
            .put(`${API_URL}/api/events/${eventId}`, requestBody)
            .then((response) => {
                navigate(`/events/${eventId}`);
            });
    };

    const deleteEvent = () => {
        axios
            .delete(`${API_URL}/api/events/${eventId}`)
            .then(() => {
                navigate(`/groups/${event.groupId._id}`);
            })
            .catch((err) => console.log(err));
    };

    return (

        
        <div className="flex flex-col items-center justify-center">
            <br />

            {event && (
                <>

            
            <div>
                <button className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={handleFormSubmit} type="submit" form="editForm">Update</button>

                <button className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 " onClick={deleteEvent} >Delete</button>

            </div>


            <div className="flex border p-5 m-10 rounded-xl shadow-lg max-w-3xl w-full">

                        <form onSubmit={handleFormSubmit} id="editForm" className="w-full">
                            <div className="flex flex-col w-full">
                                <div className="flex justify-between p-5">
                                    <div className="flex justify-between">
                                        <img src={event.userId?.imageUrl} alt="" className="h-14 w-14 rounded-full border max-w-xs overflow-hidden" />
                                        <span className="font-bold text-xl m-2" >{event.userId?.name}</span>
                                    </div>

                                </div>
                                <input
                                    type="text"
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="border"
                                />
                                <br />
                                <textarea
                                    name="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="border"
                                />                            <br />
                                <img src={event.imageUrl} alt="" className="rounded-lg p-10" />
                                <br />
                                <span className="text-right">{event.createdAt}</span>


                                <div className=" flex p-2 justify-between">
                                    {/* Font Awesome icons */}
                                    <i className="far fa-comment" data-testid="comment-icon"></i>
                                    <i className="fas fa-retweet" data-testid="retweet-icon"></i>
                                    <i className="far fa-heart" data-testid="heart-icon"></i>
                                    <i className="fas fa-share" data-testid="share-icon"></i>
                                </div>


                                {/* <button><input type="submit" value="Submit" />Edit my memory</button> */}

                            </div>


                        </form>
                        </div>

                    </>


                )}

            

        </div>

    );
}

export default EditEventPage;
