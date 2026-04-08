"use client";

import { useState } from "react";

export default function ProductVariationSelector({ 
  colors = [], 
  sizes = [], 
  selectedColor, 
  selectedSize, 
  onColorChange, 
  onSizeChange
}) {
  const [localSelectedColor, setLocalSelectedColor] = useState(selectedColor || (colors[0] || null));
  const [localSelectedSize, setLocalSelectedSize] = useState(selectedSize || (sizes[0] || null));

  const handleColorSelect = (color) => {
    setLocalSelectedColor(color);
    onColorChange(color);
  };

  const handleSizeSelect = (size) => {
    setLocalSelectedSize(size);
    onSizeChange(size);
  };

  return (
    <div className="space-y-6">
      {/* Color Selector */}
      {colors && colors.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-medium text-gray-700">Choose a color</h3>
          <div className="flex flex-wrap gap-3 mb-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorSelect(color)}
                className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
                  localSelectedColor === color
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            Selected: {localSelectedColor || "None"}
          </p>
        </div>
      )}

      {/* Size Selector */}
      {sizes && sizes.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-medium text-gray-700">Choose a size</h3>
          <div className="flex flex-wrap gap-3 mb-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeSelect(size)}
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all ${
                  localSelectedSize === size
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                {size}
                {localSelectedSize === size && (
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                )}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            Selected: {localSelectedSize || "None"}
          </p>
        </div>
      )}

    </div>
  );
}
