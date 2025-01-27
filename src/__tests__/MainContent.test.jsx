import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainContent from '../MainContent';
import { AuthContext } from '../context/AuthContext';
import { ProductProvider } from '../context/ProductContext';

describe('MainContent', () => {
  test('pokazuje formularz logowania, gdy użytkownik nie jest zalogowany', () => {
    render(
      <AuthContext.Provider value={{ loggedIn: false, isAdmin: false }}>
        <MainContent />
      </AuthContext.Provider>
    );

    expect(screen.getByText(/Logowanie/i)).toBeInTheDocument();
  });

  test('wyświetla listę produktów, gdy użytkownik jest zalogowany (bez uprawnień admina)', () => {
    render(
      <AuthContext.Provider value={{ loggedIn: true, isAdmin: false }}>
        <ProductProvider>
          <MainContent />
        </ProductProvider>
      </AuthContext.Provider>
    );

    expect(screen.getByText(/Witamy w Atomic Store!/i)).toBeInTheDocument();
    expect(screen.queryByText(/Dodaj nowy produkt/i)).not.toBeInTheDocument();
  });

  test('wyświetla formularz dodawania produktu, gdy użytkownik jest adminem', () => {
    render(

      <AuthContext.Provider value={{ loggedIn: true, isAdmin: true }}>
        <ProductProvider>
          <MainContent />
        </ProductProvider>
      </AuthContext.Provider>
    );

    expect(screen.getByText(/Dodaj nowy produkt/i)).toBeInTheDocument();
  });
});
