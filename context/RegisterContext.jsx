"use client";

import React, { createContext, useState, useContext } from 'react';

const RegisterContext = createContext();

export const useRegisterModal = () => useContext(RegisterContext);

export const RegisterProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');

  const openModal = (product = '', id = '') => {
    setProductName(product);
    setProductId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setProductName('');
    setProductId('');
  };

  return (
    <RegisterContext.Provider value={{ isOpen, productName, productId, openModal, closeModal }}>
      {children}
    </RegisterContext.Provider>
  );
};
