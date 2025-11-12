import { Box } from '@chakra-ui/react';
import { Suspense } from 'react';
import { Outlet } from 'react-router';
import Navigation from './navigation';

const AppLayout = () => {
  return (
    <Box as="main" display="flex" flexDirection={'column'}>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </Box>
  );
};

export default AppLayout;
