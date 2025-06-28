import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../components/Header"; // Adjust the import path
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("<Header />", () => {
  it("renders logo, title, and navigation links", () => {
    render(
      <MemoryRouter>
        <Header cartCount={3} />
      </MemoryRouter>
    );

    expect(screen.getByAltText(/simple shop logo/i)).toBeInTheDocument();
    expect(screen.getByText(/simple shop/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
  });

  it("shows correct cart item count in badge", () => {
    render(
      <MemoryRouter>
        <Header cartCount={5} />
      </MemoryRouter>
    );

    const badge = screen.getByText("5");
    expect(badge).toBeInTheDocument();
  });

  it("navigates to / when title is clicked", () => {
    render(
      <MemoryRouter>
        <Header cartCount={1} />
      </MemoryRouter>
    );

    const titleLink = screen.getByRole("link", { name: /simple shop/i });
    expect(titleLink).toHaveAttribute("href", "/");
  });
});
