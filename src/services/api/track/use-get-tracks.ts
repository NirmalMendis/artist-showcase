import { keepPreviousData, useQueries } from '@tanstack/react-query';
import { DetailedTrack } from 'types/track-types';
import { QueryKeys } from '../../../constants/query-keys';
import { apiService } from '../api-service';

export type GetTrackRequest = {
  artist?: string;
  track?: string;
  mbid?: string;
};

export type GetTrackResponse = {
  track: DetailedTrack;
};

const useGetTracks = (tracks: Array<{ artist: string; name: string }>) => {
  return useQueries({
    queries: tracks.map((track) => ({
      queryKey: [QueryKeys.track.getInfo, { artist: track.artist, track: track.name }],
      queryFn: ({ signal }) =>
        apiService.get<GetTrackResponse>({
          queryParams: {
            method: 'track.getinfo',
            artist: track.artist,
            track: track.name,
          },
          signal,
        }),
      enabled: true,
      placeholderData: keepPreviousData,
    })),
  });
};

export default useGetTracks;
