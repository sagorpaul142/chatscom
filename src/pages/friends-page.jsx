import {useEffect, useState} from 'react';
import FriendItem from "@/components/friend/friend-item.jsx";
import AxiosServices from "@/Config/AxiosServices.js";
import {Helmet} from "react-helmet";

const FriendsPage = () => {
    const [friends, setFriends] = useState([])
    const getFriends = async () => {
        try {
            let response = await AxiosServices.get('/api/friends/')
            console.log(response.data)
            setFriends(response.data.results)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getFriends()
    }, []);

    return (
        <>
            <Helmet>
                <title>Friends Page</title>
                <meta name="description" content="Helmet application"/>
            </Helmet>
            <div className="mt-5">
                {
                    friends?.length > 0 ?
                        <div className="flex items-center gap-2 flex-wrap">
                            {friends.map(friend => (
                                <FriendItem key={friend.id} friend={friend}/>
                            ))}
                        </div>
                        :
                        <p className="text-xl mt-10 font-semibold text-center">No data found</p>
                }
            </div>
        </>
    );
};

export default FriendsPage;