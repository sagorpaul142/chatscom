import {createContext, useEffect, useState} from 'react';
import {Loader2} from "lucide-react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    // const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);


    // useEffect(() => {
    //     (async () => {
    //         // if (window.localStorage.getItem('device_id')) {
    //         //     setLoading(false);
    //         //     return;
    //         // } else {
    //         //     setLoading(false)
    //         // }
    //
    //     })();
    // }, []);
    //
    // useMemo(() => {
    //     axios.interceptors.request.use(
    //         async (config) => {
    //             if (shouldRefreshToken()) {
    //                 try {
    //                     await axios.post("/dj-rest-auth/token/refresh/");
    //                 } catch (err) {
    //                     setCurrentUser((prevCurrentUser) => {
    //                         if (prevCurrentUser) {
    //                             redirect("/");
    //                         }
    //                         return null;
    //                     });
    //                     removeTokenTimestamp();
    //                     return config;
    //                 }
    //             }
    //             return config;
    //         },
    //         (err) => {
    //             return Promise.reject(err);
    //         }
    //     );
    //
    //     axios.interceptors.response.use(
    //         (response) => response,
    //         async (err) => {
    //             if (err.response?.status === 401) {
    //                 try {
    //                     await axios.post("/dj-rest-auth/token/refresh/");
    //                 } catch (err) {
    //                     setCurrentUser((prevCurrentUser) => {
    //                         if (prevCurrentUser) {
    //                             redirect("/");
    //                         }
    //                         return null;
    //                     });
    //                     removeTokenTimestamp();
    //                 }
    //                 return axios(err.config);
    //             }
    //             return Promise.reject(err);
    //         }
    //     );
    // }, [history]);

    // useEffect(() => {
    //     axios.post('http://127.0.0.1:8000/dj-rest-auth/token/refresh', {
    //         "refresh": "string"
    //         // access: window.localStorage.getItem('device_id')
    //     })
    //         .then(function (response) {
    //             console.log(response.data);
    //             localStorage.setItem('device_id', response.data.access_token);
    //             setIsAuthenticated(true);
    //             setUser(response.data.user);
    //         })
    //         .catch(function (error) {
    //             console.log(error.response.data);
    //         });
    // }, []);

    return (
        <>
            {loading ? (
                <Loader2/>
            ) : (
                <AuthContext.Provider
                    value={{currentUser, setCurrentUser, isAuthenticated, setIsAuthenticated}}
                >
                    {children}
                </AuthContext.Provider>
            )}
        </>
    );
};
