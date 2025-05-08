import { VStack } from "@chakra-ui/react";
import ReminderItem from "./ReminderItem";

function ReminderList({ reminders, onToggle, onDelete }) {
  return (
    <VStack spacing={3}>
      {reminders.map(reminder => (
        <ReminderItem 
          key={reminder.id} 
          reminder={reminder} 
          onToggle={onToggle} 
          onDelete={onDelete} 
        />
      ))}
    </VStack>
  );
}

export default ReminderList;
