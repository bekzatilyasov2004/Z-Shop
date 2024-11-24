import React, { useState } from 'react';
import { Box, Text, Button, HStack, VStack, Image, Checkbox } from '@chakra-ui/react';
import useStore from '../stores/store';

const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart } = useStore();
  
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelectItem = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id) 
        ? prevSelected.filter(itemId => itemId !== id)  // Agar bor bo‘lsa, olib tashlaymiz
        : [...prevSelected, id]  
    );
  };

  const totalPrice = cart.reduce(
    (total, item) => (selectedItems.includes(item.id) ? total + item.price * item.quantity : total),
    0
  );

  const handleCheckout = () => {
    alert(`Chekout! Jami narx: $${totalPrice.toFixed(2)}`);
  };

  return (
    <Box p={5} maxW="800px" mx="auto" borderRadius="md" boxShadow="lg" bg="white">
      <Text fontSize="2xl" fontWeight="bold" mb={5}>
        Savatchangiz
      </Text>
      {cart.length === 0 ? (
        <Text>Savatchangiz bo'sh</Text>
      ) : (
        <VStack spacing={5}>
          {cart.map((item) => (
            <HStack flexDir={{base: 'column', md: 'row'}} key={item.id} w="100%" justifyContent="space-between" p={3} bg="gray.50" borderRadius="md">
              <Image src={item.thumbnail} alt={item.title} boxSize={{base:'200px', md:'100px'}} borderRadius="md" />
              <VStack align="start">
                <Text fontWeight="bold">{item.title}</Text>
                <Text>${item.price}</Text>
              </VStack>
              <HStack>
                <Button 
                  size="sm" 
                  onClick={() => updateCartQuantity(item.id, -1)} 
                  disabled={item.quantity === 1}
                >
                  -
                </Button>
                <Text>{item.quantity}</Text>
                <Button 
                  size="sm" 
                  onClick={() => updateCartQuantity(item.id, +1)}
                >
                  +
                </Button>
              </HStack>
              <Button 
                size="sm" 
                colorScheme="red" 
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </Button>
              <Checkbox 
                isChecked={selectedItems.includes(item.id)} 
                onChange={() => toggleSelectItem(item.id)} 
              >
                Tanlash
              </Checkbox>
            </HStack>
          ))}
          <Text fontSize="xl" fontWeight="bold">
            Jami narx: ${totalPrice.toFixed(2)}
          </Text>
          <Button 
            colorScheme="green" 
            size="lg" 
            onClick={handleCheckout} 
            isDisabled={selectedItems.length === 0}  // Agar hech qanday mahsulot tanlanmagan bo‘lsa, disable bo‘ladi
          >
            Checkout
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default Cart;
