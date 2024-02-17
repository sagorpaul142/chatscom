import {useEffect, useState} from "react";
import AxiosServices from "@/Config/AxiosServices.js";
import {useAuth} from "@/Contexts/AuthContext.jsx";

const ProfilePage = () => {
    const [loader, setLoader] = useState(false);
    const {user} = useAuth()
    const getProfile = async () => {
        try {
            let response = await AxiosServices.get(`/profiles/${user?.profile_id}`)
            if (response.status === 200){
                console.log(response.data)
            }
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getProfile()
    }, []);


    return (
        <>
            profile
        </>
    );
};

export default ProfilePage;