import React, { useState } from "react";
import axios from "axios";
import AddComment from "./AddComment";
import { toast } from 'react-toastify';
import { fnFriendlyTimeStamp } from '../services/general.services';
import { svgHeart } from "../services/html-design.services";

export default function MemoryCard(props) {

    //Functional States and variables 
    let token = localStorage.getItem("authToken");

    //Conditional visibility states
    const [showComments, setShowComments] = useState(false);
    const [isClicked, setIsClicked] = useState(props.memory.favorite);

    const handleClick = () => {
        setIsClicked(!isClicked);
        onClickFavButton();
    };
    const toggleCommentsVisibility = () => {
        setShowComments(!showComments);
    };
    const onClickFavButton = () => {
        const requestBody = { favorite: !props.memory.favorite };
        axios
            .put(`${import.meta.env.VITE_API_URL}/api/events/${props.memory._id}`, requestBody,
                { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                props.onFavCallback();
            });
    };

    // MVP Alternative to copy to clipboard for the sharing feature
    const copyToClipboard = () => {
        navigator.clipboard.writeText('https://memoriapp.netlify.app/events/' + props.memory._id);
        notify();
    }

    const notify = () => toast('Link to Memory copied to clipboard', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    return (

        <div className="flex border p-5 m-5 rounded-xl shadow-lg">

            {props.memory && (
                <>
                    <div className="flex flex-col w-full">

                        {/* Profile Picture, UserName, TimeStamp */}
                        <div className="flex justify-between p-5">
                            <div className="flex justify-between">
                                <a href={`/events/${props.memory._id}`}>
                                    <img
                                        src={props.memory.userId?.imageUrl}
                                        alt="Profile Picture of the user"
                                        className="h-12 w-12 rounded-full border max-w-xs overflow-hidden"
                                    />
                                </a>
                                <span className="font-normal text-lg m-2">{props.memory.userId?.name}</span>
                            </div>

                            <div>
                                <p className="timestamp text-right justify-self-end text-sm">{fnFriendlyTimeStamp(props.memory.createdAt)}</p>
                            </div>
                        </div>


                        {/* Title, Content, Picture */}
                        <p className="text-lg font-semibold">{props.memory.title}</p>
                        <p className="text-md font-normal text-left m-2">{props.memory.content}</p>
                        {props.memory.imageUrl &&
                        (
                            <img
                            src={props.memory.imageUrl}
                            alt="Picture posted by the user illustrating the memory"
                            className="rounded-lg w-full self-center"
                        />
                        )}
                        
                        <br />


                        {/* Action bar and icons */}
                        <div className=" flex pl-2 justify-end items-center">

                            {/* Comments */}
                            <button onClick={toggleCommentsVisibility}>
                                <i className="far fa-comment" data-testid="comment-icon"></i>{" "}
                                {props.memory.comments.length}
                            </button>

                            {/* Favorite */}
                            <button type="button" id="FavTestId" onClick={handleClick} data-cy="FavTest">
                                {isClicked
                                    ? svgHeart(22, 22, true)
                                    : svgHeart(22, 22, false)}
                            </button>

                            {/* Share */}
                            <button>
                                <i className="fas fa-share" data-testid="share-icon" onClick={copyToClipboard}></i>
                            </button>
                        </div>


                        {/* Comment Section */}
                        {props.memory.comments.map((comment, index) => {
                            return (
                                <div key={index}>
                                    {showComments && (
                                        <>
                                            <hr className="border-t border-gray-300 w-full" />
                                            <div className="flex items-center w-full">
                                                <i className="far fa-comment text-left" data-testid="comment-icon"></i>
                                                <span className="mx-auto">{comment.text}</span>
                                                <p>{comment.owner}</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })}

                        {/* Add Comment Section */}
                        <div>
                            <AddComment infoEvent={props.memory} members={props.members} onFavCallback={props.onFavCallback} />
                        </div>

                    </div>

                    {/* Details icons (top right of the card) */}
                    <a href={`/events/${props.memory._id}`}><i className="fas fa-ellipsis-h"></i></a>
                </>
            )}
        </div>
    );
}
