import axios from "axios";
import { useEffect, useState } from "react";
import RepositoryCard from "../components/RepositoryCard";
import UserGithubCard from "../components/UserGithubCard";
import CarouselSlider from "../components/CarouselSlider";

function HomePage() {
    //Functional states & variables
    const tokenUtku = import.meta.env.VITE_UTKU_GIT_API;
    const [userDataUtku, setUserDataUtku] = useState(null);

    const tokenSandrine = import.meta.env.VITE_SANDRINE_GIT_API;
    const [userDataSandrine, setUserDataSandrine] = useState(null);

    const [repoDataClient, setRepoDataClient] = useState([]);
    const targetRepositoryClient = repoDataClient.find(
        (repo) => repo.full_name === "Drunk-Aunties/Memoria-client"
    );

    const [repoDataServer, setRepoDataServer] = useState([]);
    const targetRepositoryServer = repoDataServer.find(
        (repo) => repo.full_name === "Drunk-Aunties/Memoria-server"
    );

    useEffect(() => {
        axios
            .get("https://api.github.com/user", {
                headers: { Authorization: `token ${tokenUtku}` },
            })
            .then((response) => { setUserDataUtku(response.data) })
            .catch((error) => {
                console.error("Error fetching GitHub user data:", error);
            });

        axios
            .get("https://api.github.com/user", {
                headers: { Authorization: `token ${tokenSandrine}` }
            })
            .then((response) => { setUserDataSandrine(response.data) })
            .catch((error) => {
                console.error("Error fetching GitHub user data:", error);
            });

        axios
            .get("https://api.github.com/user/repos", {
                headers: { Authorization: `token ${tokenUtku}` }
            })
            .then((response) => {
                setRepoDataClient(response.data);
                setRepoDataServer(response.data);
            })
            .catch((error) => {
                console.error("Error fetching GitHub repository data:", error);
            });
    }, []);

    return (
        <div className="flex flex-col items-center mt-8">
            <CarouselSlider />
            <br />
            <h2 className="text-4xl font-bold mt-8 mb-4">Github Repos</h2>

            {/* Display two repositories side by side at the top */}
            <div className="flex mb-4">

                <div className="mr-4">
                    {targetRepositoryClient
                        ? (<div className="rounded-lg overflow-hidden border border-gray-300 hover:border-blue-500 transition duration-300">
                            <RepositoryCard repository={targetRepositoryClient} /></div>)
                        : (<p>Repository not found.</p>)
                    }
                </div>

                <div>
                    {targetRepositoryServer
                        ? (<div className="rounded-lg overflow-hidden border border-gray-300 hover:border-blue-500 transition duration-300">
                            <RepositoryCard repository={targetRepositoryServer} /></div>)
                        : (<p>Repository not found.</p>)
                    }
                </div>

            </div>

            {/* Display two user cards side by side at the bottom */}
            <h2 className="text-4xl font-bold mt-8 mb-4">Github Profiles</h2>
            <div className="flex">
                <div className="mr-4">
                    {userDataUtku
                        ? (<div className="rounded-lg overflow-hidden border border-gray-300 hover:border-blue-500 transition duration-300">
                            <UserGithubCard userData={userDataUtku} /></div>)
                        : (<p>User not found.</p>)}
                </div>

                <div>
                    {userDataSandrine
                        ? (<div className="rounded-lg overflow-hidden border border-gray-300 hover:border-blue-500 transition duration-300">
                            <UserGithubCard userData={userDataSandrine} /></div>)
                        : (<p>User not found.</p>)}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
