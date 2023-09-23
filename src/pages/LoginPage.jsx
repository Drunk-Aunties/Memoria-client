import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";


const API_URL = "http://localhost:5005";


function LoginPage() {
    const { storeToken,authenticateUser } = useContext(AuthContext); 

    const navigate = useNavigate();

    const [user, setUser] = useState({email:'',password:''});

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`${API_URL}/auth/login`, user)
            .then((response) => {
                console.log(response.data.authToken );
                storeToken(response.data.authToken);
                authenticateUser();
                navigate('/')
            })
            .catch((error) => console.log(error));
    };
    return (
        <div className="border w-full">
            <h3>Create an account</h3>

            <form onSubmit={handleSubmit}>

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

export default LoginPage;
