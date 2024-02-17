import {FilePen, MessageCircleMore, MoreVertical, ThumbsUp} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";

const PhotoItem = ({photo}) => {
    return (
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

                                }}
                            >
                                <FilePen className="mr-2 h-4 w-4"/>
                                Edit
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
                    <ThumbsUp className="mr-1"/>
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
    );
};

export default PhotoItem;