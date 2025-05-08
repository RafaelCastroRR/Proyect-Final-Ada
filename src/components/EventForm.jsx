import { useState, useContext, useEffect } from 'react';
import { EventContext } from '../context/EventContext';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useToast,
  InputGroup,
  useBreakpointValue,
  FormHelperText,
  Text,
  HStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const EventForm = ({ initialData }) => {
  const { dispatch } = useContext(EventContext);
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    date: '',
    time: '',
    category: 'personal',
    completed: false,
  });

  // Cargar eventos desde localStorage al iniciar
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Guardar eventos en localStorage
  const saveEventsToLocalStorage = (events) => {
    localStorage.setItem('events', JSON.stringify(events));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let events = JSON.parse(localStorage.getItem('events')) || []; // Cargar eventos del localStorage

    if (initialData) {
      // Editar evento
      const updatedEvents = events.map((event) =>
        event.id === formData.id ? formData : event
      );
      saveEventsToLocalStorage(updatedEvents);
      dispatch({ type: 'UPDATE_EVENT', payload: formData });

      toast({
        title: 'Evento actualizado.',
        description: 'El evento ha sido actualizado correctamente.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      // Nuevo evento
      const newEvent = { ...formData, id: uuidv4() };
      const updatedEvents = [...events, newEvent];
      saveEventsToLocalStorage(updatedEvents);
      dispatch({
        type: 'ADD_EVENT',
        payload: newEvent,
      });

      toast({
        title: 'Evento creado.',
        description: 'El evento ha sido creado correctamente.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }

    navigate('/');
  };

  const handleCancel = () => {
    setFormData({
      id: '',
      title: '',
      date: '',
      time: '',
      category: 'personal',
      completed: false,
    });
    navigate('/');
  };

  return (
    <Box
      maxW="lg"
      mx="auto"
      p={8}
      bg="white"
      borderRadius="xl"
      boxShadow="lg"
      border="1px"
      borderColor="gray.200"
      position="relative"
    >
      <Text fontSize="2xl" fontWeight="semibold" color="teal.600" mb={4} textAlign="center">
        {initialData ? 'Editar Evento' : 'Crear Evento'}
      </Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          {/* Título */}
          <FormControl isRequired>
            <FormLabel fontWeight="medium" color="teal.600" fontSize="lg">
              Título del Evento
            </FormLabel>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Introduce el título del evento"
              borderColor="teal.300"
              _focus={{ borderColor: 'teal.500' }}
              fontSize="md"
            />
          </FormControl>

          {/* Fecha */}
          <FormControl isRequired>
            <FormLabel fontWeight="medium" color="teal.600" fontSize="lg">
              Fecha del Evento
            </FormLabel>
            <InputGroup>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                borderColor="teal.300"
                _focus={{ borderColor: 'teal.500' }}
                fontSize="md"
              />
            </InputGroup>
          </FormControl>

          {/* Hora */}
          <FormControl isRequired>
            <FormLabel fontWeight="medium" color="teal.600" fontSize="lg">
              Hora del Evento
            </FormLabel>
            <Input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              borderColor="teal.300"
              _focus={{ borderColor: 'teal.500' }}
              fontSize="md"
            />
          </FormControl>

          {/* Categoría */}
          <FormControl isRequired>
            <FormLabel fontWeight="medium" color="teal.600" fontSize="lg">
              Categoría
            </FormLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              borderColor="teal.300"
              _focus={{ borderColor: 'teal.500' }}
              fontSize="md"
            >
              <option value="trabajo">Trabajo</option>
              <option value="personal">Personal</option>
              <option value="reunion">Reunión</option>
            </Select>
            <FormHelperText color="teal.500" fontSize="sm">
              Selecciona una categoría que se ajuste al evento.
            </FormHelperText>
          </FormControl>

          {/* Botones de acción */}
          <HStack justify="space-between" width="full">
            <Button
              type="submit"
              colorScheme="teal"
              width="48%"
              size={useBreakpointValue({ base: 'md', md: 'lg' })}
              fontSize={useBreakpointValue({ base: 'md', md: 'lg' })}
              fontWeight="bold"
              _hover={{ bg: 'teal.600' }}
              _active={{ bg: 'teal.700' }}
              boxShadow="md"
            >
              {initialData ? 'Actualizar Evento' : 'Crear Evento'}
            </Button>
            <Button
              onClick={handleCancel}
              colorScheme="red"
              width="48%"
              size={useBreakpointValue({ base: 'md', md: 'lg' })}
              fontSize={useBreakpointValue({ base: 'md', md: 'lg' })}
              fontWeight="bold"
              _hover={{ bg: 'red.600' }}
              _active={{ bg: 'red.700' }}
              boxShadow="md"
            >
              Cancelar
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export default EventForm;
