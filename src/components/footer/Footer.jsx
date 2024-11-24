import React from 'react';
import { Box, Container, Grid, GridItem, Text, Link, Button, HStack, VStack, Icon, useBreakpointValue, Image } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box textAlign={'center'} w={'100%'} bg="#ffe300" color="black" py={8}>
      <Container w={'100%'} maxW="1200px" mx="auto">
        <Grid w={'100%'} templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={6}>
          
          <GridItem w={'100%'}>
            <VStack w={'100%'} spacing={4}>
              <Image src="/z-shop.png"  />
            </VStack>
          </GridItem>

          <GridItem>
            <VStack spacing={4}>
              <Text fontSize="2xl" fontWeight="bold" color="black">Company</Text>
              <Link href="#" color="black">About Us</Link>
              <Link href="#" color="black">Careers</Link>
              <Link href="#" color="black">Blog</Link>
              <Link href="#" color="black">Contact Us</Link>
            </VStack>
          </GridItem>

          <GridItem>
            <VStack spacing={4}>
              <Text fontSize="2xl" fontWeight="bold" color="black">Services</Text>
              <Link href="#" color="black">Web Development</Link>
              <Link href="#" color="black">App Development</Link>
              <Link href="#" color="black">UI/UX Design</Link>
              <Link href="#" color="black">Consulting</Link>
            </VStack>
          </GridItem>

          <GridItem>
            <VStack spacing={4}>
              <Text fontSize="2xl" fontWeight="bold" color="black">Support</Text>
              <Link href="#" color="black">FAQ</Link>
              <Link href="#" color="black">Help Center</Link>
              <Link href="#" color="black">Privacy Policy</Link>
              <Link href="#" color="black">Terms & Conditions</Link>
            </VStack>
          </GridItem>

          <GridItem>
            <VStack spacing={4}>
              <Text fontSize="2xl" fontWeight="bold" color="black">Follow Us</Text>
              <HStack spacing={4}>
                <Link href="https://www.facebook.com" isExternal>
                  <Icon as={FaFacebook} boxSize={6} />
                </Link>
                <Link href="https://www.twitter.com" isExternal>
                  <Icon as={FaTwitter} boxSize={6} />
                </Link>
                <Link href="https://www.instagram.com" isExternal>
                  <Icon as={FaInstagram} boxSize={6} />
                </Link>
                <Link href="https://www.linkedin.com" isExternal>
                  <Icon as={FaLinkedin} boxSize={6} />
                </Link>
              </HStack>
            </VStack>
          </GridItem>
        </Grid>

        <Box mt={8} textAlign="center">
          <Text fontSize="sm" color="black">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </Text>
          {!isMobile && (
            <HStack spacing={4} mt={4} justify="center">
              <Button variant="link" color="black">Privacy Policy</Button>
              <Button variant="link" color="black">Terms & Conditions</Button>
            </HStack>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
