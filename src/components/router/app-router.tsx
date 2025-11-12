import RoutePaths from 'constants/route-paths';
import ErrorBoundary from 'components/error-boundary';
import NotFound from 'components/not-found';
import albumRoutes from 'modules/album/album-routes';
import favouritesRoutes from 'modules/favourite/favourites-routes';
import searchRoutes from 'modules/search/search-routes';
import { RouteObject, createBrowserRouter } from 'react-router';
import AppLayout from '../layout/app-layout';

const appRoutes: RouteObject[] = [
  {
    path: RoutePaths.index,
    Component: AppLayout,
    children: [...albumRoutes, ...searchRoutes, ...favouritesRoutes],
    ErrorBoundary: ErrorBoundary,
  },
];

const fallBackRoute: RouteObject = {
  path: '*',
  element: <NotFound />,
};

const routes = [...appRoutes, fallBackRoute];
const appRouter = createBrowserRouter(routes);

export default appRouter;
