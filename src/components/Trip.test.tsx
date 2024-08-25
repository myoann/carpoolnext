import { render, screen } from "@testing-library/react";

import Trip from "./Trip";

const defaultProps = {
  trip: {
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
};

describe("Trip", () => {
  it("matches the snapshot", () => {
    const { container } = render(<Trip {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it("has a list element containing a link", () => {
    render(<Trip {...defaultProps} />);

    const li = screen.getByRole("listitem");
    expect(li).toBeInTheDocument();

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();

    expect(li).toContainElement(link);
  });

  it("has a link which redirects to the trip link", () => {
    render(<Trip {...defaultProps} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", defaultProps.trip.link);
  });

  it("displays the cheapest text when the trip is the cheapest", () => {
    render(
      <Trip
        {...defaultProps}
        trip={{ ...defaultProps.trip, isCheapest: true }}
      />
    );

    const cheapest = screen.getByText("Cheapest");
    expect(cheapest).toBeInTheDocument();
  });

  it("has a default text when no vehicle is given", () => {
    render(<Trip {...defaultProps} />);

    const vehicle = screen.getByText("No vehicle information");
    expect(vehicle).toBeInTheDocument();
  });

  it("has a text with the vehicle make and model when the vehicle is given", () => {
    render(
      <Trip
        {...defaultProps}
        trip={{
          ...defaultProps.trip,
          vehicle: { make: "Renault", model: "Clio" },
        }}
      />
    );

    const vehicle = screen.getByText("Renault Clio");
    expect(vehicle).toBeInTheDocument();
  });

  it("has a text with the departure time", () => {
    render(<Trip {...defaultProps} />);

    const departureTime = screen.getByText("10:00");
    expect(departureTime).toBeInTheDocument();
  });

  it("has a text with the arrival time", () => {
    render(<Trip {...defaultProps} />);

    const arrivalTime = screen.getByText("14:00");
    expect(arrivalTime).toBeInTheDocument();
  });

  it("has a text with the price", () => {
    render(<Trip {...defaultProps} />);

    const price = screen.getByText("10 €");
    expect(price).toBeInTheDocument();
  });

  it("has a text with the departure city and country code", () => {
    render(<Trip {...defaultProps} />);

    const departureCity = screen.getByText("Paris, FR");
    expect(departureCity).toBeInTheDocument();
  });

  it("has a text with the arrival city and country code", () => {
    render(<Trip {...defaultProps} />);

    const arrivalCity = screen.getByText("London, FR");
    expect(arrivalCity).toBeInTheDocument();
  });

  it("displays Direct if there is no transfer", () => {
    render(<Trip {...defaultProps} />);

    const transfers = screen.getByText("Direct");
    expect(transfers).toBeInTheDocument();
  });

  it("displays the number of transfers if there is at least one transfer", () => {
    const trip = {
      ...defaultProps.trip,
      waypoints: [
        ...defaultProps.trip.waypoints,
        {
          place: {
            city: "Brussels",
            address: "Brussels",
            latitude: 50.8503463,
            longitude: 4.3517211,
            country_code: "BE",
          },
          date_time: "2020-01-10T12:00:00+01:00",
        },
      ],
    };
    render(<Trip trip={trip} />);

    const transfers = screen.getByText("1 Stop");
    expect(transfers).toBeInTheDocument();
  });
});
