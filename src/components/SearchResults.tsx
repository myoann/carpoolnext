"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

import { Direction, SortType, ParsedTrip } from "@/types";

import Trip from "./Trip";
import SortButton from "./SortButton";

import "./SearchResults.css";

type Props = {
  fromCoordinate: { lat: number; lng: number };
  toCoordinate: { lat: number; lng: number };
  trips: ParsedTrip[];
};

const DynamicMap = dynamic(() => import("./Map"), { ssr: false });

export const SearchResults = ({
  fromCoordinate,
  toCoordinate,
  trips,
}: Props) => {
  const [sort, setSort] = useState<{
    type: SortType;
    direction: Direction;
  }>({ type: SortType.Departure, direction: Direction.Asc });

  const handleSortChange = (newSort: SortType) => {
    setSort((prevSort) => {
      if (prevSort.type === newSort) {
        return {
          type: newSort,
          direction:
            prevSort.direction === Direction.Asc
              ? Direction.Desc
              : Direction.Asc,
        };
      }
      return { type: newSort, direction: Direction.Asc };
    });
  };

  const sortedTrips = trips.slice().sort((a, b) => {
    if (sort.type === SortType.Departure) {
      return (
        (new Date(a.waypoints[0].date_time).getTime() -
          new Date(b.waypoints[0].date_time).getTime()) *
        (sort.direction === Direction.Asc ? 1 : -1)
      );
    } else if (sort.type === SortType.Price) {
      return (
        (parseInt(a.price.amount, 10) - parseInt(b.price.amount, 10)) *
        (sort.direction === Direction.Asc ? 1 : -1)
      );
    } else if (sort.type === SortType.Fastest) {
      return (
        (a.duration_in_seconds - b.duration_in_seconds) *
        (sort.direction === Direction.Asc ? 1 : -1)
      );
    }
    return 0;
  });

  if (!trips.length) {
    return <div className="noResults">There are no results for this trip</div>;
  }

  return (
    <div className="searchResults">
      <div className="sortButtons">
        <SortButton
          type={SortType.Departure}
          direction={sort.direction}
          onClick={handleSortChange}
          isActive={sort.type === SortType.Departure}
        />

        <SortButton
          type={SortType.Price}
          direction={sort.direction}
          onClick={handleSortChange}
          isActive={sort.type === SortType.Price}
        />

        <SortButton
          type={SortType.Fastest}
          direction={sort.direction}
          onClick={handleSortChange}
          isActive={sort.type === SortType.Fastest}
        />
      </div>

      <div className="resultsAndMap">
        <ul className="results">
          {sortedTrips.map((trip) => (
            <Trip trip={trip} key={trip.link} />
          ))}
        </ul>

        <div className="map">
          <DynamicMap geoDeparture={fromCoordinate} geoArrival={toCoordinate} />
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
