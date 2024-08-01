import { redirect } from "next/navigation";

import { fakeJsonData } from "@/fakeData";
import { ParsedTrip, RawTrip } from "@/types";

import SearchResults from "@/components/SearchResults";

import "./searchPage.css";

type Props = {
  searchParams?: {
    fc: string; // Format: "latitude,longitude" url encoded
    tc: string; // Format: "latitude,longitude" url encoded.
    db: string; // Format: "YYYY-MM-DD"
  };
};

const Search = async ({ searchParams }: Props) => {
  if (!searchParams || Object.keys(searchParams).length === 0) {
    redirect("/");
  }

  const rawFromCoordinate = searchParams.fc;
  const rawToCoordinate = searchParams.tc;
  const rawDate = searchParams.db;

  let trips: RawTrip[] = [];
  let dataOk = false;
  try {
    const response = await fetch(
      `https://public-api.blablacar.com/api/v3/trips?key=${process.env.BLABLACAR_API_KEY}&from_coordinate=${rawFromCoordinate}&to_coordinate=${rawToCoordinate}&locale=fr-FR&currency=EUR&start_date_local=${rawDate}T00:00:00&count=3`,
    );

    const data = await response.json();
    dataOk = data;
    trips = data.trips;
  } catch (error) {
    console.error("Error while fetching trips", error);
  }

  // Fallback to fake data for the demo
  trips = trips || fakeJsonData.trips;

  const parsedFromCoordinate = {
    lat: parseFloat(rawFromCoordinate.split(",")[0]),
    lng: parseFloat(rawFromCoordinate.split(",")[1]),
  };
  const parsedToCoordinate = {
    lat: parseFloat(rawToCoordinate.split(",")[0]),
    lng: parseFloat(rawToCoordinate.split(",")[1]),
  };

  const formattedDate = new Date(rawDate);
  const displayedDate = formattedDate.toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  // Find the minimum price among the trips
  const minPrice = Math.min(
    ...trips.map((trip) => parseFloat(trip.price.amount)),
  );

  let fromName = "";
  let toName = "";

  const updatedTrips: ParsedTrip[] = trips.map((trip, i) => {
    if (i === 0) {
      fromName = trip.waypoints[0].place.city;
      toName = trip.waypoints[trip.waypoints.length - 1].place.city;
    }

    return {
      ...trip,
      isCheapest: parseFloat(trip.price.amount) === minPrice,
    };
  });

  return (
    <div className="searchPage">
      {fromName && toName && (
        <h1>
          From {fromName} to {toName} on {displayedDate}
        </h1>
      )}

      <SearchResults
        trips={updatedTrips}
        fromCoordinate={parsedFromCoordinate}
        toCoordinate={parsedToCoordinate}
      />
    </div>
  );
};

export default Search;
