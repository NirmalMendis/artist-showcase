import RoutePaths from 'constants/route-paths';
import { Box, Card, Image as ChakraImage, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { memo } from 'react';
import { LuAlbum } from 'react-icons/lu';
import { Link } from 'react-router';
import { TopAlbum } from '../types/album-types';
import { Image } from '../types/generic-types';

interface AlbumCardProps {
  album: TopAlbum;
}

const AlbumCard = ({ album }: AlbumCardProps) => {
  const imageUrl = album.image?.find((img: Image) => img.size === 'medium')?.['#text'] || '';
  const albumId = album.mbid || encodeURIComponent(album.name);

  return (
    <Link to={`/${RoutePaths.album.index}/${RoutePaths.album.view.replace(':id', albumId)}`}>
      <Card.Root size="sm" height="100%">
        <Card.Body>
          <HStack gap={4}>
            {imageUrl ? (
              <ChakraImage src={imageUrl} alt={album.name} boxSize="60px" objectFit="cover" borderRadius="md" loading="lazy" />
            ) : (
              <Box boxSize="60px" borderRadius="md" bg="gray.100" display="flex" alignItems="center" justifyContent="center">
                <Icon as={LuAlbum} boxSize="24px" color="gray.500" />
              </Box>
            )}
            <VStack align="start" gap={1} flex={1}>
              <Text fontWeight="semibold">{album.name}</Text>
              <Text fontSize="sm" color="gray.600">
                Playcount: {album.playcount?.toLocaleString() || 'N/A'}
              </Text>
            </VStack>
          </HStack>
        </Card.Body>
      </Card.Root>
    </Link>
  );
};

export default memo(AlbumCard);
