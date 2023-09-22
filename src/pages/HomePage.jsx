import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function HomePage() {
    const { isLoggedIn, user } = useContext(AuthContext);

    return (
        <div>
            <h1>Home Page</h1>
            {/* <h2>Hello... {user}</h2> */}
        </div>
    );
}

export default HomePage;
