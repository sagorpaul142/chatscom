import {useEffect, useState} from 'react';
import SinglePost from "@/components/home/single-post.jsx";
import AxiosServices from "@/Config/AxiosServices.js";

const HomePage = () => {
    const [posts, setPosts] = useState([])
    const getAllPosts = async () => {
        try {
            let response = await AxiosServices.get('/posts/')
            console.log(response.data)
            setPosts(response.data.results)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllPosts()
    }, []);

    return (
        <>
            {
                posts.map(post => (
                    <SinglePost key={post.id} post={post}/>

                ))
            }
        </>
    );
};

export default HomePage;