import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Image, Text, Button, HStack, VStack, Flex } from '@chakra-ui/react';
import useStore from '../stores/store';

const SingleShowPage = () => {
  const { id } = useParams();
  const { products, addToCart } = useStore(); 
  const product = products.find((p) => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  if (!product) {
    return <Text>Mahsulot topilmadi!</Text>;
  }

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart({ ...product, quantity }); 
    navigate('/cart');  
  };

  return (
      <Box p={5} maxW={'600px'}   mx="auto" borderRadius="md" boxShadow="lg" bg="white">
        <Box display={'flex'} flexDir={{base:'column', md: 'row'}} justifyContent={'space-around'} alignItems={'center'}>
        <Image w={'250px'} h={'200px'} src={product.thumbnail} alt={product.title} borderRadius="md" mb={5} />
        <Flex flexDir={'column'}>
      <Text fontSize="2xl" fontWeight="bold" mb={3}>
        {product.title}
      </Text>
      <Text fontSize="md" color="gray.600" mb={5}>
        {product.description}
      </Text>
      <Text fontSize="lg" fontWeight="bold" mb={3}>
        Narxi: ${product.price}
      </Text>
        </Flex>
        </Box>
      <HStack justifyContent={'center'} mb={5}>
        <Button onClick={decrement} colorScheme="red">
          -
        </Button>
        <Text>{quantity}</Text>
        <Button onClick={increment} colorScheme="green">
          +
        </Button>
      </HStack>
      <VStack>
        <Text fontSize="lg" fontWeight="bold">
          Jami narx: ${product.price * quantity}
        </Text>
        <Button mt={2} colorScheme="blue" size="lg" width="100%" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </VStack>
    </Box>
  );
};

export default SingleShowPage;
