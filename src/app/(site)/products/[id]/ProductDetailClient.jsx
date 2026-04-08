"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "../../../../app/context/CartContext";
import { useToast } from "../../../../app/context/ToastContext";
import { StarRow } from "../../../../components/ProductCardComponent";
import ProductVariationSelector from "../../../../components/shop/ProductVariationSelector";

const categoryTone = {
  Skincare: "bg-sky-50 text-sky-800 ring-sky-200",
  Makeup: "bg-violet-50 text-violet-800 ring-violet-200",
  Fragrance: "bg-amber-50 text-amber-900 ring-amber-200",
  Haircare: "bg-emerald-50 text-emerald-900 ring-emerald-200",
};

function badgeClass(label) {
  return categoryTone[label] ?? "bg-indigo-50 text-indigo-800 ring-indigo-200";
}

export default function ProductDetailClient({ product: initialProduct }) {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  // Support both payload wrapper and direct object
  const product = initialProduct?.payload ?? initialProduct;

  if (!product || !product.productId && !product.id) {
    return <div>Product not found</div>;
  }

  const productId   = product.productId || product.id;
  const productName = product.name      || product.productName;
  const categoryLabel =
    product.categoryName || product.category?.name || "Product";
  const price       = product.price;
  const description = product.description || "No description available.";
  const imageUrl    = product.imageUrl;
  const colors      = product.colors || [];
  const sizes       = product.sizes || [];

  // Set default selections
  useEffect(() => {
    if (colors.length > 0 && !selectedColor) {
      setSelectedColor(colors[0]);
    }
    if (sizes.length > 0 && !selectedSize) {
      setSelectedSize(sizes[0]);
    }
  }, [colors, sizes]);

  const handleAddToCart = () => {
    const productToAdd = {
      productId,
      productName,
      price,
      imageUrl,
    };
    
    for (let i = 0; i < quantity; i++) {
      addToCart(productToAdd, selectedColor, selectedSize);
    }
    
    const colorText = selectedColor ? ` (${selectedColor})` : '';
    const sizeText = selectedSize ? ` (${selectedSize})` : '';
    
    addToast({
      title: "Added to cart!",
      description: `${quantity} × ${productName}${colorText}${sizeText} has been added to your cart.`,
      color: "success"
    });
  };

  // Build a small gallery from the single imageUrl + stock fallbacks
  const gallery = imageUrl
    ? [
        imageUrl,
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=1000&fit=crop",
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=1000&fit=crop",
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=1000&fit=crop",
      ]
    : [];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* ── Breadcrumb ─────────────────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-7xl px-4 pt-8 pb-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gray-900 transition-colors">Products</Link>
          <span>/</span>
          <span className="line-clamp-1 text-gray-900 font-medium">{productName}</span>
        </nav>
      </div>

      {/* ── Main Grid ──────────────────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-7xl px-4 pb-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

          {/* ── Image Column ─────────────────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={productName}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex size-full items-center justify-center bg-gradient-to-br from-gray-100 to-lime-50/30 text-gray-300 text-6xl">
                  ◇
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {gallery.slice(0, 4).map((url, i) => (
                  <div
                    key={i}
                    className={`relative aspect-square overflow-hidden rounded-xl border bg-white shadow-sm ${
                      i === 0 ? "border-gray-900 ring-1 ring-gray-900" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={url}
                      alt={`${productName} view ${i + 1}`}
                      fill
                      sizes="(max-width: 1024px) 25vw, 12vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Info Column ──────────────────────────────────────────────── */}
          <div className="flex flex-col justify-center gap-6">
            {/* Category badge */}
            <span
              className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${badgeClass(categoryLabel)}`}
            >
              {categoryLabel}
            </span>

            {/* Name */}
            <div>
              <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                {productName}
              </h1>
              <p className="mt-1 text-sm text-gray-400 font-mono">#{productId?.toString().slice(0, 8)}</p>
            </div>

            {/* Rating */}
            <StarRow rating={4.8} />

            {/* Price */}
            <p className="text-4xl font-bold tabular-nums text-gray-900">
              ${price}
              <span className="ml-2 text-sm font-normal text-gray-400">USD</span>
            </p>

            {/* Divider */}
            <hr className="border-gray-100" />

            {/* Description */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                About this product
              </h2>
              <p className="mt-3 leading-relaxed text-gray-700">{description}</p>
            </div>

            {/* Highlights */}
            <ul className="space-y-2 text-sm text-gray-600">
              {[
                "Free shipping on orders over $75",
                "30-day hassle-free returns",
                "Authenticity guaranteed",
              ].map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <span className="text-lime-500 font-bold">✓</span>
                  {point}
                </li>
              ))}
            </ul>

            {/* Product Variations */}
            <ProductVariationSelector
              colors={colors}
              sizes={sizes}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              onColorChange={setSelectedColor}
              onSizeChange={setSelectedSize}
            />

            {/* CTA */}
            <div className="flex flex-col gap-3">
              {/* Quantity selector */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-8 w-8 rounded-full border border-gray-300 bg-white text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-8 w-8 rounded-full border border-gray-300 bg-white text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 rounded-2xl bg-gray-900 py-4 text-center text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[.98]"
                >
                  Add to Cart
                </button>
                <button
                  className="rounded-2xl border border-gray-200 bg-white px-6 py-4 text-center text-sm font-semibold text-gray-900 transition hover:border-gray-400 active:scale-[.98]"
                >
                  ♡ Wishlist
                </button>
              </div>
            </div>

            {/* Back link */}
            <Link
              href="/products"
              className="mt-2 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              ← Back to all products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
