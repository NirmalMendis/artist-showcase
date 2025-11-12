import { Box, Image as ChakraImage, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { LuMusic } from 'react-icons/lu';
import { Track } from '../types/album-types';
import { Image } from '../types/generic-types';

interface TrackCardProps {
  track: Track;
  index: number;
}

const TrackCard: React.FC<TrackCardProps> = ({ track, index }) => {
  const imageUrl = track.image?.find((img: Image) => img.size === 'medium')?.['#text'] || '';

  return (
    <HStack gap={4} p={4} borderWidth="1px" borderRadius="md">
      {imageUrl ? (
        <ChakraImage src={imageUrl} alt={track.name} boxSize="60px" objectFit="cover" borderRadius="md" />
      ) : (
        <Box boxSize="60px" borderRadius="md" bg="gray.100" display="flex" alignItems="center" justifyContent="center">
          <Icon as={LuMusic} boxSize="24px" color="gray.500" />
        </Box>
      )}
      <Text fontWeight="bold" minW="30px">
        {track['@attr']?.rank || index + 1}
      </Text>
      <VStack align="start" flex={1}>
        <Text fontWeight="semibold">{track.name}</Text>
        <Text fontSize="sm" color="gray.600">
          {track.duration ? `${Math.floor(track.duration / 60)}:${(track.duration % 60).toString().padStart(2, '0')}` : ''}
        </Text>
      </VStack>
    </HStack>
  );
};

export default TrackCard;
