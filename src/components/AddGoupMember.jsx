import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function AddGroupMember(props) {
    const [email, setEmail] = useState("");
    const [show, setShow] = useState(false);
    const { groupId } = useParams();
    const toggleVisibility = () => {
        setShow(!show);
    };
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let result = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/users/email/${email}`
            );
            let newMemberList = [];
            props.members ? (newMemberList = props.members) : null;
            newMemberList.push(result.data._id);
            result = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/groups/${groupId}`,
                { members: newMemberList }
            );
            props.fnUpdate();
            setEmail("");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="border">
            <button onClick={toggleVisibility}>Add New Member</button>
            {show && (
                <>
                    <form onSubmit={handleSubmit}>
                        <br />
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
                </>
            )}
        </div>
    );
}

export default AddGroupMember;
