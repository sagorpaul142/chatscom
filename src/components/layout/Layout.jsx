import React from 'react';
import {MainNav} from "@/components/nav/main-nav.jsx";
import {ProfileNav} from "@/components/nav/profile-nav.jsx";

const mainNav = [
    {
        title: "Home",
        href: "/feed/home",
    },
    {
        title: "videos",
        href: "/feed/videos",
    },
    {
        title: "photos",
        href: "/feed/photos",
    },
    {
        title: "friends",
        href: "/feed/friends",
    },
]
const Layout = ({children}) => {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 w-full border-b bg-background">
                <div className="container flex h-16 items-center space-x-4 justify-between sm:space-x-0">
                    <MainNav items={mainNav}/>
                    <nav className="flex gap-2 items-center">
                        <ProfileNav/>
                    </nav>
                </div>
            </header>
            <div className="container flex-1">
                {children}
            </div>
        </div>
    );
};

export default Layout;