import React, { useState, useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

const ProductForm = () => {
    const { addProduct, fetchProducts } = useContext(ProductContext);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        image: '',
    });

    const handleAdd = async () => {
        try {
            await addProduct(newProduct); // Wait for addUser to complete
            setNewProduct({ name: '', description: '', price: 0, stock: 0, image: '' });
            fetchProducts(); // Fetch the updated list of users immediately after
        } catch (error) {
        }
    };

    return (
        <div>
            <h2>Dodaj nowy produkt</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Zdjęcie</th>
                        <th>Nazwa</th>
                        <th>Opis</th>
                        <th>Cena</th>
                        <th>Ilość</th>
                        <th>Działania</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input
                                type="text"
                                placeholder="Zdjęcie URL"
                                value={newProduct.image}
                                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                            />
                        </td>
                    
                    <td>
                        <input
                            type="text"
                            placeholder="Nazwa"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                    </td>
                    <td>
                        <input
                        type="text"
                        placeholder="Opis"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    /></td>
                    <td>
                        <input
                            type="number"
                            min="0"
                            placeholder="Cena"
                            value={newProduct.price}
                            onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                if (value >= 0 || e.target.value === "") {
                                    setNewProduct({ ...newProduct, price: e.target.value });
                                }
                            }}
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            placeholder="Ilość"
                            min="0"
                            value={newProduct.stock}
                            onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                if (value >= 0 || e.target.value === "") {
                                    setNewProduct({ ...newProduct, stock: e.target.value });
                                }
                            }}
                        />
                    </td>
                    <td>
                        <button onClick={handleAdd}>Dodaj</button>
                        </td></tr>
                </tbody>
            </table>
        </div>
    );
};

export default ProductForm;
