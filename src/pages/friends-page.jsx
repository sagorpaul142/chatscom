import {useEffect, useState} from 'react';
import axios from "axios";
import FriendItem from "@/components/friend/friend-item.jsx";
import AxiosServices from "@/Config/AxiosServices.js";

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
            {
                friends?.length > 0 ?
                    friends.map(friend => (
                        <FriendItem key={friend.id} friend={friend}/>
                    ))
                    :
                    <p>No Data Found</p>
            }
        </>
    );
};

export default FriendsPage;