export enum Direction {
  Asc = "asc",
  Desc = "desc",
}

export type LatLng = {
  lat: number;
  lng: number;
};

export type RawTrip = {
  distance_in_meters: number;
  duration_in_seconds: number;
  link: string;
  waypoints: {
    place: {
      city: string;
      address: string;
      latitude: number;
      longitude: number;
      country_code: string;
    };
    date_time: string;
  }[];
  price: {
    amount: string;
    currency: string;
  };
  vehicle?: {
    make?: string;
    model?: string;
  };
};

export type ParsedTrip = {
  isCheapest: boolean;
} & RawTrip;

export enum SortType {
  Departure = "departure",
  Price = "price",
  Fastest = "fastest",
}
