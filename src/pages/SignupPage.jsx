import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();

    const [user, setUser] = useState({email:'',password:'',name:''});

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`${import.meta.env.VITE_API_URL}/auth/signup`, user)
            .then((response) => {
                console.log(response);
                navigate('/login')
            })
            .catch((error) => console.log(error));
    };
    return (
        <div className="border w-full">
            <h3>Create an account</h3>

            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    onChange={(e) => user.name=e.target.value}
                    className=" border border-gray"
                />

                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    onChange={(e) => user.email=e.target.value}
                    className=" border border-gray"

                />

                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    onChange={(e) => user.password=e.target.value}
                    className=" border border-gray"

                />
                <br />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default SignUp;
