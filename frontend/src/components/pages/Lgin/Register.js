import React, { useState } from 'react'
import {   Box,  FormControl,Button, Heading, Input, InputGroup, InputLeftElement, Stack,  InputRightElement, chakra, Container, HStack, FormLabel, Divider, Checkbox } from "@chakra-ui/react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Register = () => {
        const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
  return (
    <>
    <div className='page_login'>
          <Container
    maxW="lg"
    py={{
      base: '10',
      md: '10',
    }}
    px={{
      base: '0',
      sm: '5',
    }}
  >
    <Stack spacing="8">
      <Stack spacing="6">
        <Stack
          spacing={{
            base: '2',
            md: '3',
          }}
          textAlign="center"
        >
          <Heading
            size={{
              base: 'xs',
              md: 'sm',
            }}
          >
            resister
          </Heading>
        </Stack>
      </Stack>
      <Box
        py={{
          base: '0',
          sm: '8',
        }}
        px={{
          base: '4',
          sm: '10',
        }}
        bg={{
          base: 'transparent',
          sm: 'bg-surface',
        }}
        boxShadow={{
          base: 'none',
          sm: 'md',
        }}
        borderRadius={{
          base: 'none',
          sm: 'xl',
        }}
      >
        <Stack spacing="6">
          <Stack spacing="5">
          

            <FormControl>
              <FormLabel htmlFor="email">name</FormLabel>
              <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaUserAlt color="gray.300" />}
                  />
          
              <Input id="name" type="name" placeholder="Enter name"
            //  onChange={(e) => setEmail(e.target.value)}
            //  value={email}
             />
              
                </InputGroup>
              <FormLabel htmlFor="email">Email</FormLabel>
              <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaUserAlt color="gray.300" />}
                  />
          
              <Input id="email" type="email" placeholder="Enter email"
            //  onChange={(e) => setEmail(e.target.value)}
            //  value={email}
             />
              
                </InputGroup>
             <FormLabel htmlFor="password">password</FormLabel>
            <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                //     onChange={(e) => setPass(e.target.value)}
                // value={pass}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
            </FormControl>
            
          </Stack>
          <HStack justify="space-between">
            <Checkbox defaultChecked>Remember me</Checkbox>
            <Button variant="link" colorScheme="blue" size="sm">
              Forgot password?
            </Button>
          </HStack>
          <Stack spacing="4">
            <Link to='/'>
                <Button  borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                //  onClick={handleLogin}
                 >Sign in
                 </Button>
            </Link>
            <HStack>
              <Divider />
             
              <Divider />
            </HStack>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Container>  
  </div>
    </>
  )
}

export default Register