import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductList from '../ProductList';
import { ProductContext } from '../../context/ProductContext';
import { AuthContext } from '../../context/AuthContext';

describe('ProductList Komponent', () => {
  const mockAuthContextValue = {
    authHeader: {
      headers: { Authorization: 'Bearer mockToken' },
    },
    isAdmin: true,
  };

  const mockProductContextValue = {
    products: [],
    fetchProducts: jest.fn(),
    addProduct: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn(),
  };

  it('wyświetla liste produktów', () => {
    const mockProducts = [
      { productId: 1, name: 'Product 1', price: 100 },
      { productId: 2, name: 'Product 2', price: 200 },
    ];

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <ProductContext.Provider value={{ ...mockProductContextValue, products: mockProducts }}>
          <ProductList />
        </ProductContext.Provider>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    
  });

  it('sprawdza czy wyświetla informacje o braku produktów', () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <ProductContext.Provider value={mockProductContextValue}>
          <ProductList />
        </ProductContext.Provider>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Brak produktów!')).toBeInTheDocument();
  });

  it('nie powinno wyświetlić kolumny "Działania" jeśli odwiedzający jest użytkownikiem', () => {
    const mockAuthContextValueWithAdmin = {
        ...mockAuthContextValue,
        isAdmin: false,
      };

    const mockProducts = [
      { productId: 1, name: 'Product 1', price: 100 },
    ];

    render(
      <AuthContext.Provider value={mockAuthContextValueWithAdmin}>
        <ProductContext.Provider value={{ ...mockProductContextValue, products: mockProducts }}>
        <ProductList isAdmin={mockAuthContextValueWithAdmin.isAdmin} />
        </ProductContext.Provider>
      </AuthContext.Provider>
    );

    expect(screen.queryByText('Działania')).not.toBeInTheDocument();
  });

  it('powinno wyświetlić kolumnę "Działania" jeśli odwiedzający jest administratorem', () => {
    const mockAuthContextValueWithAdmin = {
      ...mockAuthContextValue,
      isAdmin: true,
    };
  
    const mockProducts = [
      { productId: 1, name: 'Product 1', price: 100 },
    ];
  
    render(
      <AuthContext.Provider value={mockAuthContextValueWithAdmin}>
        <ProductContext.Provider value={{ ...mockProductContextValue, products: mockProducts }}>
         <ProductList isAdmin={mockAuthContextValueWithAdmin.isAdmin} />
        </ProductContext.Provider>
      </AuthContext.Provider>
    );
  
    expect(screen.getByText('Działania')).toBeInTheDocument();
  });
  
});
