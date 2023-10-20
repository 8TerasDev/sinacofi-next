import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const Home = () => <h1>Welcome to Next.js!</h1>;

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /welcome to next\.js!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
