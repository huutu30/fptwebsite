"use client";

import React, { createContext, useContext, useState } from 'react';

const ProductDetailContext = createContext();

export const useProductDetail = () => useContext(ProductDetailContext);

export const ProductDetailProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openDetail = (product) => {
    setSelectedProduct(product);
  };

  const closeDetail = () => {
    setSelectedProduct(null);
  };

  return (
    <ProductDetailContext.Provider value={{ selectedProduct, openDetail, closeDetail }}>
      {children}
    </ProductDetailContext.Provider>
  );
};
