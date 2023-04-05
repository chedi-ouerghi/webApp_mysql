import { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  VStack,
  Text,
  IconButton,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const MenuSide = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeLink, setActiveLink] = useState("");

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}
        // position="fixed" top="0" left="0"
        >
        <Icon as={ChevronRightIcon} />
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navigation</DrawerHeader>
          <DrawerBody>
            <VStack spacing="4" align="stretch">
              <Stack
                direction="row"
                alignItems="center"
                justify="space-between"
                px="4"
              >
                <Text fontWeight="bold" fontSize="md">
                  Pages
                </Text>
              </Stack>
              <Link to="/home" onClick={() => setActiveLink("/home")}>
                <Button
                  variant="ghost"
                  isActive={activeLink === "/home"}
                  w="100%"
                  justifyContent="flex-start"
                  pl="4"
                >
                  Application
                </Button>
              </Link>
              <Link to="/home/module" onClick={() => setActiveLink("/home/module")}>
                <Button
                  variant="ghost"
                  isActive={activeLink === "/home/module"}
                  w="100%"
                  justifyContent="flex-start"
                  pl="4"
                >
                  Module
                </Button>
              </Link>
              <Link to="/home/pages" onClick={() => setActiveLink("/home/pages")}>
                <Button
                  variant="ghost"
                  isActive={activeLink === "/home/pages"}
                  w="100%"
                  justifyContent="flex-start"
                  pl="4"
                >
                  Pages
                </Button>
              </Link>
              <Link to="/home/user" onClick={() => setActiveLink("/home/user")}>
                <Button
                  variant="ghost"
                  isActive={activeLink === "/home/user"}
                  w="100%"
                  justifyContent="flex-start"
                  pl="4"
                >
                  Users
                </Button>
              </Link>
              <Link to="/home/notifications" onClick={() => setActiveLink("/home/notifications")}>
                <Button
                  variant="ghost"
                  isActive={activeLink === "/home/notifications"}
                  w="100%"
                  justifyContent="flex-start"
                  pl="4"
                >
                  Notifications
                </Button>
              </Link>
              <Link to="/logout">
                <Button w="100%" justifyContent="flex-start" pl="4">
                  Logout
                </Button>
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MenuSide;
