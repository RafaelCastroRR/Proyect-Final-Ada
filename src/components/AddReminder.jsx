import { HStack, Input, Button } from "@chakra-ui/react";
import { useState } from "react";

function AddReminder({ onAdd }) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim() !== "") {
      onAdd(input);
      setInput("");
    }
  };

  return (
    <HStack mb={4}>
      <Input
        placeholder="Nuevo recordatorio"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button colorScheme="teal" onClick={handleAdd}>
        Agregar
      </Button>
    </HStack>
  );
}

export default AddReminder;
