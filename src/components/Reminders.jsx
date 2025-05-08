// Reminders.jsx
import { useState, useEffect } from 'react';
import { Box, Button, Input, List, ListItem, Text } from '@chakra-ui/react';

const Reminders = () => {
  // Cargar recordatorios desde localStorage al iniciar
  const loadReminders = () => {
    const savedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
    return savedReminders;
  };

  const [reminders, setReminders] = useState(loadReminders());
  const [newReminder, setNewReminder] = useState('');

  // Función para agregar un recordatorio
  const addReminder = () => {
    if (newReminder.trim()) {
      const updatedReminders = [...reminders, newReminder];
      setReminders(updatedReminders);
      localStorage.setItem('reminders', JSON.stringify(updatedReminders));
      setNewReminder('');
    }
  };

  // Función para eliminar un recordatorio
  const deleteReminder = (index) => {
    const updatedReminders = reminders.filter((_, i) => i !== index);
    setReminders(updatedReminders);
    localStorage.setItem('reminders', JSON.stringify(updatedReminders));
  };

  return (
    <Box p={6}>
      <Text fontSize="2xl" mb={4}>Mis Recordatorios</Text>

      {/* Campo para agregar un nuevo recordatorio */}
      <Input
        value={newReminder}
        onChange={(e) => setNewReminder(e.target.value)}
        placeholder="Agregar nuevo recordatorio"
        mb={4}
      />
      <Button onClick={addReminder} colorScheme="teal">Agregar</Button>

      {/* Lista de recordatorios */}
      <List spacing={3} mt={6}>
        {reminders.map((reminder, index) => (
          <ListItem key={index} display="flex" justifyContent="space-between" alignItems="center">
            <Text>{reminder}</Text>
            <Button onClick={() => deleteReminder(index)} colorScheme="red" size="sm">Eliminar</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Reminders;
