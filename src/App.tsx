import { Toaster } from 'components/ui/toaster';
import { RouterProvider } from 'react-router';
import appRouter from './components/router/app-router';

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster />
    </>
  );
}

export default App;
