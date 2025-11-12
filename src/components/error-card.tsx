import { Container, Text } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import React from 'react';

interface ErrorOrNotFoundProps {
  error?: Error | null;
}

const ErrorCard: React.FC<ErrorOrNotFoundProps> = ({ error }) => {
  if (error) {
    let errorMsg = 'Something went wrong.';
    if (error instanceof AxiosError) {
      errorMsg = error.response?.data?.message || error.message;
    }
    return (
      <Container centerContent py={8}>
        <Text color="red.500"> {errorMsg}</Text>
      </Container>
    );
  }

  return null;
};

export default ErrorCard;
