import { Link } from "react-router-dom";

export default function GroupCard(props) {
    return (
        <div key={props.group._id}>
            <Link to={`/groups/${props.group._id}`}>
                <div className="flex flex-col border transition-transform transform hover:scale-95 duration-300 ease-in-out">
                    {/* Frame, Picture and Name */}
                    <div className="flex flex-col shadow-lg border-solid border-black bg-stone-100 w-fit items-center pb-8">
                        <div className="flex justify-center items-center bg-black h-64 w-80 m-5 rounded-lg shadow-md transition-transform transform hover:scale-95 duration-300 ease-in-out">
                            <img
                                src={
                                    props.group.imageUrl
                                        ? props.group.imageUrl
                                        : "/public/img/logo.png"
                                }
                                alt="Group Image"
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                        <p className="font-bold text-xl tracking-widest text-black">
                            {props.group.name}
                        </p>
                    </div>

                    {/* Description and members */}
                    <div className="mt-2 text-center">
                        <p className="text-md font-normal p-2 text-black w-80">
                            {props.group.description}
                        </p>
                        <p className="p-2 text-sm text-gray-600">
                            {props.group.members.length} members
                        </p>

                        {/* Members displayed with profile picture */}
                        <div className="flex justify-center space-x-2 mt-2">
                            {props.group.members
                                .filter((member, idx) => idx < 5) // Limits the preview to 5 members max
                                .map((member) => (
                                    <img
                                        key={member._id}
                                        src={
                                            member.imageUrl
                                                ? member.imageUrl
                                                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                        }
                                        alt="Member profile picture"
                                        className="h-10 w-10 rounded-full border inline hover:scale-95 duration-300 ease-in-out"
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
