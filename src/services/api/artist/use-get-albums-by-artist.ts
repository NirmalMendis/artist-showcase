import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../../constants/query-keys';
import { apiService } from '../api-service';
import type { TopAlbum } from '@/types/album-types';
import type { Artist } from '@/types/artist-type';

export type GetAlbumByArtistRequest = Pick<Artist, 'name' | 'mbid'>;

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

const useGetAlbumsByArtist = ({ name, mbid }: GetAlbumByArtistRequest, enabled?: boolean): UseQueryResult<GetAlbumByArtistResponse, Error> => {
  return useQuery({
    queryKey: [QueryKeys.artist.getAlbums, { name, mbid }],
    queryFn: ({ signal }) =>
      apiService.get<GetAlbumByArtistResponse>({
        queryParams: {
          method: 'artist.gettopalbums',
          artist: name,
          mbid: mbid,
        },
        signal,
      }),
    enabled: enabled ?? true,
  });
};

export default useGetAlbumsByArtist;
