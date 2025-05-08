import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { EventContext } from '../context/EventContext';
import { Box, Button, FormControl, FormLabel, Input, Select, Heading, Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(EventContext);

  const eventToEdit = state.events.find(event => event.id === id);

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    category: ''
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (eventToEdit) {
      setFormData({
        title: eventToEdit.title,
        date: eventToEdit.date,
        time: eventToEdit.time,
        category: eventToEdit.category
      });
    }
  }, [eventToEdit]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onOpen();
  };

  const handleCancel = () => {
    onOpen();
  };

  const confirmSave = () => {
    dispatch({ type: 'UPDATE_EVENT', payload: { ...eventToEdit, ...formData } });
    navigate('/');
    onClose();
  };

  const confirmCancel = () => {
    navigate('/');
    onClose();
  };

  if (!eventToEdit) return <p>Evento no encontrado</p>;

  return (
    <Box p={6} maxWidth="800px" margin="0 auto" bg="white" borderRadius="lg" boxShadow="lg">
      <Heading mb={6} textAlign="center" color="teal.600" fontSize="2xl" fontWeight="semibold">
        Editar Evento
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="title">Título</FormLabel>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              borderColor="teal.300"
              _hover={{ borderColor: 'teal.400' }}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="date">Fecha</FormLabel>
            <Input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              borderColor="teal.300"
              _hover={{ borderColor: 'teal.400' }}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="time">Hora</FormLabel>
            <Input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              borderColor="teal.300"
              _hover={{ borderColor: 'teal.400' }}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="category">Categoría</FormLabel>
            <Select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              borderColor="teal.300"
              _hover={{ borderColor: 'teal.400' }}
            >
              <option value="trabajo">Trabajo</option>
              <option value="personal">Personal</option>
              <option value="reunion">Reunión</option>
            </Select>
          </FormControl>
          <Stack direction="row" spacing={4} mt={4}>
            <Button type="submit" colorScheme="teal" width="full">
              Guardar Cambios
            </Button>
            <Button
              onClick={handleCancel}
              colorScheme="red"
              width="full"
            >
              Cancelar
            </Button>
          </Stack>
        </Stack>
      </form>

      {/* Modal de confirmación */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmación</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            ¿Estás seguro de que deseas guardar los cambios? <br />
            Si cancelas, los cambios no se guardarán.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={confirmCancel}>
              Cancelar
            </Button>
            <Button colorScheme="teal" onClick={confirmSave}>
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EditEvent;
