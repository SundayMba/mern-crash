import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useProductStore } from '../store/products';

export const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    image: '',
    price: '',
  });
  const toast = useToast();

  const { createProducts } = useProductStore();

  const AddNewProduct = async () => {
    await createProducts(newProduct);
    toast({
      title: 'Product Created Successfully',
      description: 'Your product has been added to the store.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    setNewProduct({ name: '', image: '', price: '' }); // Reset the form after submission
  };
  return (
    <Container maxW={'lg'}>
      <VStack spacing={8} mt={8} mb={8}>
        <Heading as={'h1'}>Create New Product</Heading>

        <Box
          w={'full'}
          shadow={'md'}
          rounded={'lg'}
          p={5}
          bg={useColorModeValue('gray.400', 'gray.700')}
        >
          <VStack spacing={4} w={'full'}>
            <Input
              placeholder="Product"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct((product) => ({
                  ...product,
                  name: e.target.value,
                }))
              }
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct((product) => ({
                  ...product,
                  price: e.target.value,
                }))
              }
            />
            <Input
              placeholder="Image"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct((product) => ({
                  ...product,
                  image: e.target.value,
                }))
              }
            />
            <Button w={'full'} onClick={AddNewProduct}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};
