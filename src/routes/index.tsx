import { Navigate, useRoutes } from 'react-router-dom';
import DashBoard from 'src/pages/Dashboard/DashBoard';
import AccessorList from 'src/pages/Assessor/AssessorList';
import Jobs from 'src/pages/Jobs/Jobs';
import MainLayout from 'src/pages/Layout/MainLayout';
import GuestGuard from '../auth/GuestGuard';

// config
import { PATH_AFTER_LOGIN } from '../config-global';
//
import {
  PageTwo,
  LoginPage,
  PageThree,
  MainPage,
} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: (
          <MainLayout />
      ),
      children: [
        { element: <DashBoard/>, index: true },
        { path: 'jobs', element: <Jobs /> },
        { path: 'accessorlist', element: <AccessorList /> },
        { path: 'three', element: <PageThree /> },
       
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
