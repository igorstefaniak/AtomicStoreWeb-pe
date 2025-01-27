import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../LoginForm';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import userFixture from '../LoginFormFixture';
// Mockujemy axios
jest.mock('axios');

describe('LoginForm Komponent', () => {
    const mockLogin = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        console.error.mockRestore(); 
    });

    it('wyświetla blad przy udanym logowaniu', async () => {
        axios.get.mockResolvedValue({
            data: {
                status: 'success',
                user: { username: 'user', role: 'USER' },
            },
        });

        render(
            <AuthContext.Provider value={{ login: mockLogin }}>
                <LoginForm />
            </AuthContext.Provider>
        );

        fireEvent.change(screen.getByPlaceholderText('Nazwa użytkownika'), { target: { value: userFixture.username } });
        fireEvent.change(screen.getByPlaceholderText('Hasło'), { target: { value: userFixture.password } });

        fireEvent.click(screen.getByText('Zaloguj się'));

        await screen.findByText('Logowanie');

        expect(mockLogin).toHaveBeenCalledWith({ username: 'user', password: 'a' }, 'USER');
    });

    it('wyświetla blad przy nieudanym logowaniu', async () => {
        axios.get.mockResolvedValue({
            data: {
                status: 'error',
            },
        });

        render(
            <AuthContext.Provider value={{ login: mockLogin }}>
                <LoginForm />
            </AuthContext.Provider>
        );

        fireEvent.change(screen.getByPlaceholderText('Nazwa użytkownika'), { target: { value: 'wronguser' } });
        fireEvent.change(screen.getByPlaceholderText('Hasło'), { target: { value: 'wrongpassword' } });

        fireEvent.click(screen.getByText('Zaloguj się'));

        await screen.findByText('Logowanie');

        expect(mockLogin).not.toHaveBeenCalled();
    });

    it('wyświetla blad przy błędzie żądania', async () => {
        axios.get.mockRejectedValue(new Error('Błąd logowania:'));

        render(
            <AuthContext.Provider value={{ login: mockLogin }}>
                <LoginForm />
            </AuthContext.Provider>
        );

        fireEvent.change(screen.getByPlaceholderText('Nazwa użytkownika'), { target: { value: 'user' } });
        fireEvent.change(screen.getByPlaceholderText('Hasło'), { target: { value: 'a' } });

        fireEvent.click(screen.getByText('Zaloguj się'));

        await screen.findByText('Logowanie');

        expect(mockLogin).not.toHaveBeenCalled();
    });
});
