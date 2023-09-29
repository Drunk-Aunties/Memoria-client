import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddGroupMember from "../components/AddGoupMember";
import EventListPage from "../pages/EventListPage";

function NewspaperPage(props) {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [headline, setHeadline] = useState({});
    const [col1, setCol1] = useState([]);
    const [col2, setCol2] = useState([]);
    const [col3, setCol3] = useState([]);


    const { groupId } = useParams();
    let token = localStorage.getItem("authToken");

    const getData = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/groups/${groupId}/newspaper`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                console.log(response)
                const data = response.data;
                setData(data);
                pickHeadline();
            })
            .catch((error) => {
                error &&
                    navigate("/error", {
                        state: {
                            id: error.response.status,
                            message: error.response.statusText,
                            reason: error.response.data.message,
                        },
                    });
                console.log(error);
            });
    };

    function pickHeadline() {
        if (data) {
            let memoriesWithPictures = data.memories.filter((memory) => { return memory.imageUrl });
            let pickedHeadline = memoriesWithPictures[Math.floor(Math.random() * memoriesWithPictures.length) + 0];
            let isMyHeadline = (element) => element?._id === pickedHeadline?._id;
            let index = data.memories.findIndex(isMyHeadline);
            let headline = data.memories.splice(index, 1)[0];
            setHeadline(headline);
            setCol1(data.memories.slice(0,3));
            setCol2(data.memories.slice(3,6));
            setCol3(data.memories.slice(6,9));
        }
    }

    useEffect(() => {
        getData();

    }, []);

    useEffect(() => {
        pickHeadline();
    }, [data]);

    return (

        <div className="flex justify-center">
            <div className="bg-yellow-50 w-full max-w-7xl border shadow-lg">
                {data &&
                    <>
                        <h1 className=" font-serif p-5 font-bold tracking-wider border-double text-4xl">The {data.group.name} News</h1>
                        <div className="border-solid border-2 border-gray-800"></div>
                        <br />

                        <h1 className="font-bold font-serif uppercase	">{headline.title}</h1>
                        <br />

                        <div className="border-solid border-2 border-gray-800"></div>


                        <div className="flex flex-reverse m-10 h-fit items-center justify-center">
                            <img src={headline.imageUrl} alt="" className="max-w-md  max-h-1/4 m-5 float-right shadow" />
                            <div className="text-left m-5 font-serif text-lg">{headline.gptComment}</div>
                        </div>





                    </>
                }

                <div className=" grid grid-cols-3">
                    {data &&
                    <div>
                        {col1.map((memory) => {
                            return (
                                <div className="p-5">
                                    
                                    <p className=" tracking-wider font-serif text-left">{memory.title}</p>
                                    <div className="mt-2  mb-2 border border-gray-800"></div>
                                    <img src={memory.imageUrl} alt="" className="max-h-64 m-auto "/>
                                    <br />
                                    <p className="font-serif text-sm text-justify">{memory.gptComment}</p>
                                    <br />
                                </div>
                            )
                        })}
                        </div>
                    }
                    {data &&
                    <div>
                        {col2.map((memory) => {
                            return (
                                <div className="p-5">
                                    
                                    <p className=" tracking-wider font-serif text-left">{memory.title}</p>
                                    <div className="mt-2  mb-2 border border-gray-800"></div>
                                    <img src={memory.imageUrl} alt="" className="max-h-64 m-auto "/>
                                    <br />
                                    <p className="font-serif text-sm text-justify">{memory.gptComment}</p>
                                    <br />
                                </div>
                            )
                        })}
                        </div>
                    }
                    {data &&
                    <div>
                        {col3.map((memory) => {
                            return (
                                <div className="p-5">
                                    
                                    <p className=" tracking-wider font-serif text-left">{memory.title}</p>
                                    <div className="mt-2  mb-2 border border-gray-800"></div>
                                    <img src={memory.imageUrl} alt="" className="max-h-64 m-auto "/>
                                    <br />
                                    <p className="font-serif text-sm text-justify">{memory.gptComment}</p>
                                    <br />
                                </div>
                            )
                        })}
                        </div>
                    }
                </div>



            </div>

        </div>




    );
}

export default NewspaperPage;
