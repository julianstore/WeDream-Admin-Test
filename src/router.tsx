import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import Overview from './content/overview';
import Dashboard from './content/dashboards'
import SignIn from 'src/content/pages/SignIn';
import AuthRoute from 'src/contexts/AuthRoute';
import BaseLayout from 'src/layouts/BaseLayout';
import SidebarLayout from 'src/layouts/SidebarLayout';
import ApplicationsUsers from './content/applications/Users/list';
import ApplicationsDreams from 'src/content/applications/Dreams/list';
import ApplicationsCategories from './content/applications/Categories/list';
import ApplicationsVoiceRequests from './content/applications/VoiceRequest/list';
import ManagementUserProfile from './content/applications/Users/profile';

// ** Lazy Loading Components **
// import { Suspense, lazy } from 'react';
// import SuspenseLoader from 'src/components/SuspenseLoader';
// const Loader = (Component) => (props) => {
//   return (
//     <Suspense fallback={<SuspenseLoader />}>
//       <Component {...props} />
//     </Suspense>
//   );
// };
// const Users = Loader(lazy(() => import('src/content/applications/Users/list')));
// const Categories = Loader(
//   lazy(() => import('src/content/applications/Categories/list'))
// );
// const Dreams = Loader(
//   lazy(() => import('src/content/applications/Dreams/list'))
// );
// const SignIn = Loader(lazy(() => import('src/content/pages/SignIn')));

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="dashboard" replace />
      },
      {
        path: '/signin',
        element: <SignIn />
      }
    ]
  },
  {
    path: 'overview',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: (
          <AuthRoute>
            <Overview />
          </AuthRoute>
        )
      }
    ]
  },
  {
    path: 'dashboard',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: (
          <AuthRoute>
            <Dashboard />
          </AuthRoute>
        )
      }
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="users" replace />
      },
      {
        path: 'users',
        element: (
          <AuthRoute>
            <ApplicationsUsers />
          </AuthRoute>
        )
      },
      {
        path: 'dreams',
        element: (
          <AuthRoute>
            <ApplicationsDreams />
          </AuthRoute>
        )
      },
      {
        path: 'categories',
        element: (
          <AuthRoute>
            <ApplicationsCategories />
          </AuthRoute>
        )
      },
      {
        path: 'voice-request',
        element: (
          <AuthRoute>
            <ApplicationsVoiceRequests />
          </AuthRoute>
        )
      },
      {
        path: 'profile/details',
        element: (
          <AuthRoute>
            <ManagementUserProfile />
          </AuthRoute>
        )
      },
    ]
  }
];

export default routes;
