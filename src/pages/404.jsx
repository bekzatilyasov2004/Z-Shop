import React from 'react';
import { Box, Text, Button, VStack, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const PageNotFound = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      w="100%"
      h="100vh"
      bg="gray.800"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
    >
      <VStack spacing={6} textAlign="center">
        {/* 3D Animation */}
        <MotionBox
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          fontSize={isMobile ? '6xl' : '8xl'}
          fontWeight="bold"
        >
          404
        </MotionBox>
        <Text fontSize={isMobile ? 'xl' : '2xl'} color="gray.400">
          Oops! The page you’re looking for doesn’t exist.
        </Text>
        <Button
          as="a"
          href="/"
          colorScheme="teal"
          size="lg"
          variant="solid"
          _hover={{ bg: 'teal.600' }}
        >
          Go Back to Home
        </Button>
      </VStack>
    </Box>
  );
};

export default PageNotFound;
