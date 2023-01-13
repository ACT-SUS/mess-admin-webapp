import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import AccountActivation from 'pages/extra-pages/AccountActivation';
import Settings from 'pages/extra-pages/Settings';
import AllStudents from 'pages/extra-pages/AllStudents';
import Inventory from 'pages/extra-pages/Inventory';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const MenuPage = Loadable(lazy(() => import('pages/extra-pages/MenuPage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));

// ==============================|| MAIN ROUTING ||============================== //
const authenticated = localStorage.getItem("authenticated")
console.log(authenticated)

const MainRoutes = {
    path: '/app',
    element: <MainLayout />,
    children: [
        {
            path: 'color',
            element: <Color />
        },
        {
            path: 'dashboard',
            element: <DashboardDefault />
        },
        {
            path: 'menu-page',
            element: <MenuPage />
        },
        {
            path: 'account-activation',
            element: <AccountActivation />
        },
        {
            path: 'allstudents',
            element: <AllStudents />
        },
        {
            path: 'settings',
            element: <Settings />
        },
        {
            path: 'inventory',
            element: <Inventory />
        },
        {
            path: 'shadow',
            element: <Shadow />
        },
        {
            path: 'typography',
            element: <Typography />
        },
    ]
};

export default MainRoutes;
