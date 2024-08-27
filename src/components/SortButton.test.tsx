import { render, screen } from "@testing-library/react";

import { Direction, SortType } from "@/types";

import SortButton from "./SortButton";

const defaultProps = {
  direction: Direction.Asc,
  isActive: false,
  onClick: jest.fn(),
  type: SortType.Departure,
};

describe("SortButton", () => {
  it("matches the snapshot", () => {
    const { container } = render(<SortButton {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it("calls the onClick function when clicked", () => {
    render(<SortButton {...defaultProps} />);

    const button = screen.getByRole("button");
    button.click();

    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it("displays the filter name", () => {
    render(<SortButton {...defaultProps} />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Departure");
  });

  it("displays the filter name in descending order", () => {
    render(
      <SortButton {...defaultProps} direction={Direction.Desc} isActive />,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Departure ↓");
  });

  it("displays the filter name for price", () => {
    render(<SortButton {...defaultProps} type={SortType.Price} />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Price");
  });

  it("displays the filter name for fastest", () => {
    render(<SortButton {...defaultProps} type={SortType.Fastest} />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Fastest");
  });
});
