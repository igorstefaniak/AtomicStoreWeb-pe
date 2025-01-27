import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const { authHeader } = useContext(AuthContext);
    const [products, setProducts] = useState([]);

    const fetchProducts = () => {
        axios
            .get('http://localhost:8080/api/private/users/products', {
                ...authHeader
            })
            .then((response) => setProducts(response.data));
    };

    const addProduct = (product) => {
        axios
            .post(
                'http://localhost:8080/api/private/admin/product',
                {},
                { ...authHeader, params: product }
            )
    };

    const updateProduct = (id, product) => {
        axios
            .put(
                `http://localhost:8080/api/private/admin/product/${id}`,
                {},
                { ...authHeader, params: product }
            )
    };

    const deleteProduct = (id) => {
        axios
            .delete(`http://localhost:8080/api/private/admin/product/${id}`, authHeader)
            .then(() => setProducts((prev) => prev.filter((p) => p.productId !== id)));
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                fetchProducts,
                addProduct,
                updateProduct,
                deleteProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
