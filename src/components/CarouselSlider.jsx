import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import { Carousel } from "react-responsive-carousel";

const CarouselSlider = () => {
    return (
        <div className="bg-gray-100 py-10">
            <div className="w-3/4 mx-auto">
                <Carousel
                    showArrows={true}
                    showStatus={false}
                    showThumbs={false}
                    infiniteLoop={true}
                    autoPlay={true}
                    interval={5000} // Set the time interval between slides (in milliseconds)
                    stopOnHover={true}
                    transitionTime={500} // Set the transition time (in milliseconds)
                >
                    {/* Slide 1 */}
                    <div className="relative">
                        <img
                            src="/img/slide1.jpg"
                            alt="Slide 1"
                            className="w-1/2 mx-auto"
                        />
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 text-white">
                            <h2 className="text-5xl font-bold mb-4">
                                Welcome to Memoria
                            </h2>
                            <p className="text-xl">
                                Capture and share your memories with loved ones.
                            </p>
                        </div>
                    </div>

                    {/* Slide 2 */}
                    <div className="relative">
                        <img
                            src="/img/slide2.jpg"
                            alt="Slide 2"
                            className="w-1/2 mx-auto"
                        />
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 text-white">
                            <h2 className="text-5xl font-bold mb-4">
                                Members only Groups
                            </h2>
                            <p className="text-xl">
                                Create private groups to share moments with
                                friends and family.
                            </p>
                        </div>
                    </div>

                    {/* Slide 3 */}
                    <div className="relative">
                        <img
                            src="/img/slide3.jpg"
                            alt="Slide 3"
                            className="w-1/2 mx-auto"
                        />
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 text-white">
                            <h2 className="text-5xl font-bold mb-4">
                                Daily Life Posts
                            </h2>
                            <p className="text-xl">
                                Share your daily life and adventures
                                effortlessly.
                            </p>
                        </div>
                    </div>

                    {/* Slide 4 */}
                    <div className="relative">
                        <img
                            src="/img/slide4.jpg"
                            alt="Slide 4"
                            className="w-1/2 mx-auto"
                        />
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 text-white">
                            <h2 className="text-5xl font-bold mb-4">
                                Story Generation
                            </h2>
                            <p className="text-xl">
                                Memoria can generate stories from your shared
                                moments.
                            </p>
                        </div>
                    </div>

                    {/* Slide 5 */}
                    <div className="relative">
                        <img
                            src="/img/slide5.jpg"
                            alt="Slide 5"
                            className="w-1/2 mx-auto"
                        />
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 text-white">
                            <h2 className="text-5xl font-bold mb-4">
                                Start Sharing Today!
                            </h2>
                            <p className="text-xl">
                                Join Memoria and start capturing memories with
                                your loved ones.
                            </p>
                        </div>
                    </div>
                </Carousel>
            </div>
        </div>
    );
};

export default CarouselSlider;
