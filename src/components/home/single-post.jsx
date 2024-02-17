import React from 'react';

const SinglePost = ({post}) => {
    return (
        <div className="bg-white p-4 border rounded-lg shadow-md mb-3 last:mb-0 first:mt-5">
            {/* Post Header */}
            <div className="flex items-center mb-4">
                <img
                    src={post?.profile_picture || "https://placekitten.com/40/40"}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                    <p className="font-bold text-sm">{post?.owner}</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
            </div>

            {/* Post Content */}
            <p className="text-base mb-4">
                {post?.content}
            </p>

            {/* Post Image */}
            <img
                src={post.post_picture || "https://placekitten.com/600/400"}
                alt="Post Image"
                className="w-2/4 h-2/4 rounded-md mb-4"
            />

            {/* Like, Comment, Share */}
            <div className="flex items-center text-gray-500">
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
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                    <span className="text-sm">{post.like_count} Like</span>
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
                    <span className="text-sm">{post.comment_count}Comment</span>
                </div>
                <div className="flex items-center">
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
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                    <span className="text-sm">Share</span>
                </div>
            </div>
        </div>
    );
};

export default SinglePost;