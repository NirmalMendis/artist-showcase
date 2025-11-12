import { Box, HStack, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router';
import RoutePaths from '../../constants/route-paths';

const Navigation = () => {
  return (
    <Box as="nav" bg="gray.50" px={4} py={3} borderBottomWidth="1px" display="flex">
      <Heading size="sm" mr={6}>
        Artist Showcase
      </Heading>
      <HStack gap={4}>
        <RouterLink to="/">
          <Text color="blue.600">Home</Text>
        </RouterLink>
        <RouterLink to={`/${RoutePaths.album.index}/${RoutePaths.album.list}`}>
          <Text color="blue.600">Albums</Text>
        </RouterLink>
        <RouterLink to="/favorites">
          <Text color="blue.600">Favorites</Text>
        </RouterLink>
      </HStack>
    </Box>
  );
};

export default Navigation;
