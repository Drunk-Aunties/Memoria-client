import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";


export default function MemoryCard(props) {
    let createdDate = new Date(props.memory.createdAt)

    let timeDiff = Date.now() - createdDate
    let friendlyTimeStamp;


    if (timeDiff > 864000000) { friendlyTimeStamp = `on ${props.memory.createdAt.slice(0, 10)}` }
    else if (timeDiff > 172800000) { friendlyTimeStamp = `${Math.floor(timeDiff / 86400000)} days ago` }
    else if (timeDiff > 86400000) { friendlyTimeStamp = `${Math.floor(timeDiff / 86400000)} day ago` }
    else if (timeDiff > 7200000) { friendlyTimeStamp = `${Math.floor(timeDiff / 3600000)} hours ago` }
    else if (timeDiff > 3600000) { friendlyTimeStamp = `${Math.floor(timeDiff / 3540000)} hour ago` }
    else if (timeDiff > 120000) { friendlyTimeStamp = `${Math.floor(timeDiff / 60000)} minutes ago` }
    else { friendlyTimeStamp = `just now` }

    return (
        <div className="flex border p-5 m-10 rounded-xl shadow-lg">



            <div className="flex flex-col w-full">
                <div className="flex justify-between p-5">
                    <div className="flex justify-between">
                    <img src={props.memory.userId.imageUrl} alt="" className="max-h-14 rounded-full border" />
                    <span className="font-bold text-xl m-2" >{props.memory.userId?.name}</span>
                    </div>

                    <div>
                    <p className="timestamp text-right justify-self-end">{friendlyTimeStamp}</p>
                    </div>
                    
                    

                </div>
                <p>{props.memory.content}</p>
                <img src={props.memory.imageUrl} alt="" className="rounded-lg" />
                <br />
                <span className="text-right">{props.memory.createdAt.slice(0, 10)}</span>


                <div className=" flex p-2 justify-between">
                    {/* Font Awesome icons */}
                    <i className="far fa-comment" data-testid="comment-icon"></i>
                    <i className="fas fa-retweet" data-testid="retweet-icon"></i>
                    <i className="far fa-heart" data-testid="heart-icon"></i>
                    <i className="fas fa-share" data-testid="share-icon"></i>
                </div>

            </div>

            <i className="fas fa-ellipsis-h"></i>
        </div>
    );
}

