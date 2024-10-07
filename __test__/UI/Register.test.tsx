import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import Register from '../../screens/Register';
import { Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
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

// Mock de Alert
jest.spyOn(Alert, 'alert');

describe('Register Screen', () => {
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Register />);

    expect(getByText('Registro')).toBeTruthy();
    expect(getByText('Usuario')).toBeTruthy();
    expect(getByPlaceholderText('Correo electrónico')).toBeTruthy();
    expect(getByText('Contraseña')).toBeTruthy();
    expect(getByPlaceholderText('Contraseña')).toBeTruthy();
    expect(getByText('¿Ya tienes cuenta?')).toBeTruthy();
    expect(getByText('Regístrate')).toBeTruthy();
  });

  it('registers a user successfully', async () => {
    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <Register />
      </NavigationContainer>
    );

    const emailInput = getByPlaceholderText('Correo electrónico');
    const passwordInput = getByPlaceholderText('Contraseña');
    const registerButton = getByText('Regístrate');

    // Simular entrada de texto
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    // Simular presionar el botón
    await act(async () => {
      fireEvent.press(registerButton);
    });

    // Verificar que se llamó a createUserWithEmailAndPassword
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      'test@example.com',
      'password123'
    );

    // Verificar que se muestra la alerta de registro exitoso
    expect(Alert.alert).toHaveBeenCalledWith(
      'Registro exitoso',
      '¡Usuario registrado correctamente!'
    );
  });

  it('handles registration error', async () => {
    // Simular que createUserWithEmailAndPassword lanza un error
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValueOnce({
      message: 'Error al registrar',
    });

    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <Register />
      </NavigationContainer>
    );

    const emailInput = getByPlaceholderText('Correo electrónico');
    const passwordInput = getByPlaceholderText('Contraseña');
    const registerButton = getByText('Regístrate');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    await act(async () => {
      fireEvent.press(registerButton);
    });

    // Verificar que se muestra la alerta de error
    expect(Alert.alert).toHaveBeenCalledWith(
      'Error al registrarse',
      'Error al registrar'
    );
  });
});
