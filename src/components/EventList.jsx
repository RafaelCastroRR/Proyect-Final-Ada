import { useContext, useState } from 'react';
import { EventContext } from '../context/EventContext';
import { Box, Text, Badge, Button, VStack, Input, Select, useToast, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { WarningIcon } from '@chakra-ui/icons';

const EventList = () => {
  const { state, dispatch } = useContext(EventContext);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [eventIdToDelete, setEventIdToDelete] = useState(null);
  const [filter, setFilter] = useState({
    title: '',
    category: '',
  });

  const handleDelete = () => {
    if (eventIdToDelete) {
      dispatch({ type: 'DELETE_EVENT', payload: eventIdToDelete });


      toast({
        title: 'Evento eliminado.',
        description: 'El evento ha sido eliminado correctamente.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      onClose();
    }
  };

  const handleToggleComplete = (id) => {
    dispatch({ type: 'TOGGLE_COMPLETE', payload: id });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const filteredEvents = state.events.filter((event) => {
    return (
      (filter.title === '' || event.title.toLowerCase().includes(filter.title.toLowerCase())) &&
      (filter.category === '' || event.category === filter.category)
    );
  });

  return (
    <Box p={5}>
      <VStack spacing={4} align="stretch" mb={4}>
        <Input
          name="title"
          placeholder="Buscar por título"
          value={filter.title}
          onChange={handleFilterChange}
          focusBorderColor="teal.500"
        />
        <Select
          name="category"
          value={filter.category}
          onChange={handleFilterChange}
          placeholder="Filtrar por categoría"
          focusBorderColor="teal.500"
        >
          <option value="trabajo">Trabajo</option>
          <option value="personal">Personal</option>
          <option value="reunion">Reunión</option>
        </Select>
      </VStack>

      {filteredEvents.length === 0 ? (
        <Text>No hay eventos que coincidan con tu filtro.</Text>
      ) : (
        filteredEvents.map((event) => (
          <Box key={event.id} p={4} borderWidth="1px" borderRadius="md" mb={4} _hover={{ boxShadow: 'lg' }} transition="all 0.2s ease-in-out">
            <Text fontWeight="bold" fontSize="lg">{event.title}</Text>
            <Text>{event.date} - {event.time}</Text>
            <Badge
              colorScheme={
                event.category === 'trabajo' ? 'blue' :
                  event.category === 'reunion' ? 'purple' : 'green'
              }
            >
              {event.category}
            </Badge>
            <Box mt={2} display="flex" gap={2}>
              <Button
                as={RouterLink}
                to={`/edit/${event.id}`}
                size="sm"
                colorScheme="yellow"
                aria-label="Editar evento"
                leftIcon={<WarningIcon />}
              >
                Editar
              </Button>
              <Button
                onClick={() => { setEventIdToDelete(event.id); onOpen(); }}
                size="sm"
                colorScheme="red"
                aria-label="Eliminar evento"
                leftIcon={<WarningIcon />}
              >
                Eliminar
              </Button>
              <Button
                onClick={() => handleToggleComplete(event.id)}
                size="sm"
                colorScheme={event.completed ? 'green' : 'gray'}
                leftIcon={event.completed ? <WarningIcon /> : null}
              >
                {event.completed ? 'Completado' : 'Marcar Completado'}
              </Button>
            </Box>
          </Box>
        ))
      )}

      {/* Modal de confirmación */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmación de eliminación</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>¿Estás seguro de que deseas eliminar este evento?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EventList;
