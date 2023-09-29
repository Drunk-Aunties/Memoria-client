import axios from "axios";
import { useEffect, useState } from "react";
import RepositoryCard from "../components/RepositoryCard";
import UserGithubCard from "../components/UserGithubCard";

function HomePage() {
    const [userDataUtku, setUserDataUtku] = useState(null);
    const [userDataSandrine, setUserDataSandrine] = useState(null);
    const [repoDataClient, setRepoDataClient] = useState([]);
    const [repoDataServer, setRepoDataServer] = useState([]);

    const targetRepositoryClient = repoDataClient.find(
        (repo) => repo.full_name === "Drunk-Aunties/Memoria-client"
    );
    const targetRepositoryServer = repoDataServer.find(
        (repo) => repo.full_name === "Drunk-Aunties/Memoria-server"
    );

    const tokenUtku = import.meta.env.VITE_UTKU_GIT_API;

    useEffect(() => {
        axios
            .get("https://api.github.com/user", {
                headers: {
                    Authorization: `token ${tokenUtku}`,
                },
            })
            .then((response) => {
                setUserDataUtku(response.data);
            })
            .catch((error) => {
                console.error("Error fetching GitHub user data:", error);
            });

        axios
            .get("https://api.github.com/user", {
                headers: {
                    Authorization: `token ${tokenUtku}`,
                },
            })
            .then((response) => {
                setUserDataSandrine(response.data);
            })
            .catch((error) => {
                console.error("Error fetching GitHub user data:", error);
            });

        axios
            .get("https://api.github.com/user/repos", {
                headers: {
                    Authorization: `token ${tokenUtku}`,
                },
            })
            .then((response) => {
                console.log(response.data[10].commits_url);
                setRepoDataClient(response.data);
                setRepoDataServer(response.data);
            })
            .catch((error) => {
                console.error("Error fetching GitHub repository data:", error);
            });
    }, []);

    return (
        <div className="flex flex-col items-center mt-8">
            {/* Display two repositories side by side at the top */}
            <div className="flex mb-4">
                <div className="mr-4">
                    {targetRepositoryClient ? (
                        <div className="rounded-lg overflow-hidden border border-gray-300 hover:border-blue-500 transition duration-300">
                            <RepositoryCard
                                repository={targetRepositoryClient}
                            />
                        </div>
                    ) : (
                        <p>Repository not found.</p>
                    )}
                </div>
                <div>
                    {targetRepositoryServer ? (
                        <div className="rounded-lg overflow-hidden border border-gray-300 hover:border-blue-500 transition duration-300">
                            <RepositoryCard
                                repository={targetRepositoryServer}
                            />
                        </div>
                    ) : (
                        <p>Repository not found.</p>
                    )}
                </div>
            </div>

            {/* Display two user cards side by side at the bottom */}
            <div className="flex">
                <div className="mr-4">
                    {userDataUtku ? (
                        <div className="rounded-lg overflow-hidden border border-gray-300 hover:border-blue-500 transition duration-300">
                            <UserGithubCard userData={userDataUtku} />
                        </div>
                    ) : (
                        <p>User not found.</p>
                    )}
                </div>
                <div>
                    {userDataSandrine ? (
                        <div className="rounded-lg overflow-hidden border border-gray-300 hover:border-blue-500 transition duration-300">
                            <UserGithubCard userData={userDataSandrine} />
                        </div>
                    ) : (
                        <p>User not found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
