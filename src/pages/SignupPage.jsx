import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();

    const [user, setUser] = useState({ email: "", password: "", name: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`${import.meta.env.VITE_API_URL}/auth/signup`, user)
            .then((response) => {
                console.log(response);
                navigate("/login");
            })
            .catch((error) => console.log(error));
    };
    return (
        <section className="gradient-form h-full bg-neutral-200">
            <div className="container h-full p-10">
                <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800">
                    <div className="w-full">
                        <div className="block rounded-lg bg-gray-900 shadow-lg">
                            <div className="g-0 lg:flex lg:flex-wrap">
                                <div className="px-4 md:px-0 lg:w-6/12">
                                    <div className="md:mx-6 md:p-12">
                                        <div className="text-center">
                                            <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold text-white">
                                                Create an Account
                                            </h4>
                                        </div>
                                        <form
                                            onSubmit={handleSubmit}
                                            className="mb-4 text-white"
                                        >
                                            <label className="block">
                                                Name:
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                onChange={(e) =>
                                                    (user.name = e.target.value)
                                                }
                                                className="border border-gray"
                                            />

                                            <label className="block">
                                                Email:
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                onChange={(e) =>
                                                    (user.email =
                                                        e.target.value)
                                                }
                                                className="border border-gray"
                                            />

                                            <label className="block">
                                                Password:
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                onChange={(e) =>
                                                    (user.password =
                                                        e.target.value)
                                                }
                                                className="border border-gray"
                                            />

                                            <br />

                                            <button
                                                type="submit"
                                                className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-bold uppercase leading-normal text-black shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                                data-te-ripple-init
                                                data-te-ripple-color="light"
                                                style={{
                                                    background: "#ffc000",
                                                }}
                                            >
                                                Submit
                                            </button>
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
                                            className="mx-auto w-48"
                                            src="./public/img/logo.png"
                                            alt="logo"
                                        />
                                        <h4 className="mb-6 text-xl font-semibold text-center">
                                            We are more than just a company
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

export default SignUp;
