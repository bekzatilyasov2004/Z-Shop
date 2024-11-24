import { Box, Image, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import HomePage from './pages/HomePage';
import SingleShowPage from './pages/SingleShowPage';
import Logo from '/logo.png'; 
import Cart from './pages/Cart';
import Product from './pages/Product';
import Search from './pages/Search';
import Checkout from './pages/Checkout';
import PageNotFound from './pages/404';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer); 
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        backgroundColor="white"
        flexDirection="column"
      >
        <Image
          src={Logo}
          boxSize="150px"
          alt="Logo"
          mb={4}
          borderRadius="md"
          boxShadow="lg"
        />
        <Text fontSize="3xl" fontWeight="bold" color="black" mb={2}>
          Z-Shop
        </Text>
        <Text fontSize="md" color="gray.500">
          Made with ❤️ by BekaDev
        </Text>
      </Box>
    );
  }

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box width="100%" maxWidth="1080px">
        <Header />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="order/:id" element={<SingleShowPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products" element={<Product />} />
          <Route path="search" element={<Search />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
