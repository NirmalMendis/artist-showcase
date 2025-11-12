import { type UseQueryResult, keepPreviousData, useQuery } from '@tanstack/react-query';
import { TopAlbum } from 'types/album-types';
import { Artist } from 'types/artist-type';
import { QueryKeys } from '../../../constants/query-keys';
import { apiService } from '../api-service';

export type GetAlbumByArtistRequest = Pick<Artist, 'name' | 'mbid'> & {
  page?: number;
  limit?: number;
};

export type GetAlbumByArtistResponse = {
  topalbums: {
    album?: TopAlbum[];
    ['@attr']?: {
      artist: string;
      page: string;
      perPage: string;
      total: string;
      totalPages: string;
    };
  };
};

const useGetAlbumsByArtist = (
  { name, mbid, page, limit }: GetAlbumByArtistRequest,
  enabled?: boolean,
): UseQueryResult<GetAlbumByArtistResponse, Error> => {
  return useQuery({
    queryKey: [QueryKeys.artist.getAlbums, { name, mbid, page, limit }],
    queryFn: ({ signal }) =>
      apiService.get<GetAlbumByArtistResponse>({
        queryParams: {
          method: 'artist.gettopalbums',
          artist: name,
          mbid,
          page,
          limit,
        },
        signal,
      }),
    enabled: enabled ?? true,
    placeholderData: keepPreviousData,
  });
};

export default useGetAlbumsByArtist;
