// import { siteConfig } from "@/config/site"
// import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
// import { MobileNav } from "@/components/nav/mobile-nav"


import {Link} from "react-router-dom";
import {BookOpenCheck, Menu, X} from "lucide-react";
import {cn} from "@/lib/utils.js";
import {useState} from "react";
import {MobileNav} from "@/components/nav/mobile-nav.jsx";

export function MainNav({items, children}) {
    const [showMobileMenu, setShowMobileMenu] = useState(false)

    return (
        <div className="flex gap-6 md:gap-10">
            <Link to="/feed/home" className="hidden items-center space-x-2 md:flex">
                <BookOpenCheck />
                <span className="hidden font-bold sm:inline-block">
          Chatscom
        </span>
            </Link>
            {items?.length ? (
                <nav className="hidden gap-6 md:flex">
                    {items?.map((item, index) => (
                        <Link
                            key={index}
                            to={item.href || ""}
                            className={cn(
                                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm capitalize",
                                item.href && item.href.startsWith(`/`)
                                    ? "text-foreground"
                                    : "text-foreground/60",
                                item.disabled && "cursor-not-allowed opacity-80"
                            )}
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>
            ) : null}
            <button
                className="flex items-center space-x-2 md:hidden"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
                {showMobileMenu ? <X/> : <Menu/>}
                <span className="font-bold">Menu</span>
            </button>
            {showMobileMenu && items && (
                <MobileNav items={items}>{children}</MobileNav>
            )}
        </div>
    )
}
