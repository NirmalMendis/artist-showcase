import { RouterProvider } from 'react-router';
import appRouter from './components/router/app-router';

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
