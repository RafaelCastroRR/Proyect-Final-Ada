// Layout.jsx
import { Box, Flex, Heading, Link as ChakraLink, Button } from '@chakra-ui/react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => (
  <Flex direction="column" minHeight="100vh" bg="gray.50">
    {/* Encabezado */}
    <Box
      as="header"
      bgGradient="linear(to-r, teal.500, blue.400)"
      color="white"
      p={4}
      boxShadow="0 4px 10px rgba(0, 0, 0, 0.1)"
      transition="all 0.3s ease"
    >
      <Flex justify="space-between" align="center" px={8}>
        <Heading
          size="lg"
          fontFamily="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
          letterSpacing="wide"
          _hover={{ transform: 'scale(1.02)' }}
          transition="transform 0.3s ease"
        >
          Event management
        </Heading>
        <Flex gap={6}>
          <ChakraLink
            as={Link}
            to="/"
            fontSize="lg"
            fontWeight="bold"
            _hover={{ color: 'teal.300', transform: 'scale(1.1)' }}
            transition="all 0.3s ease"
          >
            Inicio
          </ChakraLink>
          <ChakraLink
            as={Link}
            to="/calendar"
            fontSize="lg"
            fontWeight="bold"
            _hover={{ color: 'teal.300', transform: 'scale(1.1)' }}
            transition="all 0.3s ease"
          >
            Calendario
          </ChakraLink>
          <ChakraLink
            as={Link}
            to="/reminders" 
            fontSize="lg"
            fontWeight="bold"
            _hover={{ color: 'teal.300', transform: 'scale(1.1)' }}
            transition="all 0.3s ease"
          >
            Recordatorios
          </ChakraLink>
          <ChakraLink
            as={Link}
            to="/new"
            fontSize="lg"
            fontWeight="bold"
            _hover={{ color: 'teal.300', transform: 'scale(1.1)' }}
            transition="all 0.3s ease"
          >
            Crear Evento
          </ChakraLink>
        </Flex>
      </Flex>
    </Box>

    {/* Contenido Principal */}
    <Box
      as="main"
      flex="1"
      p={6}
      width="100%"
      overflow="auto"
      bg="white"
      borderRadius="lg"
      boxShadow="0 4px 10px rgba(0, 0, 0, 0.08)"
      transition="box-shadow 0.3s ease"
      _hover={{ boxShadow: '0 6px 14px rgba(0, 0, 0, 0.15)' }}
    >
      <Outlet />
    </Box>

    {/* Pie de página */}
    <Box
      as="footer"
      bg="gray.100"
      p={4}
      textAlign="center"
      fontSize="sm"
      boxShadow="0 -4px 10px rgba(0, 0, 0, 0.1)"
      transition="all 0.3s ease"
    >
      <Button
        as="a"
        href="https://github.com/RafaelCastroRR"
        target="_blank"
        rel="noopener noreferrer"
        variant="link"
        color="teal.500"
        fontWeight="bold"
        fontSize="md"
        _hover={{ color: 'teal.700', textDecoration: 'underline', transform: 'scale(1.05)' }}
        transition="all 0.3s ease"
      >
        Contacto
      </Button>
      <br />
      <Box pt={2} fontSize="xs" color="gray.600">
        © {new Date().getFullYear()} RafaelCastro
      </Box>
    </Box>
  </Flex>
);

export default Layout;
