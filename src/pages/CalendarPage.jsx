import CalendarView from '../components/CalendarView';
import { Box, Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const CalendarPage = () => (
  <Box 
    p={4}
    minHeight="100vh"
    width="100%"
    bg="gray.50"
    display="flex"
    justifyContent="center"
    alignItems="flex-start"
  >
    <Box 
      width="100%" 
      maxWidth="1200px" 
      p={6} 
      borderRadius="md" 
      boxShadow="lg" 
      bg="white"
    >
      <Heading mb={6} textAlign="center" color="teal.600">
        Vista de Calendario
      </Heading>
      <Link 
        as={RouterLink} 
        to="/" 
        display="block" 
        mb={4} 
        textAlign="center" 
        color="teal.500" 
        fontWeight="bold"
      >
        Volver a la Lista
      </Link>
      <Box width="100%">
        <CalendarView />
      </Box>
    </Box>
  </Box>
);

export default CalendarPage;
