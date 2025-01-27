import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import ProductRow from '../ProductRow'; // Ścieżka do komponentu
import { ProductContext } from '../../context/ProductContext';

describe('ProductRow Komponent', () => {
  const mockUpdateProduct = jest.fn();
  const mockDeleteProduct = jest.fn();

  const product = {
    productId: 1,
    name: 'Product 1',
    description: 'Description 1',
    price: '100',
    stock: '10',
    image: 'image.png',
  };

  const renderComponent = (isAdmin = false) =>
    render(
      <ProductContext.Provider
        value={{
          updateProduct: mockUpdateProduct,
          deleteProduct: mockDeleteProduct,
        }}
      >
        <table>
          <tbody>
            <ProductRow product={product} isAdmin={isAdmin} />
          </tbody>
        </table>
      </ProductContext.Provider>
    );

  it('sprawdzenie renderowanie czy wyswietla prawidlowo produkt', () => {
    const { getByText, getByAltText } = renderComponent();
    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('Description 1')).toBeInTheDocument();
    expect(getByText('100')).toBeInTheDocument();
    expect(getByText('10')).toBeInTheDocument();
    expect(getByAltText('Product 1')).toHaveAttribute('src', 'image.png');
  });

  it('powinien włączyć tryb edycji dla użytkownika z odpowiednimi uprawnieniami', () => {
    const { getByText, getByPlaceholderText } = renderComponent(true);

    fireEvent.click(getByText('Edytuj'));
    expect(getByPlaceholderText('nazwa')).toHaveValue('Product 1');
    expect(getByPlaceholderText('opis')).toHaveValue('Description 1');
    expect(getByPlaceholderText('cena')).toHaveValue('100');
    expect(getByPlaceholderText('ilość')).toHaveValue('10');
  });

  it('powinien zaktualizować produkty po wpisaniu do inputa', async () => {
    const { getByText, getByPlaceholderText } = renderComponent(true);

    fireEvent.click(getByText('Edytuj'));
    const nameInput = getByPlaceholderText('nazwa');
    const priceInput = getByPlaceholderText('cena');

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'Updated Product' } });
      fireEvent.change(priceInput, { target: { value: '200' } });
    });

    expect(nameInput).toHaveValue('Updated Product');
    expect(priceInput).toHaveValue('200');
  });

  it('powinien zapobiec nieprawidlowym danym', () => {
    const { getByText, getByPlaceholderText } = renderComponent(true);

    fireEvent.click(getByText('Edytuj'));
    const priceInput = getByPlaceholderText('cena');

    act(() => {
      fireEvent.change(priceInput, { target: { value: '-50' } });
    });
    expect(priceInput).toHaveValue('100'); // Nie zmienia się na niepoprawną wartość

    act(() => {
      fireEvent.change(priceInput, { target: { value: '' } });
    });
    expect(priceInput).toHaveValue(''); // Puste wartości są akceptowane
  });

  it('sprawdzenie czy aktualizuje', async () => {
    const { getByText } = renderComponent(true);

    fireEvent.click(getByText('Edytuj'));
    const saveButton = getByText('Zapisz');

    await act(async () => {
      fireEvent.click(saveButton);
    });

    expect(mockUpdateProduct).toHaveBeenCalledWith(1, expect.objectContaining({
      name: 'Product 1',
      description: 'Description 1',
      price: '100',
      stock: '10',
    }));
  });

  it('should call deleteProduct on delete', async () => {
    const { getByText } = renderComponent(true);
    const deleteButton = getByText('Usuń');

    await act(async () => {
      fireEvent.click(deleteButton);
    });

    expect(mockDeleteProduct).toHaveBeenCalledWith(1);
  });


  it('should update description on input change', () => {
    const { getByText, getByPlaceholderText } = renderComponent(true);

    fireEvent.click(getByText('Edytuj'));
    const descriptionInput = getByPlaceholderText('opis');

    act(() => {
      fireEvent.change(descriptionInput, { target: { value: 'Updated Description' } });
    });

    expect(descriptionInput).toHaveValue('Updated Description');
  });

  it('should update stock with valid values or empty string', () => {
    const { getByText, getByPlaceholderText } = renderComponent(true);

    fireEvent.click(getByText('Edytuj'));
    const stockInput = getByPlaceholderText('ilość');

    // Valid value
    act(() => {
      fireEvent.change(stockInput, { target: { value: '20' } });
    });
    expect(stockInput).toHaveValue('20');

    act(() => {
      fireEvent.change(stockInput, { target: { value: '' } });
    });
    expect(stockInput).toHaveValue('');

    // Invalid value (negative number)
    act(() => {
      fireEvent.change(stockInput, { target: { value: '-5' } });
    });
    expect(stockInput).toHaveValue(''); // Should not accept invalid value
  });

  it('should not update stock with invalid value', () => {
    const { getByText, getByPlaceholderText } = renderComponent(true);

    fireEvent.click(getByText('Edytuj'));
    const stockInput = getByPlaceholderText('ilość');

    act(() => {
      fireEvent.change(stockInput, { target: { value: '-10' } });
    });
    expect(stockInput).toHaveValue('10'); // Remains unchanged if invalid value is provided
  });
});
