import { type UseQueryResult, keepPreviousData, useQuery } from '@tanstack/react-query';
import { AlbumSearchResult } from 'types/album-types';
import { QueryKeys } from '../../../constants/query-keys';
import { apiService } from '../api-service';

export type SearchAlbumRequest = {
  album: string;
  page?: number;
  limit?: number;
};

export type SearchAlbumResponse = {
  results: {
    'opensearch:totalResults': string;
    'opensearch:startIndex': string;
    'opensearch:itemsPerPage': string;
    albummatches: {
      album: AlbumSearchResult[];
    };
  };
};

const useSearchAlbum = ({ album, page, limit }: SearchAlbumRequest, enabled?: boolean): UseQueryResult<SearchAlbumResponse, Error> => {
  return useQuery({
    queryKey: [QueryKeys.album.search, { album, page, limit }],
    queryFn: ({ signal }) =>
      apiService.get<SearchAlbumResponse>({
        queryParams: {
          method: 'album.search',
          album,
          page,
          limit,
        },
        signal,
      }),
    enabled: enabled ?? !!album,
    placeholderData: keepPreviousData,
  });
};

export default useSearchAlbum;
