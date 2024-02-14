import {Home, LogOut, User2, UserCog, UserPlus, Video} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu.jsx";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const UserAccountNav = () => {
    const navigate = useNavigate()
    const logout = async () => {
        await axios.post("/dj-rest-auth/logout/", {}, {withCredentials: true})
        navigate("/")
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar name={name} image={""} className="h-8 w-8"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        dkfhgdfg
                        {/*{name && <p className="font-medium">{name}</p>}*/}
                        {/*{email && (*/}
                        {/*    <p className="w-[200px] truncate text-sm text-muted-foreground">*/}
                        {/*        {email}*/}
                        {/*    </p>*/}
                        {/*)}*/}
                    </div>
                </div>
                <DropdownMenuSeparator/>

                <Link to="/feed/home">
                <DropdownMenuItem
                    className="cursor-pointer"
                >
                    <Home className="mr-2 h-4 w-4"/>
                    <span>Home</span>
                </DropdownMenuItem>
                </Link>

                <Link to="/profile">
                    <DropdownMenuItem
                        className="cursor-pointer"
                    >
                        <UserCog className="mr-2 h-4 w-4"/>
                        <span>Profile</span>
                    </DropdownMenuItem>
                </Link>

                <Link to="/feed/videos">
                    <DropdownMenuItem
                        className="cursor-pointer"
                    >
                        <Video className="mr-2 h-4 w-4"/>
                        <span>Videos</span>
                    </DropdownMenuItem>
                </Link>

                <Link to="/feed/friends">
                    <DropdownMenuItem
                        className="cursor-pointer"
                    >
                        <UserPlus className="mr-2 h-4 w-4"/>
                        <span>Friends</span>
                    </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator/>
                <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={(event) => {
                        event.preventDefault();
                        logout()
                    }}
                >
                    <LogOut className="mr-2 h-4 w-4"/>
                    <span>Sign out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

function UserAvatar({name, image, ...props}) {
    return (
        <Avatar {...props}>
            <AvatarImage alt="Picture" src={image}/>
            {<AvatarFallback>
                <span className="sr-only">{name}</span>
                <User2 className="h-4 w-4"/>
            </AvatarFallback>}
        </Avatar>
    )
}

export default UserAccountNav;