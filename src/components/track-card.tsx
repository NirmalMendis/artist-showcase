import { Box, Image as ChakraImage, HStack, Icon, IconButton, Text, VStack } from '@chakra-ui/react';
import { LuHeart } from 'react-icons/lu';
import { LuMusic } from 'react-icons/lu';
import { Image } from 'types/generic-types';
import { useFavouritesStore } from '../store/use-favourites-store';
import { Track } from '../types/album-types';
import { Tooltip } from './ui/tooltip';

interface TrackCardProps {
  track: Track;
  index: number;
  onClick?: () => void;
}

const TrackCard: React.FC<TrackCardProps> = ({ track, index, onClick }) => {
  const imageUrl = track.image?.find((img: Image) => img.size === 'medium')?.['#text'] || '';
  const { isFavourite, toggleFavourite } = useFavouritesStore();
  const trackObj = { name: track.name, artist: track.artist?.name || 'unknown' };

  return (
    <HStack gap={4} p={4} borderWidth="1px" borderRadius="md" cursor={onClick ? 'pointer' : 'default'} onClick={onClick}>
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
        {track.album && (
          <Text fontSize="sm" color="gray.500">
            Album: {track.album}
          </Text>
        )}
        <Text fontSize="sm" color="gray.600">
          {track.duration ? `${Math.floor(track.duration / 60)}:${(track.duration % 60).toString().padStart(2, '0')}` : ''}
        </Text>
      </VStack>
      <Tooltip content={isFavourite(trackObj) ? 'Remove from favourites' : 'Add to favourites'} showArrow>
        <IconButton
          aria-label="Toggle favourite"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavourite(trackObj);
          }}
          colorPalette={isFavourite(trackObj) ? 'red' : 'gray'}
          variant="ghost"
          size="sm"
        >
          <LuHeart color={isFavourite(trackObj) ? 'red' : 'gray'} fill={isFavourite(trackObj) ? 'red' : 'transparent'} />
        </IconButton>
      </Tooltip>
    </HStack>
  );
};

export default TrackCard;
