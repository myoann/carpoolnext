import { cache } from "react";
import "server-only";

import { RawTrip } from "@/types";

/** Fetch trips from BlaBlaCar API */
export const fetchTrips = cache(
  async (
    fromCoordinate: string,
    toCoordinate: string,
    date: string,
  ): Promise<RawTrip[]> => {
    try {
      const response = await fetch(
        `https://public-api.blablacar.com/api/v3/trips?key=${process.env.BLABLACAR_API_KEY}&from_coordinate=${fromCoordinate}&to_coordinate=${toCoordinate}&locale=fr-FR&currency=EUR&start_date_local=${date}T00:00:00&count=7`,
      );

      if (!response.ok) {
        throw new Error(`Error fetching trips: ${response.statusText}`);
      }

      const data = await response.json();
      return data.trips;
    } catch (error) {
      console.error("Error while fetching trips", error);
      return [];
    }
  },
);
