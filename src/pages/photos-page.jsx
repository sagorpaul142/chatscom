import {useEffect, useState} from "react";
import PhotoItem from "@/components/photo-item.jsx";
import AxiosServices from "@/Config/AxiosServices.js";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";
import {Loader2, XCircle} from "lucide-react";
import {cn} from "@/lib/utils.js";
import {buttonVariants} from "@/components/ui/button.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {postSchema} from "@/lib/validations/post.js";
import {Helmet} from "react-helmet";

const PhotosPage = () => {
    const [photos, setPhotos] = useState([])
    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(postSchema),
        defaultValues: {
            content: "",
            post_picture: "",
        },
    });

    const onsubmit = async (data) => {
    }
    const getPhotos = async () => {
        try {
            let response = await AxiosServices.get('/photos/')
            // console.log(response.data)
            setPhotos(response.data.results)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getPhotos()
    }, []);
    return (
        <>
            <Helmet>
                <title>Photos Page</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div className="max-w-3xl mx-auto">
                <div className="bg-white p-4 border rounded-lg shadow-md mb-3 mt-5">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onsubmit)}
                            autoComplete="off"
                            className="space-y-3"
                        >
                            <FormField
                                control={form.control}
                                name="content"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="sr-only">User Name</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                variant="ny"
                                                placeholder="Post content..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            {
                                !fileName &&
                                <FormField
                                    control={form.control}
                                    name="post_picture"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="sr-only">Post Picture</FormLabel>
                                            <FormControl>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    {...field}
                                                    onChange={e => {
                                                        setFileName(e.target.files[0].name)
                                                        setImage(e.target.files[0])
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            }

                            {
                                fileName &&
                                <div className="flex items-center gap-2">
                                    <p>{fileName}</p>
                                    <XCircle
                                        className="h-5 w-5 cursor-pointer"
                                        onClick={() => {
                                            setFileName("")
                                            setImage(null)
                                        }}
                                    />
                                </div>
                            }
                            <div className="flex justify-end">
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
                                    Post
                                </button>
                            </div>
                        </form>
                    </Form>
                </div>
                {
                    photos.map(photo => (
                        <PhotoItem photo={photo} key={photo.id}/>
                    ))
                }
            </div>
        </>
    );
};

export default PhotosPage;