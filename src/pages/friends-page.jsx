import React, {useEffect, useState} from 'react';
import Layout from "@/components/layout/Layout.jsx";
import axios from "axios";

const FriendsPage = () => {
    const [friends, setFriends] = useState([])
    const getFriends = () => {
        axios.get('/api/friends', {withCredentials: true})
            .then(function (response) {
                console.log(response.data);
                setFriends(response.data.results)
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    }
    useEffect(() => {
        getFriends()
    }, []);
    console.log(friends)
    return (
        <Layout>
            <h1>Friends page</h1>
            {
                friends?.length > 0 ?
                    friends.map(friend => (
                        <p key={friend.id}>{friend.friend_name}</p>
                    ))
                    :
                    <p>No Data Found</p>
            }
        </Layout>
    );
};

export default FriendsPage;