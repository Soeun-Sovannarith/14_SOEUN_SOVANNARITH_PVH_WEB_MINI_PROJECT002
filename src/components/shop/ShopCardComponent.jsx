"use client";

import Link from "next/link";
import Image from "next/image";
import { StarRow } from "../ProductCardComponent";
import ButtonAddComponent from "../ButtonAddComponent";

const categoryTone = {
  Skincare: "bg-sky-50 text-sky-800",
  Makeup: "bg-violet-50 text-violet-800",
  Fragrance: "bg-amber-50 text-amber-900",
  Haircare: "bg-emerald-50 text-emerald-900",
};

function badgeClass(label) {
  return categoryTone[label] ?? "bg-indigo-50 text-indigo-800";
}

const btnClass =
  "mt-2 block w-full rounded-xl border border-gray-900 bg-gray-900 py-2.5 text-center text-sm font-medium text-white transition hover:bg-gray-800";

export default function ShopCardComponent({ product }) {
  const {
    productId,
    productName,
    description,
    price,
    imageUrl,
    categoryName,
    category,
    colors,
    sizes,
  } = product;

  const categoryLabel = categoryName || category?.name || "Product";
  const hasVariations = (colors && colors.length > 1) || (sizes && sizes.length > 1);

  return (
    <article className="group max-w-75 flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={productName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-linear-to-br from-gray-100 to-lime-50/30 text-gray-400">
            ◇
          </div>
        )}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ButtonAddComponent product={product} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-semibold leading-snug text-gray-900">
            {productName}
          </h3>
          <p className="mt-1 min-h-10 line-clamp-2 text-sm leading-5 text-gray-500">
            {description || "No description available."}
          </p>
        </div>
        <StarRow />
        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-2">
          <div className="flex flex-col">
            <p className="text-xl font-semibold tabular-nums text-gray-900">
              ${price}
            </p>
            {hasVariations && (
              <p className="text-xs text-gray-500 mt-1">
                Multiple options available
              </p>
            )}
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${badgeClass(categoryLabel)}`}
          >
            {categoryLabel}
          </span>
        </div>
        <Link href={`/products/${productId}`} className={btnClass}>
          View Product
        </Link>
      </div>
    </article>
  );
}
