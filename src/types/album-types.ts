import { Image, Tags } from './generic-types';

export interface Streamable {
  fulltrack?: string;
  '#text'?: string;
}

export interface TrackArtist {
  name: string;
  url?: string;
  mbid?: string;
}

export interface TrackAttr {
  rank?: number;
}

export interface Track {
  streamable?: Streamable;
  duration?: number;
  url?: string;
  name: string;
  ['@attr']?: TrackAttr;
  artist?: TrackArtist;
}

export interface Tracks {
  track?: Track[];
}

export interface Wiki {
  published?: string;
  summary?: string;
  content?: string;
}

export interface Album {
  artist: string;
  mbid?: string;
  tags?: Tags;
  playcount?: string;
  image?: Image[];
  tracks?: Tracks;
  url?: string;
  name: string;
  listeners?: string;
  wiki?: Wiki;
}

export interface AlbumResponse {
  album: Album;
}

export interface TopAlbumArtist {
  name: string;
  mbid?: string;
  url?: string;
}

export interface TopAlbumAttr {
  rank?: string | number;
}

export interface TopAlbum {
  name: string;
  playcount?: number | string;
  mbid?: string;
  url?: string;
  artist?: TopAlbumArtist;
  image?: Image[];
  ['@attr']?: TopAlbumAttr;
}
