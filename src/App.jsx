// App.jsx
import { Routes, Route } from 'react-router-dom';
import { EventProvider } from './context/EventContext';
import Home from './pages/Home';
import Calendar from './pages/CalendarPage';
import EditEvent from './pages/EditEvent';
import EventForm from './components/EventForm';
import Layout from './components/Layout';
import ReminderPage from './pages/ReminderPage'; // Agrega esta importación

const App = () => {
  return (
    <EventProvider>
      <Routes>
        <Route element={<Layout />}>
          {/* Rutas dentro del Layout */}
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/edit/:id" element={<EditEvent />} />
          <Route path="/new" element={<EventForm />} />
          <Route path="/reminders" element={<ReminderPage />} /> {/* Agrega esta ruta */}
        </Route>
      </Routes>
    </EventProvider>
  );
};

export default App;
