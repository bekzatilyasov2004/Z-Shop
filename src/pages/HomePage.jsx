import { Box, Text, Image, Button, Skeleton, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Carousel, Spin } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Navigatsiya uchun
import useStore from '../stores/store';
import Footer from '../components/footer/Footer';

const MotionBox = motion(Box);

const HomePage = () => {
  const { products, loading, error, fetchProducts } = useStore();
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const productMotion = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.8 },
  };


  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}

      >
      <Carousel autoplay dots={false} autoplaySpeed={4000}>
        {products.slice(0, 50).map((product) => (
          <motion.div
            key={product.id}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={productMotion}
            transition={{ duration: 0.8 }}
          >
            <Flex
              direction={{ base: 'column', md: 'row' }}
              p={4}
              mb={5}
              justifyContent="space-evenly"
              alignItems="center"
              borderRadius="md"
              boxShadow="lg"
              bg="white"
            >
              <Skeleton isLoaded={!loading} height="300px" width="300px">
                <Image
                  src={product.thumbnail || '/default-image.jpg'}
                  alt={product.title}
                  objectFit="cover"
                  borderRadius="md"
                  boxSize="300px"
                />
              </Skeleton>
              <Box ml={{ base: 0, md: 5 }} textAlign={{ base: 'center', md: 'left' }}>
                <Text fontSize="2xl" fontWeight="semibold" color="blue.500">
                  {product.title}
                </Text>
                <Text fontSize="lg" color="gray.500" textDecoration="line-through">
                  ${product.price}
                </Text>
                <Text fontSize="xl" fontWeight="bold" color="#ffe300">
                  ${product.price * 0.7}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Limited Time Offer - Don't Miss Out!
                </Text>
                <Button
                  mt={4}
                  colorScheme="yellow"
                  onClick={() => navigate(`/order/${product.id}`)} // Navigate to SingleShowPage
                >
                  Order Now
                </Button>
              </Box>
            </Flex>
          </motion.div>
        ))}
      </Carousel>

      <Box display="flex" justifyContent="center" flexWrap="wrap" mt={10}>
        {products.slice(0, 20).map((product) => (
          <MotionBox
            key={product.id}
            p={4}
            m={2}
            borderRadius="lg"
            boxShadow="lg"
            bg="white"
            w={['100%', '48%', '30%']}
            textAlign="center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition="all 0.3s ease-in-out"
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            flexDir={'column'}
            gap={2}
          >
            <Image
              src={product.thumbnail || '/default-image.jpg'}
              alt={product.title}
              objectFit="cover"
              borderRadius="md"
              boxSize="200px"
            />
            <Text fontSize="lg" fontWeight="bold" color="blue.500">
              {product.title}
            </Text>
            <Text fontSize="md" color="gray.500">
              ${product.price}
            </Text>
            <Button
              mt={2}
              colorScheme="yellow"
              size="sm"
              width="100%"
              onClick={() => navigate(`/order/${product.id}`)} 
            >
              Order Now
            </Button>
          </MotionBox>
        ))}
      </Box>
      <Footer />
    </MotionBox>
  );
};

export default HomePage;
