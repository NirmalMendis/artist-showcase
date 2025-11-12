import albumRoutes from 'modules/album/album-routes';
import searchRoutes from 'modules/search/search-routes';
import { RouteObject, createBrowserRouter } from 'react-router';
import AppLayout from '../layout/app-layout';

const appRoutes: RouteObject[] = [
  {
    path: '/',
    Component: AppLayout,
    children: [...albumRoutes, ...searchRoutes],
  },
];

const fallBackRoute: RouteObject = {
  path: '*',
  element: <div>404 Not Found</div>,
};

const routes = [...appRoutes, fallBackRoute];
const appRouter = createBrowserRouter(routes);

export default appRouter;
