import { DefaultPageLimit } from 'constants/defaults';
import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import CustomPagination from 'components/ui/pagination';
import Spinner from 'components/ui/spinner';
import { useState } from 'react';
import useGetAlbumsByArtist from 'services/api/artist/use-get-albums-by-artist';
import AlbumCard from '../../../components/album-card';
import ErrorCard from '../../../components/error-card';

const ListAlbumsPage = () => {
  const [page, setPage] = useState(1);
  const {
    data: albums,
    isFetching,
    error,
  } = useGetAlbumsByArtist({
    name: 'Cher',
    page,
    limit: DefaultPageLimit,
  });

  if (error) {
    return <ErrorCard error={error} />;
  }

  const albumList = albums?.topalbums.album || [];
  const pagination = albums?.topalbums['@attr'];
  const totalPages = pagination ? parseInt(pagination.totalPages) : 1;

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={4} align="stretch">
        <Text fontSize="2xl" fontWeight="bold">
          Albums by Cher
        </Text>
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
