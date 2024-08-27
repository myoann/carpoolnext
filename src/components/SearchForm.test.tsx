import React from "react";
import { render, screen } from "@testing-library/react";

import SearchForm from "./SearchForm";

jest.mock("../utils", () => ({
  isMobileDevice: () => false,
}));

describe("SearchForm", () => {
  it("matches the snapshot", () => {
    const { container } = render(<SearchForm />);

    expect(container).toMatchSnapshot();
  });

  it("renders a form", () => {
    render(<SearchForm />);

    expect(
      screen.getByRole("form", { name: "Search for a carpool" }),
    ).toBeInTheDocument();
  });

  it("renders three inputs", () => {
    render(<SearchForm />);

    const placesAutocompleteInputs = screen.getAllByRole("textbox");
    expect(placesAutocompleteInputs).toHaveLength(3);
  });

  it("renders a button with an img inside", () => {
    render(<SearchForm />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    const img = screen.getByRole("img", { name: "Search" });
    expect(img).toBeInTheDocument();

    expect(button).toContainElement(img);
  });
});
