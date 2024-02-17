import {useEffect, useState} from "react";
import VideoItem from "@/components/video/video-item.jsx";
import AxiosServices from "@/Config/AxiosServices.js";
import {Helmet} from "react-helmet";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";
import {Loader2, XCircle} from "lucide-react";
import {cn} from "@/lib/utils.js";
import {buttonVariants} from "@/components/ui/button.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {videoCreateSchema} from "@/lib/validations/video.js";
import {Input} from "@/components/ui/input.jsx";
import {toast} from "sonner";

const VideosPage = () => {
    const [videos, setVideos] = useState([])
    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(videoCreateSchema),
        defaultValues: {
            title: "",
            description: "",
            video_file: ""
        },
    });

    const onsubmit = async (data) => {
        setIsLoading(true)
        let values = {
            title: data.title,
            description: data.description,
        }
        if (image) {
            values.video_file = image
        }
        try {
            let response = await AxiosServices.post('/videos/', values, true)
            console.log(response.data)
            setIsLoading(false)
            setImage("")
            setFileName("")
            form.reset()
            toast('Video created successfully!')
            setVideos(videos => [response.data, ...videos])
        } catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }

    const getVideos = async () => {
        try {
            let response = await AxiosServices.get('/videos/')
            // console.log(response.data)
            setVideos(response.data.results)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getVideos()
    }, []);
    return (
        <>
            <Helmet>
                <title>Videos Page</title>
                <meta name="description" content="Helmet application"/>
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
                                name="title"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="sr-only">User Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                variant="ny"
                                                placeholder="title..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="sr-only">User Name</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                variant="ny"
                                                placeholder="description..."
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
                                    name="video_file"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="">Video file</FormLabel>
                                            <FormControl>
                                                <input
                                                    type="file"
                                                    accept="video/mp4,video/x-m4v,video/*"
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
                                    Submit
                                </button>
                            </div>
                        </form>
                    </Form>
                </div>
                {
                    videos.map(video => (
                        <VideoItem video={video} key={video.id} setVideos={setVideos}/>
                    ))
                }
            </div>
        </>
    );
};

export default VideosPage;