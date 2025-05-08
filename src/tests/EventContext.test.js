import React from 'react';
import { render } from '@testing-library/react';
import { EventProvider, EventContext } from '../context/EventContext'; // ajusta la ruta si está en otro lugar

test('el estado inicial debe tener eventos y recordatorios vacíos', () => {
  let contextValue;
  
  render(
    <EventProvider>
      <EventContext.Consumer>
        {value => {
          contextValue = value;
          return null;
        }}
      </EventContext.Consumer>
    </EventProvider>
  );

  expect(contextValue.state.events).toEqual([]);
  expect(contextValue.state.reminders).toEqual([]);
  expect(contextValue.state.filteredEvents).toBeNull();
});
