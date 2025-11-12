import { Suspense } from 'react';
import { Outlet } from 'react-router';

const AppLayout = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default AppLayout;
