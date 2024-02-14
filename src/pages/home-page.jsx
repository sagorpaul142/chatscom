import {useEffect} from 'react';
import axios from "axios";
import Layout from "@/components/layout/Layout.jsx";

const HomePage = () => {
    const getProfile = () => {
        axios.get('/profiles/', {withCredentials: true})
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    }
    useEffect(() => {
        getProfile()
    }, []);

    return (
        <Layout>
            sdkfjhsdf
        </Layout>
    );
};

export default HomePage;