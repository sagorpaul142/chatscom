import {createBrowserRouter} from 'react-router-dom';
import Login from "@/pages/Login.jsx";
import SignUp from "@/pages/sign-up.jsx";
import Home from "@/pages/home-page.jsx";
import VideosPage from "@/pages/videos-page.jsx";
import PhotosPage from "@/pages/photos-page.jsx";
import FriendsPage from "@/pages/friends-page.jsx";
import ProfilePage from "@/pages/profile-page.jsx";
import AuthLayout from "@/routing/auth-layout.jsx";
import Layout from "@/components/layout/Layout.jsx";
import {AuthProvider} from "@/Contexts/AuthContext.jsx";

// Adjust the PrivateRoute component to work with React Router v6


export const router = createBrowserRouter([
    {path: "/", element: <AuthProvider><Login/> </AuthProvider>},
    {path: "/signup", element: <AuthProvider><SignUp/></AuthProvider>},
    {
        path: "/feed", element: <AuthProvider><Layout><AuthLayout/></Layout></AuthProvider>, children: [
            {path: "home", element: <Home/>},
            {path: "videos", element: <VideosPage/>},
            {path: "photos", element: <PhotosPage/>},
            {path: "friends", element: <FriendsPage/>},
            {path: "profile", element: <ProfilePage/>},
        ]
    },
    {
        path: "/", element: <AuthProvider><Layout><AuthLayout/></Layout></AuthProvider>, children: [
            {path: "profile", element: <ProfilePage/>},
        ]
    },
]);

export default router;
