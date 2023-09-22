import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import GroupListPage from "./pages/GroupListPage";
import GroupDetailsPage from "./pages/GroupDetailsPage";
import EditGroupPage from "./pages/EditGroupPage";
import EventListPage from "./pages/EventListPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import EditEventPage from "./pages/EditEventPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";





function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/groups" element={<GroupListPage />} />
                <Route path="/groups/:groupId" element={<GroupDetailsPage />} />
                <Route path="/groups/edit/:groupId" element={<EditGroupPage />}/>
                <Route path="/events" element={<EventListPage />} />
                <Route path="/events/:eventId" element={<EventDetailsPage />} />
                <Route path="/events/edit/:eventId" element={<EditEventPage />}/>
                <Route path="/signup" element={<SignupPage />}/>
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/logout" element={<LoginPage />}/>
            </Routes>
        </>
    );
}

export default App;
