import RoutePaths from 'constants/route-paths';
import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ErrorCard from '../../../components/error-card';
import TrackCard from '../../../components/track-card';
import Spinner from '../../../components/ui/spinner';
import { toaster } from '../../../components/ui/toaster';
import useGetAlbum from '../../../services/api/album/use-get-album';
import useGetTracks from '../../../services/api/track/use-get-tracks';
import { useFavouritesStore } from '../../../store/use-favourites-store';
import { Track } from '../../../types/album-types';

const ListFavouritesPage = () => {
  const { favourites } = useFavouritesStore();
  const favArray = Array.from(favourites);
  const navigate = useNavigate();
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const { data, isSuccess } = useGetAlbum({ artist: selectedTrack?.artist?.name, album: selectedTrack?.album }, !!selectedTrack);

  useEffect(() => {
    if (isSuccess) {
      if (data?.album.mbid) {
        navigate(`/${RoutePaths.album.index}/${RoutePaths.album.view.replace(':id', data.album.mbid)}`);
      } else {
        toaster.create({
          title: 'Error',
          description: 'Album not found',
          type: 'error',
        });
      }
    }
    return () => {
      setSelectedTrack(null);
    };
  }, [isSuccess, data, navigate]);

  const queries = useGetTracks(favArray);

  const isFetching = queries.some((q) => q.isFetching);
  const errors = queries.filter((q) => q.error).map((q) => q.error);
  const tracks: Track[] = queries
    .filter((q) => q.data)
    .map((q) => {
      const detailed = q.data!.track;
      return {
        name: detailed.name,
        artist: { name: detailed.artist.name, mbid: detailed.artist.mbid, url: detailed.artist.url },
        duration: Math.floor(parseInt(detailed.duration) / 1000) || 0,
        url: detailed.url,
        image: detailed.album?.image,
        album: detailed.album?.title,
      };
    });

  if (errors.length > 0) {
    return <ErrorCard error={errors[0]} />;
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={4} align="stretch">
        <Text fontSize="2xl" fontWeight="bold">
          Favourite Tracks
        </Text>
        {favArray.length === 0 && <Text>No favourite tracks yet.</Text>}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
          {tracks.map((track, index) => (
            <TrackCard track={track} key={`${track.artist?.name}-${track.name}`} index={index} onClick={() => setSelectedTrack(track)} />
          ))}
        </SimpleGrid>
      </VStack>
      <Spinner open={isFetching} />
    </Container>
  );
};

export default ListFavouritesPage;
