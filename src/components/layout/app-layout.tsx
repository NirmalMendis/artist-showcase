import { Box } from '@chakra-ui/react';
import Spinner from 'components/ui/spinner';
import { Suspense } from 'react';
import { Outlet } from 'react-router';
import Navigation from './navigation';

const AppLayout = () => {
  return (
    <Box as="main" display="flex" flexDirection={'column'}>
      <Navigation />
      <Suspense fallback={<Spinner open />}>
        <Outlet />
      </Suspense>
    </Box>
  );
};

export default AppLayout;
