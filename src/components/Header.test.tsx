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

    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("Carpool");
  });

  it("has an image with the alt text 'Yoann Moise Logo'", () => {
    render(<Header />);

    const image = screen.getByRole("img", { name: "Yoann Moise Logo" });
    expect(image).toBeInTheDocument();
  });
});
