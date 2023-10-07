import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import AddGroup from "../components/AddGroup";
import GroupCard from "../components/GroupCard";
import IntroPage from "../components/IntroPage";

function GroupListPage() {
    const [groups, setGroups] = useState([]);
    const { user, logOutUser } = useContext(AuthContext);
    let token = localStorage.getItem("authToken");
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
            {}
            {user ? (
                <>
                    <AddGroup refreshGroups={getAllGroups} />
                    <div className="flex flex-wrap max-w-screen-xl gap-10">
                        {groups.map((group) => {
                            return group ? (
                                <GroupCard
                                    group={group}
                                    key={group._id}
                                ></GroupCard>
                            ) : (
                                <p>Loading....</p>
                            );
                        })}
                    </div>
                </>
            ) : (
                <>
                    <IntroPage />
                </>
            )}
        </div>
    );
}

export default GroupListPage;
