import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { ArtistSearchResult } from 'types/artist-type';
import { QueryKeys } from '../../../constants/query-keys';
import { apiService } from '../api-service';

export type SearchArtistRequest = {
  artist: string;
  page?: number;
  limit?: number;
};

export type SearchArtistResponse = {
  results: {
    'opensearch:totalResults': string;
    'opensearch:startIndex': string;
    'opensearch:itemsPerPage': string;
    artistmatches: {
      artist: ArtistSearchResult[];
    };
  };
};

const useSearchArtist = ({ artist, page, limit }: SearchArtistRequest, enabled?: boolean): UseQueryResult<SearchArtistResponse, Error> => {
  return useQuery({
    queryKey: [QueryKeys.artist.search, { artist, page, limit }],
    queryFn: ({ signal }) =>
      apiService.get<SearchArtistResponse>({
        queryParams: {
          method: 'artist.search',
          artist,
          page,
          limit,
        },
        signal,
      }),
    enabled: enabled ?? !!artist,
  });
};

export default useSearchArtist;
