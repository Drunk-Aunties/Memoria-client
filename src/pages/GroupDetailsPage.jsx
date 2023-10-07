import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddGroupMember from "../components/AddGoupMember";
import EventListPage from "../pages/EventListPage";

function GroupDetailsPage(props) {
    //Functional States & Variables
    const navigate = useNavigate();
    const [group, setGroup] = useState(null);
    const { groupId } = useParams();
    let token = localStorage.getItem("authToken");

    const getGroup = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/groups/${groupId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                const oneGroup = response.data;
                setGroup(oneGroup);
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

    const deleteMember = async (index) => {
        try {
            let newMemberList = group.members.map((e) => e._id);
            newMemberList.splice(index, 1);
            let result = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/groups/${groupId}`,
                { members: newMemberList }
            );
            getGroup();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getGroup();
    }, []);

    return (
        <div className="w-screen">
            {group && (
                <>
                    {/* HEADER FULL WIDTH */}
                    <div className=" w-screen flex flex-wrap justify-center items-center bg-gradient-to-r from-purple-50 to-orange-50 shadow-lg  ">
                        <div className="flex w-full max-w-6xl items-center">
                            {/* Frame, Group Picture, Group Name  */}
                            <div className=" flex flex-col shadow-lg border-solid border-black bg-stone-100 items-center pb-3 ">
                                <div className="flex justify-center items-center bg-black h-32 w-32 m-2 shadow-[inset_0_-4px_4px_rgba(0,0,0,0.6)]">
                                    <img
                                        src={
                                            group.imageUrl
                                                ? group.imageUrl
                                                : "/img/logo.png"
                                        }
                                        alt="Group Picture"
                                        className=" p-0.5"
                                    />
                                </div>
                                <p className="font-bold text-lg tracking-widest text-black ">
                                    {group.name}
                                </p>
                            </div>

                            {/* Description */}
                            <div className="flex flex-wrap grow justify-between">
                                <p className="p-2 max-w-sm ">
                                    {group.description}
                                </p>

                                {/* Number of members and memories */}
                                <p className="text-left font-semibold p-2 max-w-sm mr-8">
                                    <img
                                        src="/img/members-logo.png"
                                        alt="Member icon"
                                        className="h-5 m-2 inline"
                                    />
                                    {group.members.length} Members
                                    <br />
                                    <img
                                        src="/img/logo.png"
                                        alt="Memoria icon"
                                        className="h-5 m-2 inline"
                                    />
                                    16 Memories
                                </p>
                            </div>
                        </div>
                    </div>
                    <br />
                </>
            )}

            {/* LINKS PODCAST AND NEWSPAPER */}
            <Link to={`/events/story/${groupId}`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
                    Write Our Story
                </button>
            </Link>
            <Link to={`/groups/${groupId}/newspaper`}>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4">
                    Read the Newspaper
                </button>
            </Link>

            {/* BODY: POSTS */}
            <div className="flex flex-wrap  gap-10 justify-center">
                <EventListPage />

                {/* BODY: MEMBERS */}
                <div className="flex-col justify-start border max-w-sm p-5 rounded-lg">
                    <h5 className="text-xl font-bold leading-none text-gray-900">
                        Members
                    </h5>
                    {group?.members
                        ? group.members.map((member, index) => {
                              return (
                                  <ul
                                      key={member._id}
                                      role="list"
                                      className="divide-y divide-gray-200"
                                  >
                                      <li className="py-3 sm:py-4">
                                          <div className="flex items-center space-x-4">
                                              <div className="flex-shrink-0">
                                                  <img
                                                      className="w-8 h-8 rounded-full ml-2"
                                                      src={
                                                          member.imageUrl
                                                              ? member.imageUrl
                                                              : "/img/unknown-profile.png"
                                                      }
                                                      alt="Profile Picture"
                                                  />
                                              </div>
                                              <div className="flex-1 min-w-0">
                                                  <p className="text-sm font-medium text-gray-900 truncate text-left">
                                                      {member.name}
                                                  </p>
                                                  <p className="text-sm text-gray-500 truncate text-left">
                                                      {member.email}
                                                  </p>
                                              </div>
                                              <button
                                                  onClick={() => {
                                                      deleteMember(index);
                                                  }}
                                                  className="pl-10 bg-transparent"
                                              >
                                                  X
                                              </button>
                                          </div>
                                      </li>
                                      <hr />
                                  </ul>
                              );
                          })
                        : null}
                    <br />
                    <AddGroupMember
                        members={group?.members}
                        fnUpdate={getGroup}
                    />
                </div>
            </div>
            <Link to="/groups">
                <button>Back to Groups</button>
            </Link>
            <Link to={`/groups/edit/${groupId}`}>
                <button>Edit Group</button>
            </Link>
        </div>
    );
}

export default GroupDetailsPage;
