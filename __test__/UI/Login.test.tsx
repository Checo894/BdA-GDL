import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import Login from '../../screens/Login';
import { Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NavigationContainer } from '@react-navigation/native';

// Mock de useNavigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

// Mock de Alert.alert
jest.spyOn(Alert, 'alert');

describe('Login Screen', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Login />);

    expect(getByText('Inicio de Sesión')).toBeTruthy();
    expect(getByText('Usuario')).toBeTruthy();
    expect(getByPlaceholderText('Correo electrónico')).toBeTruthy();
    expect(getByText('Contraseña')).toBeTruthy();
    expect(getByPlaceholderText('Contraseña')).toBeTruthy();
    expect(getByText('Ingresa')).toBeTruthy();
  });

  it('logs in a user successfully', async () => {
    // Mock de signInWithEmailAndPassword para que resuelva correctamente
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({
      user: { uid: 'test-uid' },
    });

    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    );

    const emailInput = getByPlaceholderText('Correo electrónico');
    const passwordInput = getByPlaceholderText('Contraseña');
    const loginButton = getByText('Ingresa');

    // Simular entrada de texto
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    // Simular presionar el botón
    await act(async () => {
      fireEvent.press(loginButton);
    });

    // Verificar que se llamó a signInWithEmailAndPassword
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(), // auth object
      'test@example.com',
      'password123'
    );

    // Verificar que se muestra la alerta de inicio de sesión exitoso
    expect(Alert.alert).toHaveBeenCalledWith(
      'Inicio de sesión exitoso',
      '¡Bienvenido de nuevo!'
    );
  });

  it('handles login error', async () => {
    // Simular que signInWithEmailAndPassword lanza un error
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce({
      message: 'Error al iniciar sesión',
    });

    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    );

    const emailInput = getByPlaceholderText('Correo electrónico');
    const passwordInput = getByPlaceholderText('Contraseña');
    const loginButton = getByText('Ingresa');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'wrongpassword');

    await act(async () => {
      fireEvent.press(loginButton);
    });

    // Verificar que se muestra la alerta de error
    expect(Alert.alert).toHaveBeenCalledWith(
      'Error al iniciar sesión',
      'Error al iniciar sesión'
    );
  });
});
