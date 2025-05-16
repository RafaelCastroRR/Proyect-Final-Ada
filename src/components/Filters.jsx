import React from 'react';
import { useContext, useState } from 'react';
import { EventContext } from '../context/EventContext';
import { Input, Select, Flex, Button } from '@chakra-ui/react';

const Filters = () => {
  const { dispatch } = useContext(EventContext);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const handleFilter = () => {
    dispatch({ type: 'FILTER_EVENTS', payload: { search, category } });
  };

  const clearFilter = () => {
    setSearch('');
    setCategory('');
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  return (
    <Flex gap={4} mb={4}>
      <Input
        placeholder="Buscar por título"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <Select placeholder="Todas las categorías" value={category} onChange={e => setCategory(e.target.value)}>
        <option value="trabajo">Trabajo</option>
        <option value="personal">Personal</option>
        <option value="reunion">Reunión</option>
      </Select>
      <Button onClick={handleFilter} colorScheme="teal">Filtrar</Button>
      <Button onClick={clearFilter}>Limpiar</Button>
    </Flex>
  );
};

export default Filters;
