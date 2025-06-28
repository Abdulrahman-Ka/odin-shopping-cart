import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../components/ProductCard";
import "@testing-library/jest-dom";

const mockProduct = {
  id: 1,
  title: "Sample Product Title That Is Quite Long and Needs Truncation",
  price: 19.99,
  imgae: "https://via.placeholder.com/150",
  category: "electronics",
};

describe("<ProuctCard />", () => {
  it("renders product title, category, and price", () => {
    render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />);

    expect(screen.getByText(/sample product title/i)).toBeInTheDocument();
    expect(screen.getByText(/ELECTRONICS/i)).toBeInTheDocument();
    expect(screen.getByText(/19.99/)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add to cart/i })
    ).toBeInTheDocument();
  });

  it("updates quantity from direct input", () => {
    render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />);

    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "3" } });

    expect(input.value).toBe("3");
  });

  it("calls onAddToCart with correct product and qty", () => {
    const onAddToCart = vi.fn();
    render(<ProductCard product={mockProduct} onAddToCart={onAddToCart} />);

    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "2" } });

    const button = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(button);

    expect(onAddToCart).toHaveBeenCalledTimes(1);
    expect(onAddToCart).toHaveBeenCalledWith({
      ...mockProduct,
      qty: 2,
    });

    // Quantity resets after add
    expect(input.value).toBe("1");
  });

  // });
});
