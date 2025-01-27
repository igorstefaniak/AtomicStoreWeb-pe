import React from 'react';
import { render, act } from '@testing-library/react';
import { AuthContext, AuthProvider } from '../AuthContext';

describe('AuthProvider', () => {
    test('login() aktualizuje stan - obiekt uzytkownika', async () => {
        let contextValue;

        render(
            <AuthProvider>
                <AuthContext.Consumer>
                    {(value) => {
                        contextValue = value;
                        return null;
                    }}
                </AuthContext.Consumer>
            </AuthProvider>
        );

        expect(contextValue.loggedIn).toBe(false);

        await act(async () => {
            contextValue.login({ username: 'testUser', password: 'testPass' }, 'ADMIN');
        });

        expect(contextValue.loggedIn).toBe(true);
        expect(contextValue.isAdmin).toBe(true);
        expect(contextValue.username).toBe('testUser');
    });

    test('logout() resetuje stan - obiekt uzytkownika', async () => {
        let contextValue;

        render(
            <AuthProvider>
                <AuthContext.Consumer>
                    {(value) => {
                        contextValue = value;
                        return null;
                    }}
                </AuthContext.Consumer>
            </AuthProvider>
        );

        await act(async () => {
            contextValue.login({ username: 'testUser', password: 'testPass' }, 'ADMIN');
        });

        await act(async () => {
            contextValue.logout();
        });

        expect(contextValue.loggedIn).toBe(false);
        expect(contextValue.isAdmin).toBe(false);
        expect(contextValue.username).toBe('');
    });
});
