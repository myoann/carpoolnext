import { render, screen } from "@testing-library/react";

import PlacesAutocomplete from "./PlacesAutocomplete";

const defaultProps = {
  id: "placesAutocomplete",
  placeholder: "Search for a place",
  onCoordinates: jest.fn(),
};

describe("PlacesAutocomplete", () => {
  it("matches the snapshot", () => {
    const { container } = render(<PlacesAutocomplete {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it("has an input with the placeholder passed as prop", () => {
    render(<PlacesAutocomplete {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search for a place");
    expect(input).toBeInTheDocument();
  });
});
