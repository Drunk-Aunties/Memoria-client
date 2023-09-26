import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_UR+"/api",
    // withCredentials: true // => you might need this option if using cookies and sessions
});

const errorHandler = (err) => {
    throw err;
};

const uploadImage = (file) => {
    return api
        .post("/upload", file)
        .then((res) => res.data)
        .catch(errorHandler);
};

export default { uploadImage };
