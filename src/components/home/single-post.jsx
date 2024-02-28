import {
    CircleUserRound,
    FilePen,
    Loader2,
    MessageCircleMore,
    MoreVertical,
    SendHorizonal,
    ThumbsUp,
    Trash2
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import AxiosServices from "@/Config/AxiosServices.js";
import {toast} from "sonner";
import React, {useEffect, useState} from "react";
import PostEditModal from "@/components/home/post-edit-modal.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {cn} from "@/lib/utils.js";
import {buttonVariants} from "@/components/ui/button.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {commentSchema} from "@/lib/validations/post.js";
import CommentEditModal from "@/components/comment-edit-modal.jsx";

const SinglePost = ({post, setPosts}) => {
    const [comments, setComments] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
            post: post?.id,
            ...data
        }
        try {
            let response = await AxiosServices.post(`/comments/`, payload, false)
            console.log(response.data)
            setIsLoading(false)
            form.reset()
        } catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }

    const handleDeletePost = async (post) => {
        try {
            await AxiosServices.remove(`/posts/${post?.id}`)
            setPosts(prev => prev.filter(prevPost => prevPost.id !== post?.id));
            toast('Post deleted successfully!')
        } catch (e) {
            console.log(e)
        }
    }

    const handleDeleteComment = async (comment) => {
        try {
            await AxiosServices.remove(`/comments/${comment?.id}`)
            setComments(prev => prev.filter(prevComment => prevComment.id !== comment?.id));
            setCommentsCount(prevCommentsCount => prevCommentsCount - 1)
            toast('Post comment delete successfully!')
        } catch (e) {
            console.log(e)
        }
    }
    async function handleLikePost() {
        try {
            let response = await AxiosServices.post(`/likes/`, {post: post?.id})
            setPosts(posts => posts.map(post => post.id === response.data.post ? {
                ...post,
                like_count: post?.like_count + 1,
                like_id: response.data.id
            } : post))
        } catch (e) {
            console.log(e)
        }
    }

    async function handleUnLikePost() {
        try {
            let response = await AxiosServices.remove(`/likes/${post.like_id}`)
            setPosts(posts => posts.map(prevPost => prevPost.id === post.id ? {
                ...prevPost,
                like_count: prevPost?.like_count - 1,
                like_id: null
            } : prevPost))
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        async function getComments() {
            try {
                let response = await AxiosServices.get(`/comments/?post=${post.id}`)
                setComments(response.data.results)
                setCommentsCount(response.data.count)
            } catch (e) {
                console.log(e)
            }
        }

        getComments()
    }, [isLoading]);

    return (
        <>
            <div className="bg-white p-4 border rounded-lg shadow-md mb-3 last:mb-0 first:mt-5">
                {/* Post Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <img
                            src={post?.profile_picture || "https://placekitten.com/40/40"}
                            alt="User Avatar"
                            className="w-8 h-8 rounded-full mr-2"
                        />
                        <div>
                            <p className="font-bold text-sm">{post?.owner}</p>
                            <p className="text-xs text-gray-500">{post?.created_at}</p>
                        </div>
                    </div>

                    {
                        post.is_owner &&
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
                                    onClick={() => handleDeletePost(post)}
                                >
                                    <Trash2 className="mr-2 h-4 w-4"/>
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }

                </div>

                {/* Post Content */}
                <p className="text-base mb-4">
                    {post?.content}
                </p>

                {/* Post Image */}
                <img
                    src={post.post_picture || "https://placekitten.com/600/400"}
                    alt="Post Image"
                    className="w-full rounded-md mb-4"
                />

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

                {/* Like, Comment, Share */}
                <div className="flex items-center text-gray-500">
                    <div className="flex items-center mr-4">
                        {
                            post.like_id ?
                                <ThumbsUp className="mr-1 cursor-pointer text-blue-600" onClick={handleUnLikePost}/> :
                                <ThumbsUp className="mr-1 cursor-pointer" onClick={handleLikePost}/>
                        }
                        <span className="text-sm">
                        {post.like_count}
                            {post.like_count > 1 ? " Likes" : " Like"}
                    </span>
                    </div>
                    <div className="flex items-center mr-4">
                        <MessageCircleMore className="mr-1 cursor-pointer"/>
                        <span className="text-sm">
                        {commentsCount}
                            {commentsCount > 1 ? " Comments" : " Comment"}
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
                    url="/comments"
                    item="post"
                />
            }

            {
                modalOpen &&
                <PostEditModal setPosts={setPosts} post={post} modalOpen={modalOpen} setModalOpen={setModalOpen}/>
            }
        </>
    );
};

export default SinglePost;