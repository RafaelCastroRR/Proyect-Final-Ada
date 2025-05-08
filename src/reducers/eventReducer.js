export const initialState = {
  events: [],
  reminders: [],
  filteredEvents: null,
};

export const eventReducer = (state, action) => {
  switch (action.type) {
    // Eventos
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] };
      
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.id ? action.payload : event
        ),
      };
      
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload),
      };

    case 'TOGGLE_COMPLETE':
      return {
        ...state,
        events: state.events.map(e =>
          e.id === action.payload ? { ...e, completed: !e.completed } : e
        ),
      };

    case 'FILTER_EVENTS':
      const { search, category } = action.payload;
      const filteredEvents = state.events.filter(e =>
        (search === '' || e.title.toLowerCase().includes(search.toLowerCase())) &&
        (category === '' || e.category === category)
      );
      return {
        ...state,
        filteredEvents: filteredEvents.length > 0 ? filteredEvents : null,
      };

    case 'CLEAR_FILTERS':
      return { ...state, filteredEvents: null };

    // Recordatorios
    case 'ADD_REMINDER':
      return {
        ...state,
        reminders: [...state.reminders, action.payload],
      };

    case 'REMOVE_REMINDER':
      return {
        ...state,
        reminders: state.reminders.filter(reminder => reminder.id !== action.payload),
      };

    case 'UPDATE_REMINDER':
      return {
        ...state,
        reminders: state.reminders.map(reminder =>
          reminder.id === action.payload.id ? action.payload : reminder
        ),
      };

    // Cargar eventos y recordatorios desde el localStorage
    case 'LOAD_EVENTS':
      return { ...state, events: action.payload };

    case 'LOAD_REMINDERS':
      return { ...state, reminders: action.payload };

    default:
      return state;
  }
};
