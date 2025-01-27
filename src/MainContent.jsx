import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import LoginForm from './components/LoginForm';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';


const MainContent = () => {
    const { loggedIn, isAdmin } = useContext(AuthContext);

    return (
        <div className="main-content">
            {!loggedIn ? (
                <LoginForm />
            ) : (
                <ProductProvider>
                    <h2>Witamy w Atomic Store!</h2>
                    <ProductList isAdmin={isAdmin} />
                    {isAdmin && <ProductForm />}
                </ProductProvider>
            )}
        </div>
    );
};
export default MainContent;