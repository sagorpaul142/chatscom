import {FilePen, MessageCircleMore, MoreVertical, ThumbsUp, Trash2} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import AxiosServices from "@/Config/AxiosServices.js";
import {toast} from "sonner";
import EditModal from "@/components/photo/edit-modal.jsx";
import React, {useState} from "react";

const PhotoItem = ({photo, setPhotos}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const handleDeletePhoto = async (photo) => {
        try {
            await AxiosServices.remove(`/photos/${photo?.id}`)
            setPhotos(prev => prev.filter(prevPhoto => prevPhoto.id !== photo?.id));
            toast('Photo deleted successfully!')
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
                        {photo.comment_count}
                            {photo.comment_count > 1 ? " Comments" : " Comment"}
                    </span>
                    </div>
                </div>
            </div>
            {
                modalOpen &&
                <EditModal setPhotos={setPhotos} photo={photo} modalOpen={modalOpen} setModalOpen={setModalOpen}/>
            }
        </>
    );
};

export default PhotoItem;