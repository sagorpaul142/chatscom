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
import EditModal from "@/components/photo/edit-modal.jsx";
import React, {useEffect, useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {cn} from "@/lib/utils.js";
import {buttonVariants} from "@/components/ui/button.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {commentSchema} from "@/lib/validations/post.js";
import CommentEditModal from "@/components/comment-edit-modal.jsx";

const PhotoItem = ({photo, setPhotos}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [commentEditModalOpen, setCommentEditModalOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState({})
    const [commentsCount, setCommentsCount] = useState(0)

    const form = useForm({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            content: "",
        }
    });

    async function onsubmit(data) {
        setIsLoading(true)
        let payload = {
            photo: photo?.id,
            ...data
        }
        try {
            let response = await AxiosServices.post(`/photocomments/`, payload, false)
            console.log(response.data)
            setIsLoading(false)
            form.reset()
        } catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }

    const handleDeletePhoto = async (photo) => {
        try {
            await AxiosServices.remove(`/photos/${photo?.id}`)
            setPhotos(prev => prev.filter(prevPhoto => prevPhoto.id !== photo?.id));
            toast('Photo deleted successfully!')
        } catch (e) {
            console.log(e)
        }
    }
    const handleDeleteComment = async (comment) => {
        try {
            await AxiosServices.remove(`/photocomments/${comment?.id}`)
            setComments(prev => prev.filter(prevComment => prevComment.id !== comment?.id));
            setCommentsCount(prevCommentsCount => prevCommentsCount - 1)
            toast('Photo comment delete successfully!')
        } catch (e) {
            console.log(e)
        }
    }

    async function handleLikePhoto() {
        try {
            let response = await AxiosServices.post(`/likephotos/`, {photo: photo?.id})
            console.log(response.data)
            setPhotos(photos => photos.map(photo => photo.id === response.data.photo ? {
                ...photo,
                like_count: photo?.like_count + 1,
                likephoto_id: response.data.id
            } : photo))
        } catch (e) {
            console.log(e)
        }
    }

    async function handleUnLikePhoto() {
        try {
            let response = await AxiosServices.remove(`/likephotos/${photo.likephoto_id}`)
            setPhotos(photos => photos.map(prevPhoto => prevPhoto.id === photo.id ? {
                ...prevPhoto,
                like_count: prevPhoto?.like_count - 1,
                likephoto_id: null
            } : prevPhoto))
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        async function getComments() {
            try {
                let response = await AxiosServices.get(`/photocomments/?photo=${photo.id}`)
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
            <div className="bg-white p-4 border rounded-lg shadow-md first:mt-5 mb-4">
                <div className="flex justify-end">
                    {
                        photo.is_owner &&
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
                                        setModalOpen(!modalOpen)
                                    }}
                                >
                                    <FilePen className="mr-2 h-4 w-4"/>
                                    Edit
                                </DropdownMenuItem><DropdownMenuSeparator/>
                                <DropdownMenuItem
                                    className="flex cursor-pointer items-center"
                                    onClick={() => handleDeletePhoto(photo)}
                                >
                                    <Trash2 className="mr-2 h-4 w-4"/>
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }
                </div>

                {/* Photo */}
                <img
                    src={photo.image}
                    alt="User Photo"
                    className="w-full h-64 object-cover rounded-md mb-4"
                />
                <p className="text-base mb-4">
                    {photo?.caption}
                </p>
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

                {/* Like, Comment */}
                <div className="flex items-center text-gray-500 mb-4">
                    <div className="flex items-center mr-4">
                        {
                            photo.likephoto_id ?
                                <ThumbsUp className="mr-1 cursor-pointer text-blue-600" onClick={handleUnLikePhoto}/> :
                                <ThumbsUp className="mr-1 cursor-pointer" onClick={handleLikePhoto}/>
                        }
                        <span className="text-sm">
                        {photo.like_count}
                            {photo.like_count > 1 ? " Likes" : " Like"}
                    </span>
                    </div>
                    <div className="flex items-center mr-4">
                        <MessageCircleMore className="mr-2 cursor-pointer"/>
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
                    url="/photocomments"
                    item="photo"
                />
            }
            {
                modalOpen &&
                <EditModal
                    setPhotos={setPhotos}
                    photo={photo}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}/>
            }
        </>
    );
};

export default PhotoItem;