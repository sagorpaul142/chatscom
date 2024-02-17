import {RouterProvider} from "react-router-dom";
import {Toaster} from "@/components/ui/sonner"
import router from "@/routing/routes.jsx";

function App() {

    return (
        <RouterProvider router={router}>
            <Toaster/>
        </RouterProvider>
    )
}

export default App
