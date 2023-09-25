import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";


export default function MemoryCard(props) {
    console.log(props.memory.createdAt);
    let time = Date.now() - props.memory.createdAt;
    let date = new Date (props.memory.createdAt)
    let time2 = Date.now() - date
    let secs = time2/1000/60
    console.log(secs);




    return (
        <div className="flex border p-5 m-10 rounded-xl shadow-lg">



            <div className="flex flex-col">
                <div className="flex">
                    <img src={props.memory.userId.imageUrl} alt="" className="max-h-14 rounded-full border" />
                    <span className="font-bold text-xl m-2" >{props.memory.userId?.name}</span>
                    <hr />
                    <span className="timestamp">{props.memory.createdAt}</span>

                </div>
                <p>{props.memory.content}</p>
                <img src={props.memory.imageUrl} alt="" className="rounded-lg" />
                <br />


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

