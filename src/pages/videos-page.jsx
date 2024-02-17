import {useEffect, useState} from "react";
import axios from "axios";
import VideoItem from "@/components/video/video-item.jsx";
import AxiosServices from "@/Config/AxiosServices.js";

const VideosPage = () => {
    const [videos, setVideos] = useState([])
    const getVideos = async () => {
        try {
            let response = await AxiosServices.get('/videos/')
            console.log(response.data)
            setVideos(response.data.results)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getVideos()
    }, []);
    return (
        <>
            {
                videos.map(video => (
                    <VideoItem video={video} key={video.id}/>
                ))
            }
        </>
    );
};

export default VideosPage;