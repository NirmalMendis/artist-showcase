export interface Image {
  '#text'?: string;
  size?: 'small' | 'medium' | 'large' | 'extralarge' | 'mega' | '';
}

export interface Tag {
  name: string;
  url?: string;
}

export interface Tags {
  tag?: Tag[];
}
