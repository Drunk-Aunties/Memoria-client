import { useState, useEffect } from "react";
import axios from "axios";
import AddGroup from "../components/AddGroup";
import GroupCard from "../components/GroupCard";

function GroupListPage() {
    let token = localStorage.getItem("authToken");
    const [groups, setGroups] = useState([]);

    const getAllGroups = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/groups`, {
                headers: { Authorization: `Bearer ${token}` },
            })
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
                    return group ? (
                        <GroupCard group={group} key={group._id}></GroupCard>
                    ) : (
                        <p>Loading....</p>
                    );
                })}
            </div>
        </div>
    );
}

export default GroupListPage;
