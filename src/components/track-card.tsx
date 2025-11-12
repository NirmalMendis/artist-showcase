import { HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Track } from '../types/album-types';

interface TrackCardProps {
  track: Track;
  index: number;
}

const TrackCard: React.FC<TrackCardProps> = ({ track, index }) => {
  return (
    <HStack gap={4} p={4} borderWidth="1px" borderRadius="md">
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
