import React, { useContext, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import '../App.css';
import cap from '../assets/cap.png';
const ProductRow = ({ product, isAdmin }) => {
    const { updateProduct, deleteProduct } = useContext(ProductContext);
    const [editing, setEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState(product);

    const handleSave = async () => {
        try {
            await updateProduct(product.productId, editedProduct);
            setEditing(false);
            fetchProduct();
        }
        catch (error) {
        }
    };
    const handleDelete = async () => {
        try {
            await deleteProduct(product.productId)
            fetchProduct();
        } catch (error) {
        }
    };
    return (
        <tr>
            <td>
                <img src={product.image} alt={product.name} width="75" />
            </td>
            <td>
                {editing ? (
                    <input placeholder='nazwa'
                        value={editedProduct.name}
                        onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                    />
                ) : (
                    product.name
                )}
            </td>
            <td>
                {editing ? (
                    <input placeholder='opis'
                        min="0"
                        value={editedProduct.description}
                        onChange={(e) =>
                            setEditedProduct({ ...editedProduct, description: e.target.value })
                        }
                    />
                ) : (
                    product.description
                )}
            </td>
            <td>
                {editing ? (
                    <input placeholder='cena'
                        min="0"
                        value={editedProduct.price}
                        onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            if (value >= 0 || e.target.value === "") {
                                setEditedProduct({ ...editedProduct, price: e.target.value });
                            }
                        }}
                    />
                ) : (
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div>{product.price}</div>
                    <img src={cap} style={{width: '30px'}}></img>
                    </div>
                    
                )}
            </td>
            <td>
                {editing ? (
                    <input placeholder='ilość'
                        value={editedProduct.stock}
                        onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            if (value >= 0 || e.target.value === "") {
                                setEditedProduct({ ...editedProduct, stock: e.target.value });
                            }
                        }}
                    />
                ) : (
                    product.stock
                )}
            </td>
            {isAdmin && (
                <td>
                    {editing ? (
                        <button onClick={handleSave}>Zapisz</button>
                    ) : (
                        <button onClick={() => setEditing(true)}>Edytuj</button>
                    )}
                    <button onClick={handleDelete}>Usuń</button>
                </td>
            )}
        </tr>
    );
};

export default ProductRow;
