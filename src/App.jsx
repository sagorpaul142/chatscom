import {RouterProvider} from "react-router-dom";
import routes from "./routing/routes.jsx";
import {Toaster} from "@/components/ui/sonner"

function App() {

    return (
        <>
            <RouterProvider router={routes}/>
            <Toaster/>
        </>
    )
}

export default App
