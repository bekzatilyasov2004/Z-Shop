import React, { useEffect } from 'react';
import { Box, Image, Text, Button, VStack, HStack, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import useStore from '../stores/store';

const Product = () => {
  const { products, loading, error, fetchProducts, addToCart } = useStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Box p={{ base: 4, md: 8 }} maxW="1200px" mx="auto" bg="white" borderRadius="md" boxShadow="lg">
      <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" mb={5}>
        Our Products
      </Text>

      {/* Error Message */}
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      {/* Loading Spinner */}
      {loading ? (
        <Spinner size="lg" color="teal" />
      ) : (
        <VStack spacing={6}>
          {products.map((product) => (
            <HStack
              key={product.id}
              w="100%"
              bg="gray.50"
              p={4}
              borderRadius="md"
              boxShadow="sm"
              justify="space-between"
              align="center"
              flexDirection={{ base: 'column', md: 'row' }} // Adjust layout on small screens
              spacing={4}
            >
              <HStack spacing={5} flexDir={{base: 'column', md: 'row'}}>
                <Image 
                  src={product.thumbnail} 
                  alt={product.title} 
                  boxSize={{ base: '120px', md: '100px' }} // Adjust image size on small screens
                  borderRadius="md" 
                />
                <VStack align="start" spacing={1}>
                  <Text fontWeight="bold" fontSize={{ base: 'lg', md: 'xl' }}>
                    {product.title}
                  </Text>
                  <Text fontSize={{ base: 'sm', md: 'lg' }} color="gray.600">
                    ${product.price.toFixed(2)}
                  </Text>
                </VStack>
              </HStack>

              <HStack spacing={4} flexDirection={{ base: 'row', md: 'column' }}>
                <Link to={`/order/${product.id}`}>
                  <Button colorScheme="blue" width={{ base: 'full', md: 'auto' }}>Order Now</Button>
                </Link>
                <Button
                  colorScheme="green"
                  onClick={() => addToCart({ ...product, quantity: 1 })}
                  width={{ base: 'full', md: 'auto' }} // Make the button full width on small screens
                >
                  Add to Cart
                </Button>
              </HStack>
            </HStack>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default Product;
