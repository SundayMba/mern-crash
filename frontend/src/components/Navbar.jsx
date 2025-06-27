import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AddIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container borderWidth={'1px'} p={4} maxW={'1140px'}>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Link to="/">
          <Text
            bgGradient={'linear(to-r, cyan.400, blue.500)'}
            bgClip={'text'}
            fontSize={{ base: '22px', sm: '28px' }}
            fontWeight={'bold'}
            textTransform={'uppercase'}
          >
            Product Store 🛒
          </Text>
        </Link>

        <HStack spacing={4}>
          <Link to="/create">
            <Button>
              <AddIcon boxSize={6} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? (
              <MoonIcon boxSize={6} />
            ) : (
              <SunIcon boxSize={6} />
            )}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};
