import RoutePaths from 'constants/route-paths';
import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router';

const SearchPage = lazy(() => import('./pages/search-page'));

const searchRoutes: RouteObject[] = [
  {
    path: `/`,
    children: [
      {
        index: true,
        element: <Navigate to={RoutePaths.search.index} replace />,
      },
      {
        path: RoutePaths.search.index,
        element: <SearchPage />,
      },
    ],
  },
];

export default searchRoutes;
