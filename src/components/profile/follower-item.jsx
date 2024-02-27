import React from 'react';

const FollowerItem = ({follower}) => {
    return (
        <div className="bg-white p-4 mb-4 border rounded-lg shadow-md">
            <img
                src="https://placebeard.it/200x200"
                alt="Profile"
                className=""
            />
            <div className="my-3">
                <p className="font-bold text-sm">{follower.followed_name}</p>
                <p className="text-xs text-gray-500">{follower.followed} mutual friends</p>
            </div>
        </div>
    );
};

export default FollowerItem;