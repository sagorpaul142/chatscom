import {useEffect, useState} from 'react';
import {ChevronRight, Loader2} from "lucide-react";
import {Input} from "@/components/ui/input.jsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {userAuthSignupSchema} from "@/lib/validations/auth.js";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {buttonVariants} from "@/components/ui/button.jsx";
import {cn} from "@/lib/utils.js";
import {useAuth} from "@/Contexts/AuthContext.jsx";
import AxiosServices from "@/Config/AxiosServices.js";
import {Helmet} from "react-helmet";

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const {user} = useAuth()
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(userAuthSignupSchema),
        defaultValues: {
            username: "",
            email: "",
            password1: "",
            password2: "",
        },
    });

    async function onSubmit(data) {
        try {
            setIsLoading(true)
            let response = await AxiosServices.post('/dj-rest-auth/registration/', data)
            setErrors({})
            setIsLoading(false)
            navigate("/")
            form.reset()

            console.log(response)
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            console.log(err)
            setErrors(err.response.data)
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/feed/home")
        }
    }, [user]);

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center">
            <Helmet>
                <title>Signup Page</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div className="flex justify-end items-center my-5">
                <Link
                    to="/"
                    className="flex items-center"
                > Login
                    <ChevronRight className="ml-2 h-4 w-4"/>
                </Link>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-[480px] xl:max-w-[580px]">
                <div className=" px-6 py-12 shadow-xl mx-2 md:mx-0 sm:rounded-lg sm:px-12 border">

                    <Form {...form}>
                        {
                            errors?.username?.map(error => (
                                <p key={error} className="text-sm font-medium text-destructive">{error}</p>
                            ))
                        }
                        {
                            errors?.email?.map(error => (
                                <p key={error} className="text-sm font-medium text-destructive">{error}</p>
                            ))
                        }
                        {
                            errors?.password1?.map(error => (
                                <p key={error} className="text-sm font-medium text-destructive">{error}</p>
                            ))
                        }
                        {
                            errors?.password2?.map(error => (
                                <p key={error} className="text-sm font-medium text-destructive">{error}</p>
                            ))
                        }
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            autoComplete="off"
                            className="space-y-3"
                        >
                            <FormField
                                control={form.control}
                                name="username"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>User Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                variant="ny"
                                                placeholder="User Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                variant="ny"
                                                type="email"
                                                placeholder="Email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password1"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                variant="ny"
                                                type="password"
                                                placeholder="Password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password2"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                variant="ny"
                                                type="password"
                                                placeholder="Confirm Password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <div>
                                <button
                                    className={cn(
                                        buttonVariants(),
                                        "flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
                                    )}
                                    disabled={isLoading}
                                >
                                    {isLoading && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                    )}
                                    Sign In
                                </button>
                            </div>
                        </form>

                    </Form>

                    <div>
                        <div className="relative mt-6">
                            <div
                                className="absolute inset-0 flex items-center"
                                aria-hidden="true"
                            >
                                <div className="w-full border-t"/>
                            </div>
                            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="bg-background px-6 py-2 rounded">
                Or continue with
              </span>
                            </div>
                        </div>

                    </div>
                </div>
                <p className="mt-5 mb-2 text-center text-sm text-muted-foreground">
                    <Link
                        to="/"
                        className="font-semibold leading-6 hover:text-brand underline underline-offset-4"
                    >
                        Already have an account? Login
                    </Link>
                </p>
            </div>

        </div>
    );
};

export default SignUp;