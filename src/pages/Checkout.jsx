import React, { useEffect } from 'react';
import { Box, Text, Button, Grid, GridItem, Image, HStack, Select, Input, Stack } from '@chakra-ui/react';
import useStore from '../stores/store';

const Checkout = () => {
  const {
    cart,
    totalAmount,
    selectedCard,
    selectBankCard,
    calculateTotal,
    removeFromCart,
    clearCart,
  } = useStore();

  useEffect(() => {
    calculateTotal(); // Recalculate total whenever the cart changes
  }, [cart, calculateTotal]);

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleCardSelect = (e) => {
    selectBankCard(e.target.value);
  };

  const handleCheckout = () => {
    if (selectedCard) {
      alert('Order placed successfully!');
      clearCart(); // Clear the cart after checkout
    } else {
      alert('Please select a bank card.');
    }
  };

  return (
    <Box p={{ base: 4, md: 8 }} maxW="1200px" mx="auto" bg="white" borderRadius="md" boxShadow="lg">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Checkout
      </Text>

      {/* Cart items */}
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
        {cart.map((product) => (
          <GridItem key={product.id} bg="gray.50" p={4} borderRadius="md" boxShadow="sm">
            <Image src={product.thumbnail} alt={product.title} boxSize="150px" objectFit="cover" mb={4} />
            <Text fontSize="lg" fontWeight="bold">{product.title}</Text>
            <Text>Price: ${product.price}</Text>
            <Text>Quantity: {product.quantity}</Text>
            <Button onClick={() => handleRemove(product.id)} colorScheme="red" size="sm" mt={2}>
              Remove
            </Button>
          </GridItem>
        ))}
      </Grid>

      {/* Bank Card Selection */}
      <Text mt={6} fontSize="lg" fontWeight="bold">Select Bank Card</Text>
      <Select onChange={handleCardSelect} value={selectedCard} mt={2} placeholder="Choose a card">
        <option value="card1">Visa - 1234</option>
        <option value="card2">MasterCard - 5678</option>
        <option value="card3">Amex - 4321</option>
      </Select>

      {/* Total Amount */}
      <Text mt={6} fontSize="xl" fontWeight="bold">
        Total: ${totalAmount}
      </Text>

      {/* Checkout Button */}
      <HStack spacing={4} mt={6} justify="center">
        <Button colorScheme="green" onClick={handleCheckout}>
          Confirm Order
        </Button>
        <Button colorScheme="gray" onClick={() => clearCart()}>
          Clear Cart
        </Button>
      </HStack>
    </Box>
  );
};

export default Checkout;
