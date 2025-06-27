import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  VStack,
  Text,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
import { useProductStore } from '../store/products';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const { products, fetchProducts, loading } = useProductStore();
  // const [count, setCount] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  // setCount((prevCount) => prevCount + 1);
  console.log('Products:', products);
  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" h="100vh">
        <Spinner thickness="4px" emptyColor="gray.200" size="xl" />
      </Flex>
    );
  }
  return (
    <Container maxW={'container.xl'} p={4}>
      <VStack spacing={8}>
        <Heading as={'h1'} size={'2xl'}>
          Welcome to the Product Store 🛒
        </Heading>

        {products.length === 0 ? (
          <Box>
            <Text>
              No Products At the moment
              <Link to="/create">Create a new Product</Link>
            </Text>
          </Box>
        ) : (
          <SimpleGrid
            columns={{
              base: 1,
              sm: 2,
              lg: 4,
            }}
            spacing={6}
            w={'full'}
          >
            {products.map((product) => (
              <ProductCard key={products._id} product={product} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};
