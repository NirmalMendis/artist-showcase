import RoutePaths from 'constants/route-paths';
import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router';

const ListAlbumsPage = lazy(() => import('./pages/list-albums-page'));

const albumRoutes: RouteObject[] = [
  {
    path: `/${RoutePaths.album.index}`,
    children: [
      {
        index: true,
        element: <Navigate to={RoutePaths.album.list} replace />,
      },
      {
        path: RoutePaths.album.list,
        element: <ListAlbumsPage />,
      },
    ],
  },
];

export default albumRoutes;
