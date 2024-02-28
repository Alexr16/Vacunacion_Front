import { Link } from "react-router-dom";
import { Button, HStack, VStack, Heading, Container } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <>
      <Container
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100vh"}
      >
        <VStack justifyContent={"center"} marginBottom="100px" spacing="24px">
          <Heading as="h1" size="xl">
            Bienvenido
          </Heading>
          <Heading fontSize="4xl">INVENTARIO DE VACUNACION</Heading>
        </VStack>
        <HStack justifyContent={"center"} marginBottom={3} spacing="24px">
          <Button
            borderRadius={10}
            borderWidth="2px"
            variant="solid"
            colorScheme={"teal"}
            width={"200px"}
            padding={5}
            height={"100px"}
          >
            <Link to="session/login">Empleado</Link>
          </Button>
          <Button
            borderRadius={10}
            borderWidth="2px"
            colorScheme={"teal"}
            variant="solid"
            width={"200px"}
            height={"100px"}
            padding={5}
          >
            <Link to="session/login">Administrator</Link>
          </Button>
        </HStack>
      </Container>
    </>
  );
};

export default HomePage;
