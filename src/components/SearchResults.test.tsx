import { render, screen } from "@testing-library/react";

import SearchResults from "./SearchResults";

const defaultProps = {
  fromCoordinate: { lat: 48.864716, lng: 2.349014 },
  toCoordinate: { lat: 51.509865, lng: -0.118092 },
  trips: [
    {
      link: "link1",
      departure: new Date(2021, 1, 1),
      arrival: new Date(2021, 1, 1),
      waypoints: [
        {
          place: {
            city: "Paris",
            address: "6 rue Menars, 75002 Paris",
            latitude: 48.864716,
            longitude: 2.349014,
            country_code: "FR",
          },
          date_time: "2020-01-10T10:00:00+01:00",
        },
        {
          place: {
            city: "London",
            address: "Charing Cross, London WC2N 5DU",
            latitude: 51.509865,
            longitude: -0.118092,
            country_code: "FR",
          },
          date_time: "2020-01-10T14:00:00+01:00",
        },
      ],
      price: {
        amount: "10",
        currency: "EUR",
      },
      isCheapest: false,
      distance_in_meters: 1000,
      duration_in_seconds: 1000,
    },
    {
      link: "link2",
      departure: new Date(2022, 2, 2),
      arrival: new Date(2022, 2, 3),
      waypoints: [
        {
          place: {
            city: "Paris",
            address: "6 rue Menars, 75002 Paris",
            latitude: 48.864716,
            longitude: 2.349014,
            country_code: "FR",
          },
          date_time: "2020-01-10T10:00:00+01:00",
        },
        {
          place: {
            city: "London",
            address: "Charing Cross, London WC2N 5DU",
            latitude: 51.509865,
            longitude: -0.118092,
            country_code: "FR",
          },
          date_time: "2020-01-10T14:00:00+01:00",
        },
      ],
      price: {
        amount: "10",
        currency: "EUR",
      },
      vehicle: {
        make: "renault",
        model: "clio",
      },
      isCheapest: true,
      distance_in_meters: 24000,
      duration_in_seconds: 10000,
    },
  ],
};

describe("SearchResults", () => {
  it("shows a message when there are no results", () => {
    render(<SearchResults {...defaultProps} trips={[]} />);

    const noResults = screen.getByText("There are no results for this trip");
    expect(noResults).toBeInTheDocument();
  });

  it("renders the correct number of trips", () => {
    render(<SearchResults {...defaultProps} />);

    const trips = screen.getAllByRole("listitem");
    expect(trips).toHaveLength(defaultProps.trips.length);
  });
});
