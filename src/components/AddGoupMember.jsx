import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function AddGroupMember(props) {

    const [email, setEmail] = useState("");
    const { groupId } = useParams();


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let result = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/email/${email}`);
            let newMemberList = [];
            props.members
                ? newMemberList = props.members
                : null;
            newMemberList.push(result.data._id);
            result = await axios.put(`${import.meta.env.VITE_API_URL}/api/groups/${groupId}`, { members: newMemberList });
            props.fnUpdate();
            setEmail('');
        }
        catch (error) { console.log(error) }
    };
    return (
        <div className="border">

            <form onSubmit={handleSubmit}>
                <label className="font-semibold">Email</label><br />
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className=" border border-gray"
                />

                <br />
                <button type="submit" className="py-2.5 px-5 mr-2 mb-2 mt-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 ">Add</button>
            </form>
        </div>
    );
}

export default AddGroupMember;
