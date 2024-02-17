import {FilePen, MessageCircleMore, MoreVertical, ThumbsUp, Trash2} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import AxiosServices from "@/Config/AxiosServices.js";
import {toast} from "sonner";

const SinglePost = ({post, setPosts}) => {
    const handleDeletePost = async (post) => {
        try {
            await AxiosServices.remove(`/posts/${post?.id}`)
            setPosts(prev => prev.filter(prevPost => prevPost.id !== post?.id));
            toast('Post deleted successfully!')
        } catch (e) {
            console.log(e)
        }
    }
    return (
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

            {/* Like, Comment, Share */}
            <div className="flex items-center text-gray-500">
                <div className="flex items-center mr-4">
                    <ThumbsUp className="mr-1 cursor-pointer"/>
                    <span className="text-sm">
                        {post.like_count}
                        {post.like_count > 1 ? " Likes" : " Like"}
                    </span>
                </div>
                <div className="flex items-center mr-4">
                    <MessageCircleMore className="mr-1 cursor-pointer"/>
                    <span className="text-sm">
                        {post.comment_count}
                        {post.comment_count > 1 ? " Comments" : " Comment"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SinglePost;