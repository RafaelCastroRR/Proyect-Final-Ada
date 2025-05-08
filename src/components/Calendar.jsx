import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box, Text, List, ListItem } from '@chakra-ui/react';
import { useContext } from 'react';
import { EventContext } from '../context/EventContext';

const CalendarPage = () => {
  const { state } = useContext(EventContext);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDateStr = selectedDate.toISOString().slice(0, 10);
  const eventsForDay = state.events.filter(e => e.date === selectedDateStr);

  return (
    <Box>
      <Calendar value={selectedDate} onChange={setSelectedDate} />
      <Box mt={4}>
        <Text fontWeight="bold">Eventos para {selectedDateStr}:</Text>
        <List spacing={2}>
          {eventsForDay.length === 0 ? (
            <Text>No hay eventos.</Text>
          ) : (
            eventsForDay.map(ev => (
              <ListItem key={ev.id}>
                {ev.time} - {ev.title} ({ev.category})
              </ListItem>
            ))
          )}
        </List>
      </Box>
    </Box>
  );
};

export default CalendarPage;
