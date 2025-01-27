import React from 'react';
import { render, act } from '@testing-library/react';
import { ProductProvider, ProductContext } from '../ProductContext';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

jest.mock('axios');

describe('ProductProvider', () => {
    let mockAuthHeader;

    beforeEach(() => {
        mockAuthHeader = { headers: { Authorization: 'Bearer mock-token' } };
        jest.clearAllMocks();
    });

    const renderWithAuthProvider = (ui) => {
        return render(
            <AuthContext.Provider value={{ authHeader: mockAuthHeader }}>
                <ProductProvider>{ui}</ProductProvider>
            </AuthContext.Provider>
        );
    };

    it('sprawdzenie czy pobrano(fetch) produkty', async () => {
        const mockProducts = [{ productId: 1, name: 'Product A' }];
        axios.get.mockResolvedValueOnce({ data: mockProducts });

        let context;
        renderWithAuthProvider(
            <ProductContext.Consumer>
                {(value) => {
                    context = value;
                    return null;
                }}
            </ProductContext.Consumer>
        );

        await act(async () => {
            await context.fetchProducts();
        });

        expect(axios.get).toHaveBeenCalledWith(
            'http://localhost:8080/api/private/users/products',
            mockAuthHeader
        );
        expect(context.products).toEqual(mockProducts);
    });

    it('sprawdzenie czy dodawanie produktu działa', async () => {
        const newProduct = { name: 'Product B' };
        axios.post.mockResolvedValueOnce();

        let context;
        renderWithAuthProvider(
            <ProductContext.Consumer>
                {(value) => {
                    context = value;
                    return null;
                }}
            </ProductContext.Consumer>
        );

        await act(async () => {
            await context.addProduct(newProduct);
        });

        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:8080/api/private/admin/product',
            {},
            { ...mockAuthHeader, params: newProduct }
        );
    });

    it('sprawdzenie czy aktualizacja produktu działa', async () => {
        const updatedProduct = { name: 'Updated Product A' };
        axios.put.mockResolvedValueOnce();

        let context;
        renderWithAuthProvider(
            <ProductContext.Consumer>
                {(value) => {
                    context = value;
                    return null;
                }}
            </ProductContext.Consumer>
        );

        await act(async () => {
            await context.updateProduct(1, updatedProduct);
        });

        expect(axios.put).toHaveBeenCalledWith(
            'http://localhost:8080/api/private/admin/product/1',
            {},
            { ...mockAuthHeader, params: updatedProduct }
        );
    });

    it('sprawdzenie czy usuwanie produktu działa', async () => {

        const productIdToDelete = 1;
        axios.delete.mockResolvedValueOnce();

        let context;
        renderWithAuthProvider(
            <ProductContext.Consumer>
                {(value) => {
                    context = value;
                    return null;
                }}
            </ProductContext.Consumer>
        );

        await act(async () => {
            await context.deleteProduct(productIdToDelete); // Wywołanie funkcji usuwania produktu
        });

        expect(axios.delete).toHaveBeenCalledWith(
            `http://localhost:8080/api/private/admin/product/${productIdToDelete}`,
            mockAuthHeader
        );
    });
});
