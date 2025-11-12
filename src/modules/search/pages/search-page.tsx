import { Box, Heading, Input, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import Spinner from 'components/ui/spinner';
import { useEffect, useState } from 'react';
import AlbumCard from '../../../components/album-card';
import ArtistCard from '../../../components/artist-card';
import TrackCard from '../../../components/track-card';
import CustomPagination from '../../../components/ui/custom-pagination';
import { DefaultPageLimit } from '../../../constants/defaults';
import useSearchAlbum from '../../../services/api/album/use-search-album';
import useSearchArtist from '../../../services/api/artist/use-search-artist';
import useSearchTrack from '../../../services/api/track/use-search-track';
import { AlbumSearchResult } from '../../../types/album-types';
import { TrackSearchResult } from '../../../types/track-types';

const SearchPage = () => {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const [albumPage, setAlbumPage] = useState(1);
  const [trackPage, setTrackPage] = useState(1);
  const [artistPage, setArtistPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchText]);

  const { data: albumResults, isLoading: albumLoading } = useSearchAlbum(
    { album: debouncedSearchText, page: albumPage, limit: DefaultPageLimit },
    !!debouncedSearchText,
  );
  const { data: trackResults, isLoading: trackLoading } = useSearchTrack(
    { track: debouncedSearchText, page: trackPage, limit: DefaultPageLimit },
    !!debouncedSearchText,
  );
  const { data: artistResults, isLoading: artistLoading } = useSearchArtist(
    { artist: debouncedSearchText, page: artistPage, limit: DefaultPageLimit },
    !!debouncedSearchText,
  );

  const albums = albumResults?.results?.albummatches?.album || [];
  const tracks = trackResults?.results?.trackmatches?.track || [];
  const artists = artistResults?.results?.artistmatches?.artist || [];

  const albumTotal = parseInt(albumResults?.results?.['opensearch:totalResults'] || '0');
  const trackTotal = parseInt(trackResults?.results?.['opensearch:totalResults'] || '0');
  const artistTotal = parseInt(artistResults?.results?.['opensearch:totalResults'] || '0');
  const albumTotalPages = Math.ceil(albumTotal / DefaultPageLimit);
  const trackTotalPages = Math.ceil(trackTotal / DefaultPageLimit);
  const artistTotalPages = Math.ceil(artistTotal / DefaultPageLimit);

  const mappedAlbums = albums.map((album: AlbumSearchResult) => ({
    name: album.name,
    mbid: album.mbid,
    url: album.url,
    artist: { name: album.artist },
    image: album.image,
  }));

  const mappedTracks = tracks.map((track: TrackSearchResult) => ({
    name: track.name,
    url: track.url,
    streamable: { '#text': track.streamable },
    artist: { name: track.artist },
    image: track.image,
  }));

  return (
    <VStack gap={6} p={4} align="stretch">
      <Heading as="h1" size="lg">
        Search
      </Heading>
      <Input placeholder="Search for albums or tracks or artists..." value={searchText} onChange={(e) => setSearchText(e.target.value)} size="lg" />

      {debouncedSearchText && (
        <>
          <Box display="flex" flexDirection="column" gap={4}>
            <Heading as="h2" size="md">
              Albums
            </Heading>
            {mappedAlbums.length > 0 ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={4}>
                {mappedAlbums.map((album, index) => (
                  <AlbumCard key={album.mbid || index} album={album} />
                ))}
              </SimpleGrid>
            ) : (
              <Text>No albums found.</Text>
            )}
            {albumTotalPages > 1 && (
              <CustomPagination count={albumTotalPages} pageSize={1} page={albumPage} onPageChange={(details) => setAlbumPage(details.page)} />
            )}
          </Box>
          <Box display="flex" flexDirection="column" gap={4}>
            <Heading as="h2" size="md">
              Tracks
            </Heading>
            {mappedTracks.length > 0 ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={4}>
                {mappedTracks.map((track, index) => (
                  <TrackCard key={track.url || index} track={track} index={index} />
                ))}
              </SimpleGrid>
            ) : (
              <Text>No tracks found.</Text>
            )}
            {trackTotalPages > 1 && (
              <CustomPagination count={trackTotalPages} pageSize={1} page={trackPage} onPageChange={(details) => setTrackPage(details.page)} />
            )}
          </Box>
          <Box display="flex" flexDirection="column" gap={4}>
            <Heading as="h2" size="md">
              Artists
            </Heading>
            {artists.length > 0 ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={4}>
                {artists.map((artist, index) => (
                  <ArtistCard key={artist.mbid || index} artist={artist} />
                ))}
              </SimpleGrid>
            ) : (
              <Text>No artists found.</Text>
            )}
            {artistTotalPages > 1 && (
              <CustomPagination count={artistTotalPages} pageSize={1} page={artistPage} onPageChange={(details) => setArtistPage(details.page)} />
            )}
          </Box>
        </>
      )}
      <Spinner open={albumLoading || artistLoading || trackLoading} />
    </VStack>
  );
};

export default SearchPage;
