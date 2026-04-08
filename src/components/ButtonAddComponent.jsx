'use client'

import { Button } from "@heroui/react";
import React from "react";
import { useCart } from "../app/context/CartContext";
import { useToast } from "../app/context/ToastContext";

export default function ButtonAddComponent({ product }) {
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    addToast({
      title: "Added to cart!",
      description: `${product.productName} has been added to your cart.`,
      color: "success"
    });
  };

  return (
    <Button
      isIconOnly
      aria-label="Add to cart"
      onPress={handleAddToCart}
      className={`size-11 rounded-full bg-lime-400 text-xl font-light text-gray-900 shadow-sm transition hover:bg-lime-300 active:scale-95}`}
    >
      +
    </Button>
  );
}
