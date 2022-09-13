import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import AuthRoute from 'src/contexts/AuthRoute';
import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';
import SignIn from 'src/content/pages/SignIn';
import ApplicationsDreams from 'src/content/applications/Dreams/list';
import ApplicationsCategories from './content/applications/Categories/list';
import ApplicationsUsers from './content/applications/Users/list';

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
        element: <Navigate to="management/users" replace />
      },
      {
        path: '/signin',
        element: <SignIn />
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
        path: 'categories',
        element: (
          <AuthRoute>
            <ApplicationsCategories />
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
      }
    ]
  }
];

export default routes;
