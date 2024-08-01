import { render, screen } from "@testing-library/react";

import Header from "./Header";

describe("Header", () => {
  it("matches the snapshot", () => {
    const { container } = render(<Header />);

    expect(container).toMatchSnapshot();
  });

  it("has a a link which redirects to /", () => {
    render(<Header />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });

  it("has a text with the name of the website (CARPOOL)", () => {
    render(<Header />);

    const logoTitle = screen.getByText("Carpool");
    expect(logoTitle).toBeInTheDocument();
  });
});
