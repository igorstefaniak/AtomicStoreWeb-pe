import React from 'react';
import { AuthProvider} from './context/AuthContext';
import './App.css';
import MainContent from './MainContent';

const AppHeader = () => (
    <header className="app-header">
        <h1>Atomic Store</h1>
    </header>
);

const App = () => {
    return (
        <AuthProvider>
            <div className="app-container">
                <AppHeader />
                <MainContent />
            </div>
        </AuthProvider>
    );
};

export default App;