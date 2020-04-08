export type id = number;

export interface User {
  id: id;
  name: string;
  avatar?: string;
  isPro?: boolean;
  email?: string;
  password?: string;
  avatar_url?: string;
}

export interface Comment {
  id: id;
  user: User;
  rating: number;
  comment: string;
  date: Date;
}

export interface City {
  name: string;
  coords: number[];
  zoom?: number;
}

export interface Offer {
  id: id;
  name: string;
  picture: string;
  price: number;
  priceText: string;
  rating: number;
  features: {
    type: string;
    bedrooms: number;
    maxGuests: number;
  };
  isPremium: boolean;
  isInBookmark: boolean;
  houseHolds: string[];
  images: string[];
  host: User;
  description: string;
  coords: number[];
  zoom?: number;
  city?: City;
};

interface Favor {
  id: id;
  name: string;
  picture: string;
  price: number;
  priceText: string;
  rating: number;
  features: {
    type: string;
    bedrooms: number;
    maxGuests: number;
  };
  isPremium: boolean;
  isInBookmark: boolean;
  houseHolds: string[];
  images: string[];
  host: User;
  description: string;
  coords: number[];
  zoom: number;
}

export interface Favorite {
    [city: string]: Favor[];
};
