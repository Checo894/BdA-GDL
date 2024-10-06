import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Inicio from '../classes/Inicio';
import { NavigationContainer } from '@react-navigation/native';

// Renombramos navigateMock a mockNavigate
const mockNavigate = jest.fn();

beforeEach(() => {
  mockNavigate.mockClear();
});

// Mock de useNavigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe('Inicio Screen', () => {
  it('renders correctly', () => {
    const { getByText, getByRole } = render(
      <NavigationContainer>
        <Inicio />
      </NavigationContainer>
    );

    expect(getByText('¡Únete a la lucha contra el hambre!')).toBeTruthy();
    expect(getByText(/Cada donación marca la diferencia/)).toBeTruthy();
    expect(getByRole('button', { name: 'Empieza Aquí' })).toBeTruthy();
  });

  it('navigates to Register screen when "Empieza Aquí" button is pressed', () => {
    const { getByRole } = render(
      <NavigationContainer>
        <Inicio />
      </NavigationContainer>
    );

    const startButton = getByRole('button', { name: 'Empieza Aquí' });

    fireEvent.press(startButton);

    expect(mockNavigate).toHaveBeenCalledWith('Register');
  });
});
