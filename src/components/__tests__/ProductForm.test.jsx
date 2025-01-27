import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { ProductContext } from '../../context/ProductContext';
import ProductForm from '../ProductForm';

describe('ProductForm Komponent', () => {
    const addProductMock = jest.fn();
    const fetchProductsMock = jest.fn();

    const renderComponent = () =>
        render(
            <ProductContext.Provider value={{ addProduct: addProductMock, fetchProducts: fetchProductsMock }}>
                <ProductForm />
            </ProductContext.Provider>
        );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('wyświetla formularz', () => {
        const { getByPlaceholderText, getByText } = renderComponent();

        expect(getByPlaceholderText('Zdjęcie URL')).not.toBeNull();
        expect(getByPlaceholderText('Nazwa')).not.toBeNull();
        expect(getByPlaceholderText('Opis')).not.toBeNull();
        expect(getByPlaceholderText('Cena')).not.toBeNull();
        expect(getByPlaceholderText('Ilość')).not.toBeNull();
        expect(getByText('Dodaj')).not.toBeNull();
    });

    it('wywołuje addProduct i fetchProducts podczas klikniecia przycisku z wprowadzonymi danymi', async () => {
        addProductMock.mockResolvedValueOnce();

        const { getByPlaceholderText, getByText } = renderComponent();

        fireEvent.change(getByPlaceholderText('Zdjęcie URL'), { target: { value: 'image_url' } });
        fireEvent.change(getByPlaceholderText('Nazwa'), { target: { value: 'Produkt' } });
        fireEvent.change(getByPlaceholderText('Opis'), { target: { value: 'Opis produktu' } });
        fireEvent.change(getByPlaceholderText('Cena'), { target: { value: '100' } });
        fireEvent.change(getByPlaceholderText('Ilość'), { target: { value: '10' } });

        await act(async () => {
            fireEvent.click(getByText('Dodaj'));
        });

        expect(addProductMock).toHaveBeenCalledWith({
            name: 'Produkt',
            description: 'Opis produktu',
            price: '100',
            stock: '10',
            image: 'image_url',
        });

        expect(fetchProductsMock).toHaveBeenCalled();
    });

    it('nie aktualizuje ceny gdy sa wprowadzone nie prawidłowe dane', () => {
        const { getByPlaceholderText } = renderComponent();

        const priceInput = getByPlaceholderText('Cena');
        fireEvent.change(priceInput, { target: { value: '-10' } });

        expect(priceInput.value).toBe('0'); // Invalid value should not be accepted
    });

    it('nie aktualizuje stanu(ilości) gdy sa wprowadzone nie prawidłowe dane', () => {
        const { getByPlaceholderText } = renderComponent();

        const stockInput = getByPlaceholderText('Ilość');
        fireEvent.change(stockInput, { target: { value: '-5' } });

        expect(stockInput.value).toBe('0'); // Invalid value should not be accepted
    });

    it('sprawdza czy wyczysci formularz', () => {
        const { getByPlaceholderText } = renderComponent();

        const priceInput = getByPlaceholderText('Cena');
        const stockInput = getByPlaceholderText('Ilość');

        fireEvent.change(priceInput, { target: { value: '50' } });
        expect(priceInput.value).toBe('50');

        fireEvent.change(stockInput, { target: { value: '20' } });
        expect(stockInput.value).toBe('20');

        fireEvent.change(priceInput, { target: { value: '' } });
        fireEvent.change(stockInput, { target: { value: '' } });

        expect(priceInput.value).toBe('');
        expect(stockInput.value).toBe('');
    });
});
