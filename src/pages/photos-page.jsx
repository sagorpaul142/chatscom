import {useEffect, useState} from "react";
import PhotoItem from "@/components/photo/photo-item.jsx";
import AxiosServices from "@/Config/AxiosServices.js";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Loader2, XCircle} from "lucide-react";
import {cn} from "@/lib/utils.js";
import {buttonVariants} from "@/components/ui/button.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Helmet} from "react-helmet";
import {toast} from "sonner";
import {photoSchema} from "@/lib/validations/photo.js";
import {Input} from "@/components/ui/input.jsx";

const PhotosPage = () => {
    const [photos, setPhotos] = useState([])
    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([])

    const form = useForm({
        resolver: zodResolver(photoSchema),
        defaultValues: {
            caption: "",
            image: "",
        },
    });

    const onsubmit = async (data) => {
        setIsLoading(true)
        let values = {
            caption: data.caption,
            image: image
        }
        try {
            let response = await AxiosServices.post('/photos/', values, true)
            console.log(response.data)
            setIsLoading(false)
            setImage("")
            setFileName("")
            form.reset()
            toast('Photo created successfully!')
            setPhotos(photos => [response.data, ...photos])
            setErrors([])
        } catch (err) {
            setIsLoading(false)
            setErrors(err.response.data.image)
            console.log(err)
        }
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
                <meta name="description" content="Helmet application"/>
            </Helmet>
            <div className="max-w-3xl mx-auto">
                <div className="bg-white p-4 border rounded-lg shadow-md mb-3 mt-5">
                    {
                        errors.map(error => (
                            <p key={error} className="text-sm font-medium text-destructive">{error}</p>
                        ))
                    }
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onsubmit)}
                            autoComplete="off"
                            className="space-y-3"
                        >
                            <FormField
                                control={form.control}
                                name="caption"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="sr-only">caption</FormLabel>
                                        <FormControl>
                                            <Input
                                                variant="ny"
                                                placeholder="caption..."
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
                                    name="image"
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
                                    Submit
                                </button>
                            </div>
                        </form>
                    </Form>
                </div>
                {
                    photos.map(photo => (
                        <PhotoItem photo={photo} key={photo.id} setPhotos={setPhotos}/>
                    ))
                }
            </div>
        </>
    );
};

export default PhotosPage;