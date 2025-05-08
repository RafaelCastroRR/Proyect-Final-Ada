import { Box, Heading, Button, Alert, AlertIcon, AlertTitle, AlertDescription, VStack, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AddIcon } from '@chakra-ui/icons';
import EventList from '../components/EventList';
import { useState } from 'react';

const Home = () => {
  // Estado de los recordatorios
  const [reminders, setReminders] = useState(() => {
    const savedReminders = localStorage.getItem('reminders');
    return savedReminders ? JSON.parse(savedReminders) : [];
  });

  // Estado del formulario para agregar recordatorios
  const [newReminderText, setNewReminderText] = useState('');

  // Estado del modal para agregar recordatorios
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Función para agregar un recordatorio
  const addReminder = () => {
    if (newReminderText.trim() === '') return; // No agregar si está vacío
    const newReminder = { id: Date.now(), text: newReminderText, completed: false };
    const updatedReminders = [...reminders, newReminder];
    setReminders(updatedReminders);
    localStorage.setItem('reminders', JSON.stringify(updatedReminders)); // Actualizar localStorage
    setNewReminderText('');
    onClose();
  };

  // Función para marcar un recordatorio como completado
  const toggleReminder = (id) => {
    const updatedReminders = reminders.map((reminder) =>
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    );
    setReminders(updatedReminders);
    localStorage.setItem('reminders', JSON.stringify(updatedReminders)); // Actualiza el localStorage
  };

  // Función para eliminar un recordatorio completado
  const deleteReminder = (id) => {
    const updatedReminders = reminders.filter((reminder) => reminder.id !== id);
    setReminders(updatedReminders);
    localStorage.setItem('reminders', JSON.stringify(updatedReminders)); // Actualiza el localStorage
  };

  return (
    <Box p={6} maxWidth="1280px" margin="0 auto" bg="gray.50">
      <Heading mb={6} textAlign="center" color="teal.600" fontSize="3xl" fontWeight="bold">
        Lista de Eventos
      </Heading>

      {/* Botón para abrir el formulario de agregar recordatorio */}
      <Button
        colorScheme="teal"
        mb={6}
        display="inline-flex"
        alignItems="center"
        paddingX={4}
        paddingY={2}
        fontSize="lg"
        borderRadius="md"
        boxShadow="sm"
        _hover={{
          boxShadow: 'xl',
          transform: 'scale(1.05)',
          bgGradient: 'linear(to-r, teal.300, teal.500)',
          color: 'white',
        }}
        _active={{
          bgGradient: 'linear(to-r, teal.500, teal.600)',
          transform: 'scale(0.98)',
        }}
        _focus={{ boxShadow: 'outline' }}
        onClick={onOpen} // Abre el modal
      >
        <AddIcon mr={2} />
        Agregar Recordatorio
      </Button>

      {/* Sección de Recordatorios */}
      <VStack spacing={4} align="stretch" mb={6}>
        {reminders.map((reminder) =>
          !reminder.completed ? (
            <Alert
              key={reminder.id}
              status="warning"
              variant="left-accent"
              borderRadius="md"
              boxShadow="sm"
            >
              <AlertIcon />
              <AlertTitle>Pendiente</AlertTitle>
              <AlertDescription>{reminder.text}</AlertDescription>
              <HStack spacing={4} ml={4}>
                <Button
                  colorScheme="teal"
                  size="sm"
                  onClick={() => toggleReminder(reminder.id)} // Marca el recordatorio como completado
                >
                  Marcar como completado
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => deleteReminder(reminder.id)}
                >
                  Eliminar
                </Button>
              </HStack>
            </Alert>
          ) : null
        )}
      </VStack>

      {/* Botón para agregar nuevo evento */}
      <Button
        as={Link}
        to="/new"
        colorScheme="teal"
        mb={6}
        display="inline-flex"
        alignItems="center"
        paddingX={4}
        paddingY={2}
        fontSize="lg"
        borderRadius="md"
        boxShadow="sm"
        _hover={{
          boxShadow: 'xl',
          transform: 'scale(1.05)',
          bgGradient: 'linear(to-r, teal.300, teal.500)',
          color: 'white',
        }}
        _active={{
          bgGradient: 'linear(to-r, teal.500, teal.600)',
          transform: 'scale(0.98)',
        }}
        _focus={{ boxShadow: 'outline' }}
      >
        <AddIcon mr={2} />
        Crear Nuevo Evento
      </Button>

      {/* Modal para agregar recordatorio */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Nuevo Recordatorio</ModalHeader>
          <ModalBody>
            <Input
              value={newReminderText}
              onChange={(e) => setNewReminderText(e.target.value)}
              placeholder="Escribe tu recordatorio"
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="teal" onClick={addReminder}>
              Agregar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box bg="white" p={4} borderRadius="md" boxShadow="md">
        <EventList />
      </Box>
    </Box>
  );
};

export default Home;
