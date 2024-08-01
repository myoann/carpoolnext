import { render } from "@testing-library/react";

import SearchForm from "./SearchForm";

describe("SearchForm", () => {
  it("matches the snapshot", () => {
    const { container } = render(<SearchForm />);

    expect(container).toMatchSnapshot();
  });

  it("renders a form", () => {
    const { container } = render(<SearchForm />);

    expect(container.querySelector("form")).toBeInTheDocument();
  });

  it("renders an input for the from coordinate", () => {
    const { container } = render(<SearchForm />);

    expect(
      container.querySelector('input[name="fromCoordinate"]'),
    ).toBeInTheDocument();
  });

  it("renders an input for the to coordinate", () => {
    const { container } = render(<SearchForm />);

    expect(
      container.querySelector('input[name="toCoordinate"]'),
    ).toBeInTheDocument();
  });

  it("renders an input for the date", () => {
    const { container } = render(<SearchForm />);

    expect(container.querySelector('input[type="date"]')).toBeInTheDocument();
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
