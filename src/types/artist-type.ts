import { Image } from './generic-types';

export interface Stats {
  listeners?: string;
  playcount?: string;
}

export interface Link {
  '#text'?: string;
  rel?: string;
  href?: string;
}

export interface Links {
  link?: Link | Link[];
}

export interface Bio {
  links?: Links;
  published?: string;
  summary?: string;
  content?: string;
}

export interface Artist {
  name: string;
  mbid?: string;
  url?: string;
  image?: Image[];
  streamable?: string;
  ontour?: string;
  stats?: Stats;
  bio?: Bio;
}
