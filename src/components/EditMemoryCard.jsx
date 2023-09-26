import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";





export default function EditMemoryCard(props) {
    console.log(props);
    const navigate = useNavigate();
    // console.log(props.memory.groupId._id)
    let createdDate = new Date(props.memory.createdAt)

    let timeDiff = Date.now() - createdDate
    let friendlyTimeStamp;

    const API_URL = "http://localhost:5005";


    const deleteEvent = async (e) => {
        e.preventDefault();
        console.log(props.memory._id)
       let result = await  axios.delete(`${API_URL}/api/events/${props.memory._id}`);
       console.log(result);
       navigate(`/groups/${props.memory.groupId._id}`)
    }

    return (
        <div className="flex border p-5 m-10 rounded-xl shadow-lg">

            {props.memory && (

                <>

                    <form action="" className="w-full">
                        <div className="flex flex-col w-full">
                            <div className="flex justify-between p-5">
                                <div className="flex justify-between">
                                    <img src={props.memory.userId?.imageUrl} alt="" className="h-14 w-14 rounded-full border max-w-xs overflow-hidden" />
                                    <span className="font-bold text-xl m-2" >{props.memory.userId?.name}</span>
                                </div>

                            </div>
                            <p className="text-2xl font-normal">{props.memory.title}</p>
                            <br />
                            <p className="text-xl">{props.memory.content}</p>
                            <br />
                            <img src={props.memory.imageUrl} alt="" className="rounded-lg" />
                            <br />
                            {/* <span className="text-right">{props.memory.createdAt}</span> */}


                            <div className=" flex p-2 justify-between">
                                {/* Font Awesome icons */}
                                <i className="far fa-comment" data-testid="comment-icon"></i>
                                <i className="fas fa-retweet" data-testid="retweet-icon"></i>
                                <i className="far fa-heart" data-testid="heart-icon"></i>
                                <i className="fas fa-share" data-testid="share-icon"></i>
                            </div>

                        </div>
                        



                    </form>

                    <a href={`/events/${props.memory._id}`}><i className=""><button className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 "onClick={deleteEvent} >Delete</button></i></a>




                </>





            )}

        </div>
    );
}

