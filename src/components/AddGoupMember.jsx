import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

function AddGroupMember(props) {

    const [email, setEmail] = useState("");
    const { groupId } = useParams();

    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            let result = await axios.get(`${API_URL}/api/user`, email);
            let newMemberList = [];
            props.members
                ? newMemberList = props.members
                : null;
            newMemberList.push(result.data._id);
            console.log(newMemberList);
            result = await axios.put(`${API_URL}/api/groups/${groupId}`, { members: newMemberList });
            props.fnUpdate();
        }
        catch(error) {console.log(error)}

        //setEmail("");
        //props.refreshGroups();
};
return (
    <div className="border">
        <h3>Add a new member</h3>

        <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" border border-gray"
            />

            <br />
            <button type="submit">Submit</button>
        </form>
    </div>
);
}

export default AddGroupMember;
