import {useEffect, useState} from "react";
import AxiosServices from "@/Config/AxiosServices.js";
import {Helmet} from "react-helmet";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {userProfileUpdateSchema} from "@/lib/validations/user.js";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {cn} from "@/lib/utils.js";
import {buttonVariants} from "@/components/ui/button.jsx";
import {Loader2} from "lucide-react";
import {toast} from "sonner";
import FollowerItem from "@/components/profile/follower-item.jsx";

const ProfilePage = () => {
    const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem('user')) : null)
    const [followers, setFollowers] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState([])

    const form = useForm({
        resolver: zodResolver(userProfileUpdateSchema),
        defaultValues: {
            username: user.username || "",
            first_name: user.first_name || "",
            last_name: user.last_name || "",
        }
    })
    const onsubmit = async (data) => {
        setIsLoading(true)

        try {
            let response = await AxiosServices.put('/dj-rest-auth/user/', data, false)
            // console.log(response.data)
            localStorage.setItem("user", JSON.stringify(response.data))
            toast.success("User data update successfully")
            setIsLoading(false)
        } catch (e) {
            console.log(e.response.data)
            setError(e.response.data.username)
            setIsLoading(false)
        }
    }


    const getFollowers = async () => {
        try {
            let response = await AxiosServices.get(`/followers/`)
            setFollowers(response.data.results)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getFollowers()
    }, []);

    return (
        <>
            <Helmet>
                <title>Profile Page</title>
                <meta name="description" content="Helmet application"/>
            </Helmet>

            <div className="max-w-2xl mx-auto">
                <div className="bg-white p-4 border rounded-lg shadow-md mb-3 mt-5">
                    <div className="bg-white p-4 border rounded-lg shadow-md mb-3 mt-5">
                        <Form {...form}>

                            {
                                error.length > 0 &&
                                error.map(err => (
                                    <p key={err} className="text-sm font-medium text-destructive">{err}</p>
                                ))
                            }

                            <form
                                onSubmit={form.handleSubmit(onsubmit)}
                                autoComplete="off"
                                className="space-y-3"
                            >
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="">User Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    variant="ny"
                                                    placeholder="username"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="first_name"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="">First Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    variant="ny"
                                                    placeholder="First Name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="last_name"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="">Last Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    variant="ny"
                                                    placeholder="Last Name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <button
                                    className={cn(
                                        buttonVariants(),
                                        "flex justify-center w-full rounded-md px-3 py-1.5 font-semibold leading-6 text-white shadow-sm bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                    )}
                                    disabled={isLoading}
                                >
                                    {isLoading && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                    )}
                                    Update
                                </button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1">
                <div className="bg-white p-4 border rounded-lg shadow-md mb-3 mt-5">
                    <h2 className="text-2xl font-bold mb-3">Followers</h2>
                    {
                        followers?.length > 0 ?
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                                {followers.map(follower => (
                                    <FollowerItem key={follower.id} follower={follower}/>
                                ))}
                            </div>
                            :
                            <p className="text-xl mt-10 font-semibold text-center">No data found</p>
                    }
                </div>
            </div>
        </>
    );
};

export default ProfilePage;