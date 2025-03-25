import { createBrowserRouter } from "react-router";


// pages
import HomePage from '@/pages/HomePage';
import RegisterPage from '@/pages/RegisterPage';
import LoginPage from "@/pages/LoginPage";
import AuthSyncPage from "@/pages/AuthSyncPage";
import TodayTaskPage from "@/pages/TodayTaskPage";
import UpcomingTaskPage from "@/pages/UpcomingTaskPage";
import CompletedTaskPage from '@/pages/CompletedTaskPage'
import ProjectsPage from "@/pages/ProjectsPage";
import ProjectDetailPage from "@/pages/ProjectDetailPage";


import InboxPage from "@/pages/InboxPage";
//layouts
import RootLayout from "@/layouts/RootLayout";
import AppLayout from "@/layouts/AppLayout";


//loader 
import inboxTaskLoader from "@/routes/loaders/inboxLoader";
import todayTaskLoader from '@/routes/loaders/todayTaskLoader'
import upcomingTaskLoader from "./loaders/upcomingTaskLoader";
import completedTaskLoader from "./loaders/completedTaskLoader";
import projectsLoader from "./loaders/projectsLoader";
import projectDetailLoader from './loaders/projectDetailLoader'
import appLoader from "./loaders/appLoader";

//types
import type { RouteObject } from "react-router";

import  RootErrorBoundary  from "@/pages/RootErrorBoundary";
import ProjectErrorBoundary from "@/pages/ProjectErrorBoundary";

import appAction from "./actions/appAction";
import projectAction from './actions/projectAction';

const rootRouteChildren : RouteObject[] = [
    {
        index : true,
        element : <HomePage/>,
    },
    {
        path: "register",
        element: <RegisterPage></RegisterPage>
    },
    {
        path: "login",
        element: <LoginPage></LoginPage>
    },
    {
        path: 'auth-sync',
        element: <AuthSyncPage></AuthSyncPage>
    }
]
const appRouteChildren : RouteObject[] = [
    {
        path:'inbox',
        element:<InboxPage></InboxPage>,
        loader: inboxTaskLoader
    },
    {
        path:'today',
        element: <TodayTaskPage></TodayTaskPage>,
        loader:todayTaskLoader
    },{
        path:'upcoming',
        element: <UpcomingTaskPage></UpcomingTaskPage>,
        loader:upcomingTaskLoader
    },{
        path:'completed',
        element: <CompletedTaskPage></CompletedTaskPage>,
        loader:completedTaskLoader
    },{
        path:'projects',
        element: <ProjectsPage></ProjectsPage>,
        action: projectAction,
        loader: projectsLoader,
    },{
        path: 'projects/:projectId',
        element: <ProjectDetailPage></ProjectDetailPage>,
        loader: projectDetailLoader,
        errorElement: <ProjectErrorBoundary></ProjectErrorBoundary>
    }
]
const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        errorElement : <RootErrorBoundary></RootErrorBoundary>
        ,children: rootRouteChildren
    },{
        path: "/app",
        element:<AppLayout></AppLayout>,
        children: appRouteChildren,
        action: appAction,
        loader: appLoader,
    }
])
export default router;