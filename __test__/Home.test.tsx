import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import Home from '../classes/Home';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { NavigationContainer } from '@react-navigation/native';

// Mock de Firebase Auth
jest.mock('firebase/auth', () => {
  const actualAuth = jest.requireActual('firebase/auth');
  return {
    ...actualAuth,
    getAuth: jest.fn(() => ({
      currentUser: { uid: 'test-uid' },
    })),
    onAuthStateChanged: jest.fn((auth, callback) => {
      return jest.fn();
    }),
    signOut: jest.fn(() => Promise.resolve()),
  };
});

// Mock de useNavigation
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe('Home Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    const mockOnAuthStateChanged = (onAuthStateChanged as jest.Mock);

    const { getByText, getByPlaceholderText } = render(
      <NavigationContainer>
        <Home />
      </NavigationContainer>
    );

    // Simular que el usuario está autenticado
    await act(async () => {
      const callback = mockOnAuthStateChanged.mock.calls[0][1];
      callback({ uid: 'test-uid' });
    });

    // Verificar elementos
    expect(getByPlaceholderText('Search')).toBeTruthy();
    expect(getByText('Recomendado')).toBeTruthy();
    expect(getByText('Productos')).toBeTruthy();
    expect(getByText('Cerrar sesión')).toBeTruthy();
  });

  it('handles sign out correctly', async () => {
    const mockOnAuthStateChanged = (onAuthStateChanged as jest.Mock);

    const { getByText } = render(
      <NavigationContainer>
        <Home />
      </NavigationContainer>
    );

    // Simular que el usuario está autenticado
    await act(async () => {
      const callback = mockOnAuthStateChanged.mock.calls[0][1];
      callback({ uid: 'test-uid' });
    });

    const signOutButton = getByText('Cerrar sesión');

    await act(async () => {
      fireEvent.press(signOutButton);
    });

    // Verificar que signOut fue llamado
    expect(signOut).toHaveBeenCalled();

    // Verificar que se navegó a 'Inicio' después de cerrar sesión
    expect(mockNavigate).toHaveBeenCalledWith('Inicio');
  });

  it('updates isLoggedIn state based on auth state', async () => {
    const mockOnAuthStateChanged = (onAuthStateChanged as jest.Mock);

    const { queryByText } = render(
      <NavigationContainer>
        <Home />
      </NavigationContainer>
    );

    // Simular que el usuario no está autenticado
    await act(async () => {
      const callback = mockOnAuthStateChanged.mock.calls[0][1];
      callback(null);
    });

    // Esperar a que el componente se actualice
    await waitFor(() => {
      expect(queryByText('Cerrar sesión')).toBeNull();
    });
  });
});
