import { HStack, Text, IconButton, Checkbox } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

function ReminderItem({ reminder, onToggle, onDelete }) {
  return (
    <HStack 
      w="100%" 
      justify="space-between" 
      p={3} 
      bg="gray.50" 
      borderRadius="md" 
      boxShadow="sm"
    >
      <Checkbox 
        isChecked={reminder.completed} 
        onChange={() => onToggle(reminder.id)}
      >
        <Text as={reminder.completed ? "del" : undefined}>
          {reminder.text}
        </Text>
      </Checkbox>
      <IconButton 
        icon={<DeleteIcon />} 
        colorScheme="red" 
        size="sm" 
        onClick={() => onDelete(reminder.id)} 
      />
    </HStack>
  );
}

export default ReminderItem;
