import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignUp() {
    const navigate = useNavigate();

    const [user, setUser] = useState({ email: "", password: "", name: "" });

    const validateForm = () => {
        if (!user.name || !user.email || !user.password) {
            toast.error("Please fill in all fields.");
            return false;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(user.email)) {
            toast.error("Please enter a valid email address.");
            return false;
        }

        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordPattern.test(user.password)) {
            toast.error(
                "Password must be at least 6 characters and contain at least one number, one lowercase, and one uppercase letter."
            );
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/auth/signup`, user)
                .then((response) => {
                    console.log(response);
                    navigate("/login");
                })
                .catch((error) => console.log(error));
        }
    };
    return (
        <section className="flex flex-col items-center gradient-form h-full bg-neutral-200">
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
                                            <input
                                                type="text"
                                                name="name"
                                                onChange={(e) =>
                                                    (user.name = e.target.value)
                                                }
                                                className="text-white peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none:placeholder:opacity-0"
                                                placeholder="Name"
                                            />
                                            <input
                                                type="email"
                                                name="email"
                                                onChange={(e) =>
                                                    (user.email =
                                                        e.target.value)
                                                }
                                                className="text-white peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none:placeholder:opacity-0"
                                                placeholder="Email"
                                            />
                                            <input
                                                type="password"
                                                name="password"
                                                onChange={(e) =>
                                                    (user.password =
                                                        e.target.value)
                                                }
                                                className="text-white peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none:placeholder:opacity-0"
                                                placeholder="Password"
                                            />

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
