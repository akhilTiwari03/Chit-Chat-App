import React, { useEffect } from 'react'
import {Container, Box, Text,Tab,TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";

import Login from "../Components/Authentication/Login";
import SignUp from "../Components/Authentication/SignUp";
import { useHistory } from 'react-router-dom';
const Homepage = () => {

    const history = useHistory();
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('userInfo'));
    
      if(user ) {
        history.push("/chats");
      }
    }, [history]);

  return (
    <Container maxW= 'xl' centerContent>
        <Box display="flex"
        justifyContent={"center"}
        p="3"
        bg="whitesmoke"
        w={"100%"}
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px">
            <Text align={"center"}
                fontSize="4xl"
                fontFamily={"Work sans"}
                color="black">Chit-Chat</Text>
        </Box>

        <Box bg="whitesmoke"
        w="100%"
        p="4"
        borderRadius="lg"
        borderWidth="1px"
        color="black">

            <Tabs isFitted variant='soft-rounded' colorScheme='purple'>
            <TabList mb="1em">
                <Tab width="50%">Login</Tab>
                <Tab width="50%">Sign Up</Tab>
            </TabList>
            <TabPanels>
                <TabPanel><Login/></TabPanel>
                <TabPanel><SignUp/></TabPanel>
            </TabPanels>
            </Tabs>

        </Box>
    </Container>
  );
}

export default Homepage
