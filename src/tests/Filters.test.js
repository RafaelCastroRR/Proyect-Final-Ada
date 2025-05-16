import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EventContext } from '../context/EventContext.jsx';
import Filters from '../components/Filters.jsx';

describe('Filters Component', () => {
  const dispatch = jest.fn();
  
  test('should render input and select with correct options', () => {
    render(
      <EventContext.Provider value={{ dispatch }}>
        <Filters />
      </EventContext.Provider>
    );

    // Verifica que el input y el select estén presentes
    expect(screen.getByPlaceholderText('Buscar por título')).toBeInTheDocument();
    
    // Usamos getByRole para obtener el select con el rol "combobox"
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    
    // Verifica que las opciones estén presentes en el select
    expect(screen.getByText('Trabajo')).toBeInTheDocument();
    expect(screen.getByText('Personal')).toBeInTheDocument();
    expect(screen.getByText('Reunión')).toBeInTheDocument();
  });

  test('should handle search input change', () => {
    render(
      <EventContext.Provider value={{ dispatch }}>
        <Filters />
      </EventContext.Provider>
    );

    const input = screen.getByPlaceholderText('Buscar por título');
    fireEvent.change(input, { target: { value: 'Event Title' } });

    expect(input.value).toBe('Event Title');
  });

  test('should dispatch filter event on filter button click', () => {
    render(
      <EventContext.Provider value={{ dispatch }}>
        <Filters />
      </EventContext.Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Buscar por título'), { target: { value: 'Event Title' } });
    
    // Usamos getByRole para obtener el select
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'trabajo' } });

    fireEvent.click(screen.getByText('Filtrar'));

    expect(dispatch).toHaveBeenCalledWith({
      type: 'FILTER_EVENTS',
      payload: { search: 'Event Title', category: 'trabajo' },
    });
  });
});
