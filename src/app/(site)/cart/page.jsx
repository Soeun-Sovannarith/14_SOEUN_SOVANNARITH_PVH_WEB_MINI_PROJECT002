"use client";

import { useCart } from "@/app/context/CartContext";
import { Button } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-2xl px-4">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <div className="rounded-2xl bg-white p-12 text-center">
            <div className="mb-6 text-6xl">🛒</div>
            <h2 className="mb-3 text-xl font-semibold text-gray-900">Your cart is empty</h2>
            <p className="mb-8 text-gray-600">Looks like you haven't added anything to your cart yet.</p>
            <Link href="/products">
              <Button className="rounded-full bg-lime-400 font-semibold text-gray-900 hover:bg-lime-300">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="mt-2 text-gray-600">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Items</h2>
                  <Button
                    variant="flat"
                    color="danger"
                    size="sm"
                    onPress={clearCart}
                    className="rounded-full"
                  >
                    Clear All
                  </Button>
                </div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div key={item.productId} className="p-6">
                    <div className="flex gap-4">
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.productName}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                            ◇
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{item.productName}</h3>
                          <p className="text-sm text-gray-600 mt-1">${item.price}</p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <Button
                              size="sm"
                              variant="flat"
                              onPress={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="h-8 w-8 rounded-full p-0 min-w-8"
                              isDisabled={item.quantity <= 1}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="flat"
                              onPress={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="h-8 w-8 rounded-full p-0 min-w-8"
                            >
                              +
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <span className="font-semibold text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <Button
                              size="sm"
                              variant="flat"
                              color="danger"
                              onPress={() => removeFromCart(item.productId)}
                              className="h-8 w-8 rounded-full p-0 min-w-8"
                            >
                              ×
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-white shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button
                  className="w-full rounded-full bg-lime-400 font-semibold text-gray-900 hover:bg-lime-300"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
                
                <Link href="/products">
                  <Button
                    variant="flat"
                    className="w-full rounded-full"
                    size="lg"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
