import RoutePaths from 'constants/route-paths';
import { Card, Image as ChakraImage, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router';
import { TopAlbum } from '../types/album-types';
import { Image } from '../types/generic-types';

interface AlbumCardProps {
  album: TopAlbum;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  const imageUrl = album.image?.find((img: Image) => img.size === 'medium')?.['#text'] || '';
  const albumId = album.mbid || encodeURIComponent(album.name);

  return (
    <Link to={`/${RoutePaths.album.index}/${RoutePaths.album.view.replace(':id', albumId)}`}>
      <Card.Root size="sm">
        <Card.Body>
          <HStack gap={4}>
            <ChakraImage src={imageUrl} alt={album.name} boxSize="60px" objectFit="cover" borderRadius="md" />
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

export default AlbumCard;
