import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Home from "../components/Home"; // Adjust path as needed
import "@testing-library/jest-dom";

// Mock fetch globally
beforeEach(() => {
  window.fetch = vi.fn();
});

const fakeProducts = [
  {
    id: 1,
    title: "Test Product",
    price: 99.99,
    category: "electronics",
    image: "https://example.com/product.jpg",
  },
];

describe("<Home />", () => {
  it("displays loading state initially", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<Home addToCart={vi.fn()} />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders products when fetch succeeds", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => fakeProducts,
    });

    render(<Home addToCart={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText(/test product/i)).toBeInTheDocument();
    });
  });

  it("displays error and retry button on fetch failure", async () => {
    fetch.mockRejectedValueOnce(new Error("Fetch failed"));

    render(<Home addToCart={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText(/unable to load products/i)).toBeInTheDocument();
    });

    const retryButton = screen.getByRole("button", { name: /retry/i });
    expect(retryButton).toBeInTheDocument();
  });

  it("retries fetch when retry button is clicked", async () => {
    fetch
      .mockRejectedValueOnce(new Error("Initial failure"))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => fakeProducts,
      });

    render(<Home addToCart={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText(/unable to load products/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /retry/i }));

    await waitFor(() => {
      expect(screen.getByText(/test product/i)).toBeInTheDocument();
    });
  });
});
