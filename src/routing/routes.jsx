import {createBrowserRouter} from "react-router-dom";
import Login from "@/pages/Login.jsx";
import SignUp from "@/pages/sign-up.jsx";
import Home from "@/pages/home-page.jsx";
import VideosPage from "@/pages/videos-page.jsx";
import PhotosPage from "@/pages/photos-page.jsx";
import FriendsPage from "@/pages/friends-page.jsx";
import ProfilePage from "@/pages/profile-page.jsx";

const route = createBrowserRouter([
    {
        path: '/',
        element: '',
        errorElement: '',
        children: [
            {index: true, element: <Login/>},
            {path: "/signup", element: <SignUp/>},
            {path: "/feed/home", element: <Home/>},
            {path: "/feed/videos", element: <VideosPage/>},
            {path: "/feed/photos", element: <PhotosPage/>},
            {path: "/feed/friends", element: <FriendsPage/>},
            {path: "/profile", element: <ProfilePage/>},
        ]
    }
])

export default route;