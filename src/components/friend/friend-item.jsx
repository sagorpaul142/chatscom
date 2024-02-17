import React from 'react';

const FriendItem = ({friend}) => {
    return (
        <div className=" bg-white p-4 mb-4 border rounded-lg shadow-md">
            <img
                src="https://placebeard.it/200x200"
                alt="Profile"
                className=""
            />
            <div className="my-3">
                <p className="font-bold text-sm">{friend.friend_name}</p>
                <p className="text-xs text-gray-500">{friend.friend} mutual friends</p>
            </div>
            <button className="ml-auto bg-[#77A7FF] text-blue-600 font-semibold py-2 px-2 rounded-md w-full">
                Add Friend
            </button>
        </div>
    );
};

export default FriendItem;