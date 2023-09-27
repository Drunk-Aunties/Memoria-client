import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddGroup from "../components/AddGroup";

function GroupListPage() {
    let token = localStorage.getItem('authToken');
    const [groups, setGroups] = useState([]);

    const getAllGroups = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/groups`,
                { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => setGroups(response.data))
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        getAllGroups();
    }, []);

    return (
        <div className="flex flex-col w-full justify-center items-center gap-10 p-2">

            <AddGroup refreshGroups={getAllGroups} />
            <div className="flex flex-wrap max-w-screen-xl gap-10">
                {groups.map((group) => {
                    return (
                        <div key={group._id} className="flex flex-col border justify-center ">

                            {/* frame and pic and name  */}
                            <div className=" flex flex-col shadow-lg border-solid border-black bg-stone-100	w-fit items-center pb-8">
                                <div className="flex justify-center items-center bg-black h-64 w-80 m-5 shadow-[inset_0_-4px_4px_rgba(0,0,0,0.6)]">
                                    <img src={
                                        group.imageUrl
                                            ? group.imageUrl
                                            : 'public/img/logo.png'} alt=""
                                        className=" p-0.5" />

                                </div>


                                <p className="font-bold text-xl tracking-widest ">{group.name}</p>
                                <hr />
                            </div>
                            {/* frame and pic and name  */}


                            <div className="">
                                <p className=" text-lg p-2">{group.description}</p>
                                <hr />
                                <p className="p-2">{group.members.length} members</p>
                                <hr />
                                {
                                    group.members.filter((member, idx) => idx < 5).map(member => {
                                        return (
                                        
                                                <img src={member.imageUrl
                                                ?member.imageUrl
                                            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" className="h-14  w-14 rounded-full border inline m-2" />
                                    

                                        )
                                    })
                                }





                            </div>





                        </div>







                    );
                })}
            </div>


        </div>
    );
}

export default GroupListPage;
