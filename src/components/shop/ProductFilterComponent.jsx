"use client";

import { useState } from "react";
import { Button } from "@heroui/react";

export default function ProductFilterComponent({ 
  products, 
  onFilterChange, 
  categories,
  searchTerm 
}) {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 300 });
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Get unique categories from products
  const availableCategories = categories || [...new Set(products?.map(p => p.categoryName || p.category?.name).filter(Boolean))];

  // Get price range from products
  const maxPrice = Math.max(...products?.map(p => p.price || 0), 300);
  const minPrice = 0;

  const handlePriceChange = (type, value) => {
    const newRange = { ...priceRange, [type]: value };
    setPriceRange(newRange);
    applyFilters(newRange, selectedCategories, searchTerm);
  };

  const handleQuickSelect = (max) => {
    const newRange = { min: 0, max };
    setPriceRange(newRange);
    applyFilters(newRange, selectedCategories, searchTerm);
  };

  const handleCategoryToggle = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
    applyFilters(priceRange, newCategories, searchTerm);
  };

  const handleReset = () => {
    const resetRange = { min: 0, max: maxPrice };
    setPriceRange(resetRange);
    setSelectedCategories([]);
    applyFilters(resetRange, [], searchTerm);
  };

  const applyFilters = (currentPriceRange, currentCategories, currentSearch) => {
    let filtered = products;

    // Apply price filter
    filtered = filtered.filter(product => {
      const price = product.price || 0;
      return price >= currentPriceRange.min && price <= currentPriceRange.max;
    });

    // Apply category filter
    if (currentCategories.length > 0) {
      filtered = filtered.filter(product => {
        const productCategory = product.categoryName || product.category?.name;
        return currentCategories.includes(productCategory);
      });
    }

    // Apply search filter
    if (currentSearch.trim()) {
      const searchLower = currentSearch.toLowerCase();
      filtered = filtered.filter(product => {
        const productName = (product.name || product.productName || "").toLowerCase();
        const description = (product.description || "").toLowerCase();
        return productName.includes(searchLower) || description.includes(searchLower);
      });
    }

    onFilterChange(filtered);
  };

  const getCategoryCount = (category) => {
    return products?.filter(p => (p.categoryName || p.category?.name) === category).length || 0;
  };

  return (
    <div className="w-full lg:w-80 flex-shrink-0">
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <Button
            variant="flat"
            size="sm"
            onPress={handleReset}
            className="rounded-full text-sm"
          >
            Reset filters
          </Button>
        </div>

        
        {/* Price Range */}
        <div className="mb-6">
          <label className="mb-3 block text-sm font-medium text-gray-700">
            Price Range
          </label>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">${priceRange.min}</span>
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange.max}
                onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-lime-500"
              />
              <span className="text-sm text-gray-600">${priceRange.max}</span>
            </div>
            <p className="text-xs text-gray-500">
              {priceRange.max >= maxPrice ? "(no limit)" : ""}
            </p>
          </div>
        </div>

        {/* Quick Select */}
        <div className="mb-6">
          <label className="mb-3 block text-sm font-medium text-gray-700">
            Quick Select
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={priceRange.max === 50 ? "solid" : "flat"}
              size="sm"
              onPress={() => handleQuickSelect(50)}
              className={`rounded-full text-xs ${priceRange.max === 50 ? "bg-black text-white border-black" : ""}`}
            >
              Under $50
            </Button>
            <Button
              variant={priceRange.max === 100 ? "solid" : "flat"}
              size="sm"
              onPress={() => handleQuickSelect(100)}
              className={`rounded-full text-xs ${priceRange.max === 100 ? "bg-black text-white border-black" : ""}`}
            >
              Under $100
            </Button>
            <Button
              variant={priceRange.max === 150 ? "solid" : "flat"}
              size="sm"
              onPress={() => handleQuickSelect(150)}
              className={`rounded-full text-xs ${priceRange.max === 150 ? "bg-black text-white border-black" : ""}`}
            >
              Under $150
            </Button>
            <Button
              variant={priceRange.max === maxPrice ? "solid" : "flat"}
              size="sm"
              onPress={() => handleQuickSelect(maxPrice)}
              className={`rounded-full text-xs ${priceRange.max === maxPrice ? "bg-black text-white border-black" : ""}`}
            >
              All prices
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className="mb-3 block text-sm font-medium text-gray-700">
            Categories
          </label>
          <div className="space-y-2">
            {availableCategories.map((category) => (
              <label key={category} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="h-4 w-4 rounded border-gray-300 text-lime-500 focus:ring-lime-500"
                />
                <span className="text-sm text-gray-700">{category}</span>
                <span className="text-xs text-gray-500">({getCategoryCount(category)})</span>
              </label>
            ))}
          </div>
          {availableCategories.length === 0 && (
            <p className="text-xs text-gray-500">No categories available</p>
          )}
          <p className="mt-2 text-xs text-gray-500">
            Select none to include all categories.
          </p>
        </div>
      </div>
    </div>
  );
}
