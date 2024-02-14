import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {AuthProvider} from "@/Contexts/AuthContext.jsx";
import "@/Config/axios.js"

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <AuthProvider>
            <App/>
        </AuthProvider>
    </>,
)
