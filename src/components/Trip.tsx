import { ParsedTrip } from "@/types";

import { convertSeconds, currencySymbol } from "@/utils";

import "./Trip.css";
import { useMemo } from "react";

type Props = {
  trip: ParsedTrip;
};

const Trip = ({
  trip: { isCheapest, link, waypoints, duration_in_seconds, price, vehicle },
}: Props) => {
  const firstWaypoint = waypoints[0];
  const lastWaypoint = waypoints[waypoints.length - 1];
  const nbTransfers = waypoints.length - 2;

  const transferText = useMemo(() => {
    if (nbTransfers === 0) {
      return "Direct";
    }

    return `${nbTransfers} ${nbTransfers > 1 ? "Stops" : "Stop"}`;
  }, [nbTransfers]);

  return (
    <li key={link} className="trip">
      <a href={link} target="_blank" className="tripLink">
        {isCheapest && <span className="cheapest">Cheapest</span>}

        <span className="vehicle">
          {vehicle
            ? `${vehicle.make} ${vehicle.model}`
            : "No vehicle information"}
        </span>

        <div className="timesAndPrice">
          <div className="timesAndDuration">
            <span className="time">
              {new Date(firstWaypoint.date_time).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>

            <div className="durationContainer">
              <div className="durationLine" />
              <div className="duration">
                {convertSeconds(duration_in_seconds)}
              </div>
              <div className="durationLine" />
            </div>

            <span className="time">
              {new Date(lastWaypoint.date_time).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <span className="price">
            {price.amount} {currencySymbol(price.currency)}
          </span>
        </div>

        <div className="addresses">
          <span>
            {firstWaypoint.place.city}, {firstWaypoint.place.country_code}
          </span>
          <span>
            {lastWaypoint.place.city}, {lastWaypoint.place.country_code}
          </span>
        </div>

        <span className="transfers">{transferText}</span>
      </a>
    </li>
  );
};

export default Trip;
