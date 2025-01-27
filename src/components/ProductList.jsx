import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductRow from './ProductRow';
import '../App.css'

const ProductList = ({ isAdmin }) => {
    const { products, fetchProducts } = useContext(ProductContext);
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);
    

    return (
        <div>
            <h2>Lista Produktów</h2>
            <button onClick={fetchProducts}>Odśwież</button>
            {products.length === 0 ? (
                <p>Brak produktów!</p>
            ) : (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Zdjęcie</th>
                            <th>Nazwa</th>
                            <th>Opis</th>
                            <th>Cena</th>
                            <th>Ilość</th>
                            {isAdmin && <th>Działania</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <ProductRow key={product.productId} product={product} isAdmin={isAdmin} />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
    
};

export default ProductList;
