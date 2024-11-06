import { redirect } from "next/navigation";

import { ParsedTrip } from "@/types";
import { formatDate, parseCoordinate } from "@/utils";
import { fetchTrips } from "@/utils/fetch-trips";

import SearchResults from "@/components/SearchResults";

import "./searchPage.css";

type Props = {
  searchParams?: Promise<{
    fc: string; // Format: "latitude,longitude" url encoded
    tc: string; // Format: "latitude,longitude" url encoded
    db: string; // Format: "YYYY-MM-DD" url encoded
  }>;
};

const Search = async (props: Props) => {
  const searchParams = await props.searchParams;
  if (!searchParams || Object.keys(searchParams).length === 0) {
    redirect("/");
  }

  const {
    fc: rawFromCoordinate,
    tc: rawToCoordinate,
    db: rawDate,
  } = searchParams;

  const trips = await fetchTrips(rawFromCoordinate, rawToCoordinate, rawDate);

  const parsedFromCoordinate = parseCoordinate(rawFromCoordinate);
  const parsedToCoordinate = parseCoordinate(rawToCoordinate);
  const displayedDate = formatDate(rawDate);

  const minPrice = Math.min(
    ...trips.map((trip) => parseFloat(trip.price.amount))
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
