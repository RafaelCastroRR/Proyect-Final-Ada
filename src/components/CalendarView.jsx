import { useContext, useState } from 'react';
import { EventContext } from '../context/EventContext';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box, Text, VStack, Badge, useColorModeValue } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const CalendarView = () => {
  const { state } = useContext(EventContext);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const eventsForDate = state.events.filter(
    event => event.date === selectedDate.toISOString().split('T')[0]
  );

  const eventColor = useColorModeValue('teal.500', 'teal.300');
  const tileBgColor = useColorModeValue('teal.50', 'teal.700');
  const tileHoverColor = useColorModeValue('teal.100', 'teal.600');

  return (
    <Box>
      <Box
        overflow="auto"
        p={4}
        border="1px solid"
        borderColor="teal.200"
        borderRadius="lg"
        boxShadow="md"
        width="100%"
        bg="white"
      >
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          nextLabel={<ChevronRightIcon boxSize={6} color="teal.600" />}
          prevLabel={<ChevronLeftIcon boxSize={6} color="teal.600" />}
          tileContent={({ date }) => {
            const dateStr = date.toISOString().split('T')[0];
            const hasEvent = state.events.some(event => event.date === dateStr);
            return hasEvent ? (
              <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
                <Badge colorScheme="teal" variant="solid" fontSize="0.6rem" px={1}>
                  Evento
                </Badge>
              </Box>
            ) : null;
          }}
          tileClassName={({ date }) => {
            const dateStr = date.toISOString().split('T')[0];
            const hasEvent = state.events.some(event => event.date === dateStr);
            return hasEvent ? 'chakra-calendar-event' : '';
          }}
        />
      </Box>

      <Box mt={6}>
        <Text fontSize="xl" fontWeight="bold" color="teal.700">
          Eventos para {selectedDate.toLocaleDateString()}:
        </Text>
        {eventsForDate.length === 0 ? (
          <Text mt={2} color="gray.500">
            No hay eventos para esta fecha.
          </Text>
        ) : (
          <VStack align="start" spacing={3} mt={3}>
            {eventsForDate.map(event => (
              <Box
                key={event.id}
                p={3}
                borderWidth="1px"
                borderRadius="md"
                w="100%"
                bg={useColorModeValue('gray.50', 'gray.700')}
                _hover={{ bg: useColorModeValue('gray.100', 'gray.600') }}
                transition="background-color 0.3s ease"
              >
                <Text fontWeight="bold" color="teal.800">{event.title}</Text>
                <Text fontSize="sm" color="gray.600">
                  {event.time} - {event.category}
                </Text>
              </Box>
            ))}
          </VStack>
        )}
      </Box>

      <style>{`
  .react-calendar {
    width: 100%;
    border: none;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  .react-calendar__tile {
    padding: 0.5rem;
    font-size: 1rem; /* Más grande para mejor visibilidad */
    color: #2D3748; /* gris oscuro para mejor contraste */
  }
  .react-calendar__tile--active {
    background: teal;
    color: white;
    border-radius: 0.5rem;
  }
  .has-event {
    background: rgba(56, 178, 172, 0.2);
    border-radius: 0.5rem;
    color: #2D3748; /* asegura que texto sea visible en fondo claro */
  }
  .has-event:hover {
    background: rgba(56, 178, 172, 0.4);
  }
  .react-calendar__navigation button {
    color: teal;
    font-weight: bold;
  }
`}</style>

    </Box>
  );
};

export default CalendarView;
