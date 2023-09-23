import { useLocation } from "react-router-dom";

function ErrorPage() {
    const { state } = useLocation();
    const { id, message, reason } = state; 





    return (
        <div>
            <h1>Error</h1>
            {id
                ? <><p> {id} </p><p> {message} </p> <p> {reason} </p></>
                : null
            }

        </div>
    );
}

export default ErrorPage;
