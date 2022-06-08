import type { Timestamp } from '@firebase/firestore-types';

export type FirebaseId = {
  NO_ID_FIELD: string;
};

// collection `flats`
export type Flat = FirebaseId & {
  address: string;
  latitude: number;
  longitude: number;
  cityName: string;
  description?: string;
  dailyPriceUsd: number;
  photoUrl: string;
  publishedAt: Timestamp;
};
