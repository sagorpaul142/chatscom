import React from 'react';

const FriendItem = ({friend}) => {
    return (
        <div className="flex items-center bg-white p-4 mb-4 border rounded-lg shadow-md">
            <img
                src={friend.profilePicture}
                alt={`Profile of ${friend.friend_name}`}
                className="w-12 h-12 rounded-full mr-4"
            />
            <div>c
                <p className="font-bold text-sm">{friend.friend_name}</p>
                <p className="text-xs text-gray-500">{friend.friend} mutual friends</p>
            </div>
            <button className="ml-auto bg-blue-500 text-white py-1 px-2 rounded-full">
                Add Friend
            </button>
        </div>
    );
};

export default FriendItem;