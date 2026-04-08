import React from "react";
import ShopCardComponent from "../../../components/shop/ShopCardComponent";
import { getProducts } from "../../service/service";
import { auth } from "../../../auth";

export default async function Page() {
  const session = await auth();
  const data = await getProducts(session?.accessToken);
  const allProducts = data?.payload || [];
  const isUnauthorized = data?.status === 401 || data?.status === "401 UNAUTHORIZED";

  const mappedProducts = allProducts.map((p) => ({
    ...p,
    productId: p.productId || p.id,
    productName: p.name || p.productName,
    categoryName: p.categoryName || p.category?.name,
  }));

  return (
    <div className="mx-auto w-full max-w-7xl py-10">
      <h1 className="mb-8 text-3xl font-semibold text-gray-900">All Products</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {mappedProducts.map((product) => (
          <ShopCardComponent key={product.productId} product={product} />
        ))}
      </div>

      {mappedProducts.length === 0 && isUnauthorized ? (
        <p className="text-center text-sm text-rose-600">
          You need to sign in first to view products.
        </p>
      ) : null}

      {mappedProducts.length === 0 && !isUnauthorized ? (
        <p className="text-center text-sm text-gray-500">No products found.</p>
      ) : null}
    </div>
  );
}
