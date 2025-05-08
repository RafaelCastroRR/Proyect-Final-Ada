import { Box, Heading } from "@chakra-ui/react";
import ReminderList from "../components/ReminderList";
import AddReminder from "../components/AddReminder";
import { useState, useEffect } from "react";

function ReminderPage() {
  // Obtener recordatorios del localStorage
  const loadReminders = () => {
    const savedReminders = JSON.parse(localStorage.getItem("reminders"));
    return savedReminders ? savedReminders : [];
  };

  const [reminders, setReminders] = useState(loadReminders);

  // Actualizar el localStorage
  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = (text) => {
    const newReminder = { id: Date.now(), text, completed: false };
    setReminders([...reminders, newReminder]);
  };

  const toggleReminder = (id) => {
    setReminders(reminders.map(rem =>
      rem.id === id ? { ...rem, completed: !rem.completed } : rem
    ));
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(rem => rem.id !== id));
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={5} boxShadow="md" borderRadius="lg">
      <Heading mb={4} textAlign="center">Mis Recordatorios</Heading>
      <AddReminder onAdd={addReminder} />
      <ReminderList 
        reminders={reminders} 
        onToggle={toggleReminder} 
        onDelete={deleteReminder} 
      />
    </Box>
  );
}

export default ReminderPage;
