import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { toast } from "react-toastify";

function LoginPage() {
    const [user, setUser] = useState({ email: "", password: "" });
    const { storeToken, authenticateUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const validateForm = () => {
        if (!user.email || !user.password) {
            toast.error("Please fill in all fields.");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/auth/login`, user)
                .then((response) => {
                    console.log(response.data.authToken);
                    storeToken(response.data.authToken);
                    authenticateUser();
                    navigate("/");
                })
                .catch((error) => {
                    if (error.response && error.response.status === 401) {
                        toast.error("Incorrect credentials. Please try again.");
                    } else {
                        console.log(error);
                    }
                });
        }
    };
    return (
        <section className="gradient-form h-full bg-neutral-200 flex flex-col items-center">
            <div className="container h-full p-10">
                <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800">
                    <div className="w-full">
                        <div className="block rounded-lg bg-gray-900 shadow-lg">
                            <div className="g-0 lg:flex lg:flex-wrap">
                                <div className="px-4 md:px-0 lg:w-6/12">
                                    <div className="md:mx-6 md:p-12">
                                        <div className="text-center">
                                            <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold text-white">
                                                Welcome to Memoria
                                            </h4>
                                        </div>
                                        <p className="mb-4 text-white">
                                            Please login to your account
                                        </p>

                                        <form
                                            onSubmit={handleSubmit}
                                            className="relative mb-4"
                                            data-te-input-wrapper-init
                                        >
                                            <input
                                                type="text"
                                                className=" text-white peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none:placeholder:opacity-0"
                                                id="email"
                                                placeholder="Email"
                                                name="email"
                                                onChange={(e) =>
                                                    (user.email =
                                                        e.target.value)
                                                }
                                            />
                                            <label
                                                htmlFor="email"
                                                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                                            ></label>
                                            <br />
                                            <input
                                                type="password"
                                                className=" text-white peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none:placeholder:opacity-0"
                                                id="password"
                                                placeholder="Password"
                                                name="password"
                                                onChange={(e) =>
                                                    (user.password =
                                                        e.target.value)
                                                }
                                            />
                                            <label
                                                htmlFor="password"
                                                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                                            ></label>
                                            <br />
                                            <button
                                                type="submit"
                                                className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-bold uppercase leading-normal text-black shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                                data-te-ripple-init
                                                data-te-ripple-color="light"
                                                style={{
                                                    background: "#f3dac8",
                                                }}
                                            >
                                                Log in
                                            </button>
                                            <br />
                                            <div className="flex items-center justify-between pb-6">
                                                <p
                                                    className="mb-2 mr-2"
                                                    style={{ color: "#e2f0d9" }}
                                                >
                                                    Don't have an account?
                                                </p>
                                                <a href="/signup">
                                                    <button
                                                        type="button"
                                                        className="bg-white text-black inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-bold uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700"
                                                        data-te-ripple-init
                                                        data-te-ripple-color="light"
                                                    >
                                                        Register
                                                    </button>
                                                </a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                {/* Right column container with background and description */}
                                <div
                                    className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                                    style={{ background: "white" }}
                                >
                                    <div className="px-4 py-6 text-black md:mx-6 md:p-12">
                                        <img
                                            className="mx-auto w-48 black"
                                            src="../../public/img/logo.png"
                                            alt="logo"
                                        />
                                        <h4 className="mb-6 text-xl font-semibold text-center">
                                            We are more than just a social media
                                        </h4>
                                        <p className="text-sm text-center">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipisicing elit, sed do
                                            eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginPage;
