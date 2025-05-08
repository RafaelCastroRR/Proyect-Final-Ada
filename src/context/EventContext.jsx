import React, { createContext, useReducer, useEffect } from 'react';
import { eventReducer } from '../reducers/eventReducer';

const initialState = {
  events: [],
  filteredEvents: null,
  reminders: [],
};

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  // Recuperar los eventos y recordatorios desde el localStorage cuando la aplicación se carga
  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    const storedReminders = localStorage.getItem('reminders');
    
    if (storedEvents) {
      dispatch({ type: 'LOAD_EVENTS', payload: JSON.parse(storedEvents) });
    }
    
    if (storedReminders) {
      dispatch({ type: 'LOAD_REMINDERS', payload: JSON.parse(storedReminders) });
    }
  }, []);

  // Guardar eventos y recordatorios en el localStorage cuando cambien
  useEffect(() => {
    if (state.events.length > 0) {
      localStorage.setItem('events', JSON.stringify(state.events));
    }
  }, [state.events]);

  useEffect(() => {
    if (state.reminders.length > 0) {
      localStorage.setItem('reminders', JSON.stringify(state.reminders));
    }
  }, [state.reminders]);

  return (
    <EventContext.Provider value={{ state, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};
