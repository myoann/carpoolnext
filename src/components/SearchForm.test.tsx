import React from "react";
import { render } from "@testing-library/react";

import SearchForm from "./SearchForm";

jest.mock("react-datepicker", () => {
  const DatePicker = () => <input type="date" />;
  return DatePicker;
});

describe("SearchForm", () => {
  it("matches the snapshot", () => {
    const { container } = render(<SearchForm />);

    expect(container).toMatchSnapshot();
  });

  it("renders a form", () => {
    const { container } = render(<SearchForm />);

    expect(container.querySelector("form")).toBeInTheDocument();
  });

  it("renders two inputs for the from and to coordinates", () => {
    const { container } = render(<SearchForm />);

    const placesAutocompleteInputs = container.querySelectorAll(
      ".placesAutocomplete input",
    );
    expect(placesAutocompleteInputs).toHaveLength(2);
  });

  it("renders an input for the date inside the div with the classname react-datepicker__input-container", () => {
    const { container } = render(<SearchForm />);

    expect(
      container.querySelector(".react-datepicker__input-container input"),
    ).toBeInTheDocument();
  });

  it("renders a button", () => {
    const { container } = render(<SearchForm />);

    expect(container.querySelector("button")).toBeInTheDocument();
  });

  it("renders an image inside the button", () => {
    const { container } = render(<SearchForm />);

    expect(container.querySelector("button img")).toBeInTheDocument();
  });
});
