import { Box, Container, HStack, Image, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react';
import ErrorCard from 'components/error-card';
import Spinner from 'components/ui/spinner';
import React from 'react';
import { useParams } from 'react-router';
import useGetAlbum from 'services/api/album/use-get-album';
import TrackCard from '../../../components/track-card';

const ViewAlbumPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: albumResponse,
    isFetching,
    error,
  } = useGetAlbum(
    {
      mbid: id,
    },
    !!id,
  );

  if (error) {
    return <ErrorCard error={error} />;
  }

  const album = albumResponse?.album;
  const imageUrl = album?.image?.find((img) => img.size === 'large')?.['#text'] || '';

  return (
    <Container maxW="container.xl" py={8}>
      {album ? (
        <VStack gap={6} align="stretch">
          <Stack direction={{ base: 'column', md: 'row' }} gap={6} align={{ base: 'center', md: 'start' }}>
            <Image src={imageUrl} alt={album.name} boxSize={{ base: '200px', md: '300px' }} objectFit="cover" borderRadius="md" />
            <VStack align="start" gap={4} flex={1}>
              <Text fontSize="3xl" fontWeight="bold">
                {album.name}
              </Text>
              <Text fontSize="xl" color="gray.600">
                by {album.artist}
              </Text>
              <HStack gap={4}>
                <Text>Playcount: {album.playcount?.toLocaleString()}</Text>
                <Text>Listeners: {album.listeners?.toLocaleString()}</Text>
              </HStack>
              {album.wiki?.summary && (
                <Box>
                  <Text fontSize="lg" fontWeight="semibold" mb={2}>
                    About
                  </Text>
                  {album.wiki.published && (
                    <Text fontSize="sm" color="gray.500" mb={2}>
                      Published: {album.wiki.published}
                    </Text>
                  )}
                  <Text dangerouslySetInnerHTML={{ __html: album.wiki.summary }} />
                </Box>
              )}
            </VStack>
          </Stack>
          {album.tracks?.track && (
            <Box>
              <Text fontSize="2xl" fontWeight="bold" mb={4}>
                Tracks
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                {album.tracks.track.map((track, index) => (
                  <TrackCard key={index} track={track} index={index} />
                ))}
              </SimpleGrid>
            </Box>
          )}
        </VStack>
      ) : null}
      <Spinner open={isFetching} />
    </Container>
  );
};

export default ViewAlbumPage;
