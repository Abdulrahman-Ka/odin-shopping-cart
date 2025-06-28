import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CartPage from "../components/CartPage";
import "@testing-library/jest-dom";

const sampleCartItems = [
  {
    id: 1,
    title: "Product One",
    price: 10.0,
    image: "https://via.placeholder.com/150",
    qty: 2,
  },
  {
    id: 2,
    title: "Product Two",
    price: 15.0,
    image: "https://via.placeholder.com/150",
    qty: 1,
  },
];

describe("<CartPage />", () => {
  it("displays message when cart is empty", () => {
    render(
      <CartPage
        cartItems={[]}
        removeFromCart={vi.fn()}
        updateQuantity={vi.fn()}
        clearCart={vi.fn()}
      />
    );

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it("renders cart items with correct titles, qty, and totals", () => {
    render(
      <CartPage
        cartItems={sampleCartItems}
        removeFromCart={vi.fn()}
        updateQuantity={vi.fn()}
        clearCart={vi.fn()}
      />
    );

    expect(screen.getByText(/Product One/)).toBeInTheDocument();
    expect(screen.getByText(/Product Two/)).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Total: $20.00")).toBeInTheDocument(); // 2 * $10
    expect(screen.getByText("Total: $15.00")).toBeInTheDocument(); // 1 * $15
    expect(screen.getByText("Total: $35.00")).toBeInTheDocument(); // Final total
  });

  it("calls removeFromCart when remove button is clicked", () => {
    const removeFromCart = vi.fn();

    render(
      <CartPage
        cartItems={sampleCartItems}
        removeFromCart={removeFromCart}
        updateQuantity={vi.fn()}
        clearCart={vi.fn()}
      />
    );

    const removeButtons = screen.getAllByRole("button", { name: /remove/i });
    fireEvent.click(removeButtons[0]);

    expect(removeFromCart).toHaveBeenCalledWith(1);
  });

  it('calls clearCart when "Clear Cart" is clicked', () => {
    const clearCart = vi.fn();

    render(
      <CartPage
        cartItems={sampleCartItems}
        removeFromCart={vi.fn()}
        updateQuantity={vi.fn()}
        clearCart={clearCart}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /clear cart/i }));
    expect(clearCart).toHaveBeenCalled();
  });
});
