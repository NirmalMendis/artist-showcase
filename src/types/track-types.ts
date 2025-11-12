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

export interface TrackArtist {
  name: string;
  mbid: string;
  url: string;
}

export interface TrackAlbum {
  artist: string;
  title: string;
  url: string;
  image: Image[];
}

export interface TrackWiki {
  published: string;
  summary: string;
  content: string;
}

export interface DetailedTrack {
  name: string;
  mbid: string;
  url: string;
  duration: string;
  listeners: string;
  playcount: string;
  artist: TrackArtist;
  album: TrackAlbum;
  wiki: TrackWiki;
}
