import {useState} from "react";
import {Loader2, XCircle} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {cn} from "@/lib/utils.js";
import {buttonVariants} from "@/components/ui/button.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {photo1Schema} from "@/lib/validations/photo.js";
import AxiosServices from "@/Config/AxiosServices.js";
import {toast} from "sonner";

const EditModal = ({modalOpen, setModalOpen, photo, setPhotos}) => {
    const [isLoading, setIsLoading] = useState(false);

    // console.log(photo)

    const form = useForm({
        resolver: zodResolver(photo1Schema),
        defaultValues: {
            caption: photo?.caption || "",
        },
    });

    const onsubmit = async (data) => {
        setIsLoading(true)
        try {
            let response = await AxiosServices.put(`/photos/${photo.id}/`, data, false)
            setIsLoading(false)
            form.reset()
            toast('Photo Uudated successfully!')
            setPhotos(photos => photos.map(photo => photo?.id === response.data.id ? response.data : photo))
            setModalOpen(false)
        } catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }

    return (
        <div
            className={`fixed left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-[#0e0e0eb3] px-4 py-5 ${
                modalOpen ? "block" : "hidden"
            }`}
        >
            <div
                className="relative w-full max-w-[570px] rounded bg-[#242526] px-8 py-12 md:px-[40px] md:py-[50px] text-white"
            >
                <h2 className="text-2xl">Edit Photo</h2>

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
                                            className="bg-black text-white placeholder:text-gray-400"
                                            variant="ny"
                                            placeholder="caption..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
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

                <button
                    onClick={() => setModalOpen(false)}
                    className="absolute right-6 top-6 flex h-7 w-7 items-center justify-center rounded-full bg-white bg-opacity-10 text-white transition"
                >
                    <XCircle/>
                </button>
            </div>
        </div>
    );
};

export default EditModal;
