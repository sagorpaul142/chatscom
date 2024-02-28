import React, {useState} from 'react';
import {Loader2, SendHorizonal, XCircle} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {cn} from "@/lib/utils.js";
import {buttonVariants} from "@/components/ui/button.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {commentSchema} from "@/lib/validations/post.js";
import AxiosServices from "@/Config/AxiosServices.js";

const CommentEditModal = ({modalOpen, setModalOpen, comment, setComments, setComment, url, item}) => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            content: comment.content || "",
        }
    });
    async function onsubmit(data) {
        setIsLoading(true)
        let payload = {
            [item]: comment?.id,
            ...data
        }
        try {
            let response = await AxiosServices.put(`${url}/${comment.id}/`, payload, false)
            setComments(comments => comments.map(com => com.id === response.data.id ? response.data : com))
            setComment({})
            setIsLoading(false)
            setModalOpen(false)
            form.reset()
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
                <h2 className="text-2xl">Edit Comment</h2>

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
                                    <FormLabel className="sr-only"></FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-black text-white placeholder:text-gray-400"
                                            variant="ny"
                                            placeholder="Write a comment"
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
                                Update
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

export default CommentEditModal;