import { Box, Center, Spinner as ChakraSpinner } from '@chakra-ui/react';

export type SpinnerProps = {
  open?: boolean;
};
const Spinner = ({ open }: SpinnerProps) => {
  return open ? (
    <Box pos="fixed" inset="0" bg="bg/80" zIndex="9999">
      <Center h="full">
        <ChakraSpinner size="xl" />
      </Center>
    </Box>
  ) : null;
};

export default Spinner;
