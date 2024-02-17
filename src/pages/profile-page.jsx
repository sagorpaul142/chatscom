import {useEffect, useState} from "react";
import AxiosServices from "@/Config/AxiosServices.js";
import {useAuth} from "@/Contexts/AuthContext.jsx";
import {Helmet} from "react-helmet";

const ProfilePage = () => {
    const [loader, setLoader] = useState(false);
    const {user} = useAuth()
    const getProfile = async () => {
        try {
            let response = await AxiosServices.get(`/profiles/${user?.profile_id}`)
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getProfile()
    }, []);


    return (
        <>
            <Helmet>
                <title>Profile Page</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            profile
        </>
    );
};

export default ProfilePage;