import {clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export const shouldRefreshToken = () => {
    return !!localStorage.getItem("device_id");
};

export const removeTokenTimestamp = () => {
    localStorage.removeItem("device_id");
};