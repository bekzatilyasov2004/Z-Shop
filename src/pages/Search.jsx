import React, { useState } from 'react';
import { Box, Input, Select, VStack, Text, Grid, GridItem, Button, Image, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useStore from '../stores/store';

const Search = () => {
  const { products } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const navigate = useNavigate();

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.price.toString().includes(searchTerm) // Search by price as well
  );

  // Sorting the products based on the selected option
  const sortedProducts = filteredProducts.sort((a, b) => {
    switch (sortOption) {
      case 'priceAsc':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      case 'category':
        return a.category.localeCompare(b.category);
      case 'description':
        return a.description.localeCompare(b.description);
      default:
        return 0;
    }
  });

  const handleOrderNow = (productId) => {
    // Navigate to the single product page
    navigate(`/order/${productId}`);
  };

  return (
    <Box p={{ base: 4, md: 8 }} maxW="1200px" mx="auto" bg="white" borderRadius="md" boxShadow="lg">
      <VStack spacing={6} align="stretch">
        <Text fontSize="2xl" fontWeight="bold" mb={3}>
          Search Products
        </Text>

        {/* Search bar */}
        <Input
          placeholder="Search products by name, category, description or price"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="lg"
          mb={4}
        />

        {/* Sort options */}
        <HStack spacing={4}>
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            placeholder="Sort by"
            width="auto"
            size="lg"
          >
            <option value="default">Default</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="category">Category</option>
            <option value="description">Description</option>
          </Select>
        </HStack>

        {/* Displaying products in cards */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
          {sortedProducts.map((product) => (
            <GridItem key={product.id}>
              <Box p={4} bg="gray.50" borderRadius="md" boxShadow="sm" textAlign="center">
                <Image src={product.thumbnail} alt={product.title} boxSize="200px" objectFit="cover" mb={4} />
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  {product.title}
                </Text>
                <Text color="gray.600" mb={2}>
                  {product.category}
                </Text>
                <Text color="gray.500" mb={2}>
                  {product.description.slice(0, 50)}... {/* Truncate description */}
                </Text>
                <Text fontSize="xl" fontWeight="bold" color="#ffe300" mb={4}>
                  ${product.price}
                </Text>
                <HStack spacing={4} justify="center">
                  <Button
                    colorScheme="yellow"
                    onClick={() => useStore.getState().addToCart({ ...product, quantity: 1 })}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    colorScheme="green"
                    onClick={() => handleOrderNow(product.id)}  // Navigate to SingleShowPage
                  >
                    Order Now
                  </Button>
                </HStack>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </VStack>
    </Box>
  );
};

export default Search;
