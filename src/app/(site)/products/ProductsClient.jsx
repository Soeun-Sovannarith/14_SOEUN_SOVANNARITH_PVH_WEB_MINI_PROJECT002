"use client";

import { useState, useEffect } from "react";
import ShopCardComponent from "../../../components/shop/ShopCardComponent";
import ProductFilterComponent from "../../../components/shop/ProductFilterComponent";
import { getProducts } from "../../service/service";

export default function ProductsClient({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // Ensure client-side hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Map products to ensure consistent structure
  const mappedProducts = products.map((p) => ({
    ...p,
    productId: p.productId || p.id,
    productName: p.name || p.productName,
    categoryName: p.categoryName || p.category?.name,
  }));

  const handleFilterChange = (filtered) => {
    setFilteredProducts(filtered);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    // Apply search filter
    let filtered = products;
    
    if (value.trim()) {
      const searchLower = value.toLowerCase();
      filtered = filtered.filter(product => {
        const productName = (product.name || product.productName || "").toLowerCase();
        const description = (product.description || "").toLowerCase();
        return productName.includes(searchLower) || description.includes(searchLower);
      });
    }
    
    setFilteredProducts(filtered);
  };

  const mappedFilteredProducts = filteredProducts.map((p) => ({
    ...p,
    productId: p.productId || p.id,
    productName: p.name || p.productName,
    categoryName: p.categoryName || p.category?.name,
  }));

  return (
    <div className="mx-auto w-full max-w-7xl py-10">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Luxury beauty products</h1>
            <p className="mt-2 text-gray-600">Use filters to narrow by price and brand.</p>
          </div>
          {isMounted && (
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by product name..."
              className="w-80 rounded-lg border-2 border-lime-500 px-4 py-2 text-sm focus:border-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-200"
            />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Filter Section */}
        <ProductFilterComponent
          products={mappedProducts}
          onFilterChange={handleFilterChange}
          categories={[...new Set(mappedProducts.map(p => p.categoryName).filter(Boolean))]}
          searchTerm={searchTerm}
        />

        {/* Products Section */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">
              Showing {mappedFilteredProducts.length} {mappedFilteredProducts.length === 1 ? 'product' : 'products'}
            </h2>
          </div>

          {mappedFilteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mappedFilteredProducts.map((product) => (
                <ShopCardComponent key={product.productId} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found matching your filters.</p>
              <button
                onClick={() => setFilteredProducts(mappedProducts)}
                className="mt-4 text-sm text-lime-600 hover:text-lime-700"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
