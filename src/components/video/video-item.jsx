import React, {useState} from 'react';
import {FilePen, MoreVertical, ThumbsUp, MessageCircleMore, Trash2} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import VideoEditModal from "@/components/video/video-edit-modal.jsx";
import AxiosServices from "@/Config/AxiosServices.js";
import {toast} from "sonner";

const VideoItem = ({video, setVideos}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const handleDeleteVideo = async (video) => {
        try {
            await AxiosServices.remove(`/videos/${video?.id}`)
            setVideos(prev => prev.filter(prevVideo => prevVideo.id !== video?.id));
            toast('Video deleted successfully!')
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <div className="bg-white p-4 border rounded-lg shadow-md first:mt-3 mb-5 last:mb-2">
                <div className="flex justify-end">
                    {
                        video.is_owner &&
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
                                <MoreVertical className="h-4 w-4"/>
                                <span className="sr-only">Open</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    className="flex cursor-pointer items-center"
                                    onClick={() => {
                                        setModalOpen(true)
                                    }}
                                >
                                    <FilePen className="mr-2 h-4 w-4"/>
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem
                                    className="flex cursor-pointer items-center"
                                    onClick={() => handleDeleteVideo(video)}
                                >
                                    <Trash2 className="mr-2 h-4 w-4"/>
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }
                </div>


                {/* Video Info */}
                <div className="flex justify-between items-center mb-2">
                    <p className="font-bold text-lg">{video.title}</p>
                </div>

                <p className="font-normal text-lg">{video.description}</p>

                {/* Date */}
                <p className="text-xs text-gray-500 mb-4">{video.created_at}</p>

                {/* Like */}
                <div className="flex items-center text-gray-500">
                    <div className="flex items-center mr-4">
                        <ThumbsUp className="mr-2 cursor-pointer"/>
                        <span className="text-sm">
                        {video.like_count}
                            {video.like_count > 1 ? " Likes" : " Like"}
                    </span>
                    </div>
                    <div className="flex items-center mr-4">
                        <MessageCircleMore className="mr-2 cursor-pointer"/>
                        <span className="text-sm">
                        {video.comment_count}
                            {video.comment_count > 1 ? " comments" : " comment"}
                    </span>
                    </div>
                </div>
            </div>
            {
                modalOpen &&
                <VideoEditModal setModalOpen={setModalOpen} modalOpen={modalOpen} setVideos={setVideos} video={video}/>
            }
        </>
    );
};

export default VideoItem;