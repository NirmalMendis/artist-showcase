import { type UseQueryResult, keepPreviousData, useQuery } from '@tanstack/react-query';
import { AlbumResponse } from 'types/album-types';
import { QueryKeys } from '../../../constants/query-keys';
import { apiService } from '../api-service';

export type GetAlbumRequest = {
  artist?: string;
  album?: string;
  mbid?: string;
};

export type GetAlbumResponse = AlbumResponse;

const useGetAlbum = ({ artist, album, mbid }: GetAlbumRequest, enabled?: boolean): UseQueryResult<GetAlbumResponse, Error> => {
  return useQuery({
    queryKey: [QueryKeys.album.getInfo, { artist, album, mbid }],
    queryFn: ({ signal }) =>
      apiService.get<GetAlbumResponse>({
        queryParams: {
          method: 'album.getinfo',
          artist,
          album,
          mbid,
        },
        signal,
      }),
    enabled: enabled ?? true,
    placeholderData: keepPreviousData,
  });
};

export default useGetAlbum;
