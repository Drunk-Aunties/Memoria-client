import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

export default function MemoryCard(props) {
    const [isClicked, setIsClicked] = useState(false);
    const { eventId } = useParams();

    const handleClick = () => {
        setIsClicked(!isClicked);
        onClickFavButton();
    };

    const onClickFavButton = (e) => {
        const requestBody = { favorite: !props.memory.favorite };
        axios.put(
            `${import.meta.env.VITE_API_URL}/api/events/${props.memory._id}`,
            requestBody
        );
        // .then((response) => {
        //     navigate(`/events/${eventId}`);
        // });
    };

    let createdDate = new Date(props.memory.createdAt);
    let timeDiff = Date.now() - createdDate;
    let friendlyTimeStamp;

    if (timeDiff > 864000000) {
        friendlyTimeStamp = `on ${props.memory.createdAt.slice(0, 10)}`;
    } else if (timeDiff > 172800000) {
        friendlyTimeStamp = `${Math.floor(timeDiff / 86400000)} days ago`;
    } else if (timeDiff > 86400000) {
        friendlyTimeStamp = `${Math.floor(timeDiff / 86400000)} day ago`;
    } else if (timeDiff > 7200000) {
        friendlyTimeStamp = `${Math.floor(timeDiff / 3600000)} hours ago`;
    } else if (timeDiff > 3600000) {
        friendlyTimeStamp = `${Math.floor(timeDiff / 3540000)} hour ago`;
    } else if (timeDiff > 120000) {
        friendlyTimeStamp = `${Math.floor(timeDiff / 60000)} minutes ago`;
    } else {
        friendlyTimeStamp = `just now`;
    }

    console.log(props.memory);

    return (
        <div className="flex border p-5 m-10 rounded-xl shadow-lg">
            {props.memory && (
                <>
                    <div className="flex flex-col w-full">
                        <div className="flex justify-between p-5">
                            <div className="flex justify-between">

                                <a href={`/events/${props.memory._id}`}><img
                                    src={props.memory.userId?.imageUrl}
                                    alt=""
                                    className="h-14 w-14 rounded-full border max-w-xs overflow-hidden"
                                /></a>
                                
                                <span className="font-bold text-xl m-2">
                                    {props.memory.userId?.name}
                                </span>
                            </div>

                            <div>
                                <p className="timestamp text-right justify-self-end">
                                    {friendlyTimeStamp}
                                </p>
                            </div>
                        </div>
                        <p className="text-2xl font-normal">
                            {props.memory.title}
                        </p>
                        <br />
                        <p className="text-xl">{props.memory.content}</p>
                        <br />
                        <img
                            src={props.memory.imageUrl}
                            alt=""
                            className="rounded-lg"
                        />
                        <br />
                        <span className="text-right">
                            {props.memory.createdAt}
                        </span>

                        <div className=" flex p-2 justify-between">
                            {/* Font Awesome icons */}
                            <i
                                className="far fa-comment"
                                data-testid="comment-icon"
                            ></i>
                            <i
                                className="fas fa-retweet"
                                data-testid="retweet-icon"
                            ></i>
                            <button
                                type="button"
                                id="FavTestId"
                                onClick={handleClick}
                                data-cy="FavTest"
                            >
                                {props.memory.favorite || isClicked ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="30"
                                        height="30"
                                        fill="red"
                                        className="bi bi-heart-fill"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="30"
                                        height="30"
                                        fill="red"
                                        className="bi bi-heart"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                    </svg>
                                )}
                            </button>
                            <i
                                className="fas fa-share"
                                data-testid="share-icon"
                            ></i>
                        </div>
                    </div>

                    <a href={`/events/${props.memory._id}`}>
                        <i className="fas fa-ellipsis-h"></i>
                    </a>
                </>
            )}
        </div>
    );
}
