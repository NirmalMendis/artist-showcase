import { Image } from './generic-types';

export interface TrackSearchResult {
  name: string;
  artist: string;
  url: string;
  streamable: string;
  listeners: string;
  image?: Image[];
  mbid: string;
}
