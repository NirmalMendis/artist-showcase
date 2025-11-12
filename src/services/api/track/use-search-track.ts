import { type UseQueryResult, keepPreviousData, useQuery } from '@tanstack/react-query';
import { TrackSearchResult } from 'types/track-types';
import { QueryKeys } from '../../../constants/query-keys';
import { apiService } from '../api-service';

export type SearchTrackRequest = {
  track: string;
  artist?: string;
  page?: number;
  limit?: number;
};

export type SearchTrackResponse = {
  results: {
    'opensearch:totalResults': string;
    'opensearch:startIndex': string;
    'opensearch:itemsPerPage': string;
    trackmatches: {
      track: TrackSearchResult[];
    };
  };
};

const useSearchTrack = ({ track, artist, page, limit }: SearchTrackRequest, enabled?: boolean): UseQueryResult<SearchTrackResponse, Error> => {
  return useQuery({
    queryKey: [QueryKeys.track.search, { track, artist, page, limit }],
    queryFn: ({ signal }) =>
      apiService.get<SearchTrackResponse>({
        queryParams: {
          method: 'track.search',
          track,
          artist,
          page,
          limit,
        },
        signal,
      }),
    enabled: enabled ?? !!track,
    placeholderData: keepPreviousData,
  });
};

export default useSearchTrack;
