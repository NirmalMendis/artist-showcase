import RoutePaths from 'constants/route-paths';
import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router';

const ListFavouritesPage = lazy(() => import('./pages/list-favourites-page'));

const favouritesRoutes: RouteObject[] = [
  {
    path: `/${RoutePaths.favourite.index}`,
    children: [
      {
        index: true,
        element: <Navigate to={RoutePaths.favourite.list} replace />,
      },
      {
        path: RoutePaths.favourite.list,
        element: <ListFavouritesPage />,
      },
    ],
  },
];

export default favouritesRoutes;
