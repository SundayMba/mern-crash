import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Text,
  Heading,
  HStack,
  IconButton,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  ModalFooter,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useProductStore } from '../store/products';

const ProductCard = ({ product }) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { deleteProduct, updateProduct } = useProductStore();
  const Toast = useToast();

  const handleUpdateProduct = async (id, product) => {
    const { success, message } = await updateProduct(id, product);
    onClose();
    if (!success) {
      Toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      Toast({
        title: 'Success',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id);
    if (!success) {
      Toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      Toast({
        title: 'Success',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      borderWidth={1}
      borderColor="gray.200"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
    >
      <Image
        src={product?.image}
        alt={product?.name}
        h={48}
        objectFit="cover"
        w="full"
      />
      <Box p={4}>
        <Heading size="md" as={'h3'} mb="4">
          {product?.name}
        </Heading>
        <Text mb={4} fontWeight="bold" fontSize={'xl'}>
          ${product?.price}
        </Text>
        <HStack gap={4}>
          <IconButton
            icon={<EditIcon />}
            aria-label="Edit Product"
            colorScheme="blue"
            onClick={onOpen}
          />
          <IconButton
            icon={<DeleteIcon />}
            aria-label="Delete Product"
            colorScheme="blue"
            onClick={() => handleDeleteProduct(product?._id)}
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={4} pb={4}>
              <Input
                placeholder="Product Name"
                value={updatedProduct?.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
                name="name"
              />
              <Input
                placeholder="Product Image URL"
                value={updatedProduct?.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
                name="image"
              />
              <Input
                placeholder="Product Price"
                value={updatedProduct?.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
                type="number"
                name="price"
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack spacing="4">
              <Button
                colorScheme="blue"
                onClick={() =>
                  handleUpdateProduct(updatedProduct._id, updatedProduct)
                }
              >
                Update
              </Button>
              <Button variant={'outline'} onClick={onClose}>
                Cancel
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
