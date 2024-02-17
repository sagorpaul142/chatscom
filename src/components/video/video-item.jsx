import React from 'react';
import {ThumbsUp} from "lucide-react";

const VideoItem = ({video}) => {
    return (
        <div className="bg-white p-4 border rounded-lg shadow-md first:mt-3 mb-5 last:mb-2">
            <p className="font-bold text-lg">{video.description}</p>

            {/* Video Info */}
            <div className="flex justify-between items-center mb-2">
                <p className="font-bold text-lg">{video.title}</p>
            </div>

            {/* Date */}
            <p className="text-xs text-gray-500 mb-4">{video.created_at}</p>

            {/* Like */}
            <div className="flex items-center text-gray-500">
                <div className="flex items-center mr-4">
                    <ThumbsUp className="mr-2"/>
                    <span className="text-sm">{video.like_count} Like</span>
                </div>
            </div>
        </div>
    );
};

export default VideoItem;