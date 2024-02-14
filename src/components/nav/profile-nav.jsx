import {Skeleton} from "@/components/ui/skeleton"
import UserAccountNav from "@/components/nav/user-account-nav.jsx";

export function ProfileNav() {
    // if (loading) {
    //     return (
    //         <AvatarSkeleton/>
    //     )
    // }

    return (
        <>
            <div className="flex gap-4">
                <UserAccountNav
                    // name={user.firstName + ' ' + user.lastName}
                    // image={user.image}
                    // email={user.email}
                    // logOut={logOut}
                /></div>
        </>
    )
}

function AvatarSkeleton() {
    return (
        <div className="flex items-center space-x-4">
            <Skeleton className="h-6 w-6 rounded-full"/>
        </div>
    )
}
