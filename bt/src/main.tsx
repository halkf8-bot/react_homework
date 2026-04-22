import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello World</div>,
    },
    {
        path: "f8",
        element: <div>Hello F8</div>,
    },
]);

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />,
)
