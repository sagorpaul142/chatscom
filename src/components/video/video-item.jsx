import React, {useEffect, useState} from 'react';
import {
    FilePen,
    MoreVertical,
    ThumbsUp,
    MessageCircleMore,
    Trash2,
    CircleUserRound,
    Loader2,
    SendHorizonal
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import VideoEditModal from "@/components/video/video-edit-modal.jsx";
import AxiosServices from "@/Config/AxiosServices.js";
import {toast} from "sonner";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {commentSchema} from "@/lib/validations/post.js";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {cn} from "@/lib/utils.js";
import {buttonVariants} from "@/components/ui/button.jsx";
import CommentEditModal from "@/components/comment-edit-modal.jsx";

const VideoItem = ({video, setVideos}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState([])
    const [commentsCount, setCommentsCount] = useState(0)
    const [commentEditModalOpen, setCommentEditModalOpen] = useState(false);
    const [comment, setComment] = useState({})

    const form = useForm({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            content: "",
        }
    });

    async function onsubmit(data) {
        setIsLoading(true)
        let payload = {
            video: video?.id,
            ...data
        }
        try {
            let response = await AxiosServices.post(`/videocomments/`, payload, false)
            console.log(response.data)
            setIsLoading(false)
            form.reset()
        } catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }

    const handleDeleteVideo = async (video) => {
        try {
            await AxiosServices.remove(`/videos/${video?.id}`)
            setVideos(prev => prev.filter(prevVideo => prevVideo.id !== video?.id));
            toast('Video deleted successfully!')
        } catch (e) {
            console.log(e)
        }
    }

    const handleDeleteComment = async (comment) => {
        try {
            await AxiosServices.remove(`/videocomments/${comment?.id}`)
            setComments(prev => prev.filter(prevComment => prevComment.id !== comment?.id));
            setCommentsCount(prevCommentsCount => prevCommentsCount - 1)
            toast('Video comment delete successfully!')
        } catch (e) {
            console.log(e)
        }
    }

    async function handleLikeVideo() {
        try {
            let response = await AxiosServices.post(`/likevideos/`, {video: video?.id})
            console.log(response.data)
            setVideos(videos => videos.map(video => video.id === response.data.video ? {
                ...video,
                like_count: video?.like_count + 1,
                likevideo_id: response.data.id
            } : video))
        } catch (e) {
            console.log(e)
        }
    }

    async function handleUnLikeVideo() {
        try {
            let response = await AxiosServices.remove(`/likevideos/${video.likevideo_id}`)
            setVideos(videos => videos.map(prevVideo => prevVideo.id === video.id ? {
                ...prevVideo,
                like_count: prevVideo?.like_count - 1,
                likevideo_id: null
            } : prevVideo))
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        async function getComments() {
            try {
                let response = await AxiosServices.get(`/videocomments/?video=${video.id}`)
                setCommentsCount(response.data.count)
                setComments(response.data.results)
            } catch (e) {
                console.log(e)
            }
        }

        getComments()
    }, [isLoading]);

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

                <div className="">
                    {
                        comments.length > 0 &&
                        comments.map(comment => (
                            <div key={comment.id} className="flex items-start gap-3 mb-5">
                                <CircleUserRound/>
                                <div className="bg-[#F4F6F8] w-full rounded-md p-3 shadow">
                                    <div className="flex gap-2">
                                        <div className="flex justify-between items-center w-full">
                                            <p className="font-bold">{comment.owner}</p>
                                            <p className="text-xs text-[#919EAB]">{comment?.created_at}</p>
                                        </div>
                                        {
                                            comment?.is_owner &&
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
                                                            setCommentEditModalOpen(!commentEditModalOpen)
                                                            setComment(comment)
                                                        }}
                                                    >
                                                        <FilePen className="mr-2 h-4 w-4"/>
                                                        Edit
                                                    </DropdownMenuItem><DropdownMenuSeparator/>
                                                    <DropdownMenuItem
                                                        className="flex cursor-pointer items-center"
                                                        onClick={() => handleDeleteComment(comment)}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4"/>
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        }
                                    </div>
                                    <p className="text-[#637381] text-[0.875rem]">{comment.content}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>

                {/* Like */}
                <div className="flex items-center text-gray-500">
                    <div className="flex items-center mr-4">
                        {
                            video.likevideo_id ?
                                <ThumbsUp className="mr-1 cursor-pointer text-blue-600" onClick={handleUnLikeVideo}/> :
                                <ThumbsUp className="mr-1 cursor-pointer" onClick={handleLikeVideo}/>
                        }
                        <span className="text-sm">
                        {video.like_count}
                            {video.like_count > 1 ? " Likes" : " Like"}
                    </span>
                    </div>
                    <div className="flex items-center mr-4">
                        <MessageCircleMore className="mr-2 cursor-pointer"/>
                        <span className="text-sm">
                        {commentsCount}
                            {commentsCount > 1 ? " comments" : " comment"}
                    </span>
                    </div>
                </div>

                <div className="">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onsubmit)}
                            autoComplete="off"
                            className="space-y-3 flex items-center justify-between"
                        >
                            <FormField
                                control={form.control}
                                name="content"
                                render={({field}) => (
                                    <FormItem className="w-11/12">
                                        <FormLabel className="sr-only"></FormLabel>
                                        <FormControl>
                                            <Input
                                                className="placeholder:text-gray-400"
                                                variant="ny"
                                                placeholder="Write a comment"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end w-1/12">
                                <button
                                    className={cn(
                                        buttonVariants(),
                                        "flex justify-center rounded-md px-3 py-1.5 font-semibold leading-6 text-white shadow-sm bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                    )}
                                    disabled={isLoading}
                                >
                                    {isLoading && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                    )}

                                    <SendHorizonal className=" h-4 w-4"/>
                                </button>
                            </div>
                        </form>
                    </Form>
                </div>

            </div>

            {
                commentEditModalOpen &&
                <CommentEditModal
                    setModalOpen={setCommentEditModalOpen}
                    modalOpen={commentEditModalOpen}
                    comment={comment}
                    setComments={setComments}
                    setComment={setComment}
                    url="/videocomments"
                    item="video"
                />
            }

            {
                modalOpen &&
                <VideoEditModal
                    setModalOpen={setModalOpen}
                    modalOpen={modalOpen}
                    setVideos={setVideos}
                    video={video}/>
            }
        </>
    );
};

export default VideoItem;