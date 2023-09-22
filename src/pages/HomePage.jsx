import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function HomePage() {
    const { isLoggedIn, user } = useContext(AuthContext);

    return (
        <div>
            <h1>Home Page</h1>
            {user
            ? <h2>Hello... {user.name}</h2>
            : <h2>Loading....</h2>
            }
            
        </div>
    );
}

export default HomePage;
