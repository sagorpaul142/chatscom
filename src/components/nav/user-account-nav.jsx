import {Home, LogOut, User2, UserCog, UserPlus, Video} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu.jsx";
import {Link, useNavigate} from "react-router-dom";
import {setSession} from "@/lib/utils.js";
import {useAuth} from "@/Contexts/AuthContext.jsx";
import AxiosServices from "@/Config/AxiosServices.js";

const UserAccountNav = () => {
    const navigate = useNavigate()
    const {setIsAuthenticated, user, setUser} = useAuth()
    const logout = async () => {
        try {
            AxiosServices.post("/dj-rest-auth/logout/", {})
                .then(response => {
                    console.log(response)
                    setSession(null);
                    setIsAuthenticated(false)
                    setUser(null)
                    navigate("/")
                }).catch((error) => {
                console.log(error)
                setSession(null);
                setIsAuthenticated(false)
                setUser(null)
                navigate("/")
            })
        } catch (error) {
            console.log(error)
            setSession(null);
            setIsAuthenticated(false)
            setUser(null)
            navigate("/")
        }
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar name={user?.username} image={""} className="h-8 w-8"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        {user?.username && <p className="font-medium">{"@ " + user?.username}</p>}
                        {user?.email && (
                            <p className="w-[200px] truncate text-sm text-muted-foreground">
                                {user?.email}
                            </p>
                        )}
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