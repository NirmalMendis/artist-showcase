import { DefaultPageLimit } from 'constants/defaults';
import { Container, Input, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import CustomPagination from 'components/ui/custom-pagination';
import Spinner from 'components/ui/spinner';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useGetAlbumsByArtist from 'services/api/artist/use-get-albums-by-artist';
import AlbumCard from '../../../components/album-card';
import ErrorCard from '../../../components/error-card';

const ListAlbumsPage = () => {
  const [searchParams] = useSearchParams();
  const artistId = searchParams.get('artistId');
  const [searchText, setSearchText] = useState('');
  const [debouncedArtist, setDebouncedArtist] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedArtist(searchText);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchText]);

  const {
    data: albums,
    isFetching,
    error,
  } = useGetAlbumsByArtist(
    artistId
      ? {
          mbid: artistId,
          page,
          limit: DefaultPageLimit,
        }
      : {
          name: debouncedArtist,
          page,
          limit: DefaultPageLimit,
        },
    artistId ? !!artistId : !!debouncedArtist,
  );

  if (error) {
    return <ErrorCard error={error} />;
  }

  const data = albums && 'topalbums' in albums ? albums.topalbums : undefined;
  const albumList = data?.album || [];
  const pagination = data?.['@attr'];
  const totalPages = pagination ? parseInt(pagination.totalPages) : 1;

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={4} align="stretch">
        <Text fontSize="2xl" fontWeight="bold">
          Albums by {pagination?.artist || debouncedArtist}
        </Text>
        {!artistId && <Input placeholder="Search for artist..." value={searchText} onChange={(e) => setSearchText(e.target.value)} size="lg" />}
        {albums && 'error' in albums && <ErrorCard error={new Error(albums.message)} />}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={4}>
          {albumList.map((album, index) => (
            <AlbumCard album={album} key={album.mbid || index} />
          ))}
        </SimpleGrid>
        {totalPages > 1 && <CustomPagination count={totalPages} pageSize={1} page={page} onPageChange={(details) => setPage(details.page)} />}
      </VStack>
      <Spinner open={isFetching} />
    </Container>
  );
};

export default ListAlbumsPage;
