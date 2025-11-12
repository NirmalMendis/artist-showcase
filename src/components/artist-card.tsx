import RoutePaths from 'constants/route-paths';
import { Box, Card, Image as ChakraImage, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { memo } from 'react';
import { LuUser } from 'react-icons/lu';
import { Link } from 'react-router';
import { ArtistSearchResult } from '../types/artist-type';
import { Image } from '../types/generic-types';

interface ArtistCardProps {
  artist: ArtistSearchResult;
}

const ArtistCard = ({ artist }: ArtistCardProps) => {
  const imageUrl = artist.image?.find((img: Image) => img.size === 'medium')?.['#text'] || '';
  const artistId = artist.mbid || encodeURIComponent(artist.name);

  return (
    <Link to={`/${RoutePaths.album.index}/${RoutePaths.album.list}?artistId=${artistId}`}>
      <Card.Root size="sm" height="100%">
        <Card.Body>
          <HStack gap={4}>
            {imageUrl ? (
              <ChakraImage src={imageUrl} alt={artist.name} boxSize="60px" objectFit="cover" borderRadius="md" loading="lazy" />
            ) : (
              <Box boxSize="60px" borderRadius="md" bg="gray.100" display="flex" alignItems="center" justifyContent="center">
                <Icon as={LuUser} boxSize="24px" color="gray.500" />
              </Box>
            )}
            <VStack align="start" gap={1} flex={1}>
              <Text fontWeight="semibold">{artist.name}</Text>
              <Text fontSize="sm" color="gray.600">
                Listeners: {artist.listeners.toLocaleString() || 'N/A'}
              </Text>
            </VStack>
          </HStack>
        </Card.Body>
      </Card.Root>
    </Link>
  );
};

export default memo(ArtistCard);
