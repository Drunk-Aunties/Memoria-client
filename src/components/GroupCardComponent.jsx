import { Link } from "react-router-dom";






export default function GroupCard(props) {



    return (
        


        <div key={props.group._id}>

            <Link to={`/groups/${props.group._id}`}>
                <div  className="flex flex-col border justify-center ">

                    {/* frame and pic and name  */}
                    <div className=" flex flex-col shadow-lg border-solid border-black bg-stone-100	w-fit items-center pb-8">
                        <div className="flex justify-center items-center bg-black h-64 w-80 m-5 shadow-[inset_0_-4px_4px_rgba(0,0,0,0.6)]">
                            <img src={
                                props.group.imageUrl
                                    ? props.group.imageUrl
                                    : 'public/img/logo.png'} alt=""
                                className=" p-0.5" />

                        </div>


                        <p className="font-bold text-xl tracking-widest text-black ">{props.group.name}</p>
                        <hr />
                    </div>

                    {/* description and members  */}
                    <div className="">
                        <p className=" text-lg p-2 text-black">{props.group.description}</p>
                        <hr />
                        <p className="p-2 text-black">{props.group.members.length} members</p>
                        <hr />
                        {
                            props.group.members.filter((member, idx) => idx < 5).map(member => {
                                return (

                                    <img 
                                    key = {member._id}
                                    src={member.imageUrl
                                        ? member.imageUrl
                                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" className="h-14  w-14 rounded-full border inline m-2" />
                                )
                            })
                        }
                    </div>
                </div>
            </Link>

        </div>
    );
}

