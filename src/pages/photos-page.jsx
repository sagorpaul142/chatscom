import {useEffect, useState} from "react";
import axios from "axios";
import PhotoItem from "@/components/photo-item.jsx";
import AxiosServices from "@/Config/AxiosServices.js";

const PhotosPage = () => {
    const [photos, setPhotos] = useState([])
    const getPhotos = async () => {
        try {
            let response = await AxiosServices.get('/photos/')
            console.log(response.data)
            setPhotos(response.data.results)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getPhotos()
    }, []);
    return (
        <>
            {
                photos.map(photo => (
                    <PhotoItem photo={photo} key={photo.id}/>
                ))
            }
        </>
    );
};

export default PhotosPage;