import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../App';

describe('App Navigation', () => {
  it('navigates to Register screen when "Empieza Aquí" is pressed', () => {
    const { getByText } = render(<App />);
    
    // Verificar que estamos en la pantalla 'Inicio'
    expect(getByText('Inicio')).toBeTruthy();
    
    // Simular la pulsación del botón 'Empieza Aquí'
    fireEvent.press(getByText('Empieza Aquí'));
    
    // Esperar a que la pantalla 'Register' se renderice
    expect(getByText('Registro')).toBeTruthy();
  });
});
