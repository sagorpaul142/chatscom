import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {userAuthLoginSchema} from "@/lib/validations/auth.js";
import {useEffect, useState} from "react";
import {ChevronRight, Loader2} from "lucide-react"
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "sonner"
import {useAuth} from "@/Contexts/AuthContext.jsx";
import {setSession} from "@/lib/utils.js";
import AxiosServices from "@/Config/AxiosServices.js";

const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const {user, setUser, setIsAuthenticated} = useAuth();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(userAuthLoginSchema),
    })

    async function onSubmit(data) {
        try {
            setIsLoading(true)
            let response = await AxiosServices.post('/dj-rest-auth/login/', data)
            if (response.status === 200) {
                setIsAuthenticated(true);
                setUser(response?.data?.user);
                let token = {
                    access: response.data.access_token,
                    refresh: response.data.refresh_token,
                    user: response.data.user
                }
                setSession(token)
                setError("")
                setIsLoading(false)
                toast('Successfully logged in!')
                navigate("/feed/home")
            }
            console.log(response)
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            console.log(err)
            if (err.response.status === 400) {
                setError(err.response.data.non_field_errors[0])
            }
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/feed/home")
        }
    }, [user]);

    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center relative">
            <div className="flex justify-end items-center my-5 absolute top-2 w-full">
                <Link
                    to="/signup"
                    className="flex items-center"
                > Sign up
                    <ChevronRight className="ml-2 h-4 w-4"/>
                </Link>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-2xl text-center font-semibold tracking-tight">
                    Welcome back
                </h1>
                <p className="text-sm text-center text-muted-foreground">
                    Enter your email to sign in to your account
                </p>
            </div>

            <div
                className="mt-6 sm:mx-auto sm:w-full sm:max-w-[480px] xl:max-w-[580px]"
            >
                <div className="px-6 py-12 shadow-xl mx-2 md:mx-0 sm:rounded-lg sm:px-12 border">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        {
                            error &&
                            <p className="text-sm font-medium text-destructive">{error}</p>
                        }
                        <div>
                            <Label
                                htmlFor="username"
                                className=" block text-sm font-medium leading-6"
                            >
                                User Name
                            </Label>
                            <div className="mt-2">
                                <Input
                                    id="username"
                                    variant="ny"
                                    placeholder="name@example.com"
                                    type="text"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                    disabled={isLoading}
                                    {...register("username")}
                                />
                                {errors?.username && (
                                    <p className="px-1 mt-1.5 text-xs text-red-600">{errors.username.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6"
                            >
                                Password
                            </Label>
                            <div className="mt-2">
                                <Input
                                    id="password"
                                    variant="ny"
                                    placeholder="Password"
                                    type="password"
                                    autoCapitalize="none"
                                    autoComplete="password"
                                    autoCorrect="off"
                                    disabled={isLoading}
                                    {...register("password")}
                                />
                                {errors?.password && (
                                    <p className="px-1 mt-1.5 text-xs text-red-600">{errors.password.message}</p>
                                )}
                            </div>
                        </div>

                        {/*<div className="flex items-center justify-end">*/}
                        {/*    <div className="text-sm leading-6">*/}
                        {/*        <Link to="/reset-password" className="font-semibold">*/}
                        {/*            Forgot password?*/}
                        {/*        </Link>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div>
                            <button
                                className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white bg-black shadow-sm"
                                disabled={isLoading}
                                type="submit"
                            >
                                {isLoading && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                )}
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <p className="my-5 text-center text-sm text-muted-foreground">
                <Link
                    to="/signup"
                    className="font-semibold leading-6 hover:text-brand underline underline-offset-4"
                >
                    Don&apos;t have an account? Sign Up
                </Link>
            </p>
        </div>
    );
};

export default Login;