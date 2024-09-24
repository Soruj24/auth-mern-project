import {
    createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import Home from "../page/Home";
import SignIn from "../page/SignIn";
import SignUp from "../page/SignUp";
import Profile from "../page/Profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/signin',
                element: <SignIn />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
            {
                path: 'profile',
                element: <Profile />
            }
        ],
    },
]);

export default router