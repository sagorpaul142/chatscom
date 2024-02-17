import React from 'react';
import {ThumbsUp} from "lucide-react";

const PhotoItem = ({photo}) => {
    return (
        <div className="bg-white p-4 border rounded-lg shadow-md first:mt-5 mb-4">
            {/* Photo */}
            <img
                src={photo.image}
                alt="User Photo"
                className="w-full h-64 object-cover rounded-md mb-4"
            />

            {/* Photo Details */}
            <div className="flex items-center mb-2">
                <img
                    src="https://placekitten.com/40/40"
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                    <p className="font-bold text-sm">{photo.owner}</p>
                    <p className="text-xs text-gray-500">{photo.created_at}</p>
                </div>
            </div>

            {/* Like, Comment, Share */}
            <div className="flex items-center text-gray-500 mb-4">
                <div className="flex items-center mr-4">
                    <ThumbsUp className="mr-2" />
                    <span className="text-sm">{photo.like_count} Likes</span>
                </div>
                <div className="flex items-center mr-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 mr-1"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 14a10.06 10.06 0 00-17.34 6.14"
                        />
                    </svg>
                    <span className="text-sm">{photo.comment_count} Comments</span>
                </div>
            </div>
        </div>
    );
};

export default PhotoItem;