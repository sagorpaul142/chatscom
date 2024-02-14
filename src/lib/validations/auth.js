import * as z from "zod"

export const userAuthLoginSchema = z.object({
    username: z.string().min(3, {message: "User name must contain at least 3 character(s)"}),
    password: z.string().min(1, {message: 'Password is required'})
})

export const userAuthSignupSchema = z.object({
    username: z.string().min(3, {message: "User name must contain at least 3 character(s)"}),
    email: z.string().email(),
    password1: z.string().min(8, {message: "Password must contain at least 8 character(s)"}).max(100),
    password2: z.string().min(8, {message: "Confirm Password must contain at least 8 character(s)"}).max(100),
}).refine((data) => data.password1 === data.password2, {
    message: "Passwords don't match",
    path: ["password2"],
});