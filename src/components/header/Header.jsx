import {
  Box,
  Image,
  Flex,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { RiMenu2Fill } from "react-icons/ri";
import { Badge } from "antd";
import { CgProfile } from "react-icons/cg";
import { FaOpencart } from "react-icons/fa";
import { RiDiscountPercentLine } from "react-icons/ri";
import { TbShoppingBagSearch } from "react-icons/tb";
import { CiCreditCard1 } from "react-icons/ci";
import useStore from "../../stores/store"; 

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cart } = useStore(); 

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Box w="100%" h="80px" display="flex" justifyContent="center" alignItems="center">
      <Flex w="100%" maxW="1290px" justifyContent="space-between" alignItems="center" p="0 20px">
        <Image src="/z-shop.png" alt="z-shop" w="170px" />
        <Flex display={["none", "none", "flex"]} gap="20px">
          <NavLink
            to="/"
            className="active-link"
            style={({ isActive }) => ({
              color: isActive ? "#ffe300" : "inherit",
            })}
          >
            Bosh sahifa
          </NavLink>
          <NavLink
            to="/products"
            className="active-link"
            style={({ isActive }) => ({
              color: isActive ? "#ffe300" : "inherit",
            })}
          >
            Mahsulotlar
          </NavLink>
          <NavLink
            to="/search"
            className="active-link"
            style={({ isActive }) => ({
              color: isActive ? "#ffe300" : "inherit",
            })}
          >
            <TbShoppingBagSearch size={"25px"} />
          </NavLink>

          <NavLink
            to="/checkout"
            className="active-link"
            style={({ isActive }) => ({
              color: isActive ? "#ffe300" : "inherit",
            })}
          >
            <CiCreditCard1 size={"25px"} />
          </NavLink>
          <NavLink
            to="/cart"
            className="active-link"
            style={({ isActive }) => ({
              color: isActive ? "#ffe300" : "inherit",
            })}
          >
            <Badge count={totalItems} overflowCount={99} size="small">
              <FaOpencart size={"25px"} />
            </Badge>
          </NavLink>

        </Flex>

        <IconButton
          aria-label="Open Menu"
          icon={<RiMenu2Fill size={"25px"} />}
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant={"outline"}
          colorScheme="white"
        />
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <Box w={"100%"} p={5}>
            <Image src="/z-shop.png" w={"150px"} alt="z-shop" />
          </Box>
          <DrawerBody>
            <Stack spacing={4}>
            <Stack spacing={4}>
              <NavLink
                to="/"
                onClick={onClose}
                style={({ isActive }) => ({
                  color: isActive ? '#ffe300' : 'inherit',
                })}
                className="active-link"
              >
                Bosh sahifa
              </NavLink>
              <NavLink
                to="/products"
                onClick={onClose}
                style={({ isActive }) => ({
                  color: isActive ? '#ffe300' : 'inherit',
                })}
                className="active-link"
              >
                Mahsulotlar
              </NavLink>
              <NavLink
                to="/cart"
                onClick={onClose}
                style={({ isActive }) => ({
                  color: isActive ? '#ffe300' : 'inherit',
                })}
                className="active-link"
              >
                Savatcha
              </NavLink>
              <NavLink
                to="/checkout"
                onClick={onClose}
                style={({ isActive }) => ({
                  color: isActive ? '#ffe300' : 'inherit',
                })}
                className="active-link"
              >
                Tolov
              </NavLink>
             
              <NavLink
                to="/search"
                onClick={onClose}
                style={({ isActive }) => ({
                  color: isActive ? '#ffe300' : 'inherit',
                })}
                className="active-link"
              >
                Qidiruv
              </NavLink>
              
            </Stack>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;
