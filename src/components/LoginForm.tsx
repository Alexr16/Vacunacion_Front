import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  Center,
} from "@chakra-ui/react";
import FormContainer from "./FormContainer";
import { useNavigate } from "react-router-dom";
import useAuthService from "../services/useAuthService";
import { messageService } from "../services/messageService";

const schema = z.object({
  username: z.string().min(1, { message: "This field has to be filled." }),
  password: z.string().min(6, { message: "Password is too short" }),
});

type ExpenseFormData = z.infer<typeof schema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  const { login } = useAuthService();
  const onSubmit = async (data: ExpenseFormData) => {
    try {
      const user = await login(data);

      localStorage.setItem("user", JSON.stringify(user));

      if (data !== null && user.role === "admin") {
        navigate("/admin");
      } else if (data !== null && user.role === "employee") {
        navigate("/employee");
      } else {
        nmessageService.error("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      messageService.error("Usuario o contraseña incorrectos");
    }
  };

  return (
    <>
      <form
        className="login-form"
        onSubmit={handleSubmit((data: ExpenseFormData) => {
          onSubmit(data);
          reset();
        })}
      >
        <FormContainer>
          <Heading as="h1" size="xl" marginBottom={10}>
            Ingrese su usuario y contraseña
          </Heading>

          <FormControl isRequired>
            <FormLabel>Usuario</FormLabel>
            <Input
              {...register("username")}
              type="text"
              placeholder="Username"
            />
            {errors.username && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>{errors.username.message}</AlertTitle>
              </Alert>
            )}
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Contraseña</FormLabel>
            <Input
              {...register("password")}
              type="password"
              placeholder="Contraseña"
            />
            {errors.password && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>{errors.password.message}</AlertTitle>
              </Alert>
            )}
          </FormControl>
          <Center>
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              whiteSpace="normal"
              textAlign="left"
            >
              Login
            </Button>
          </Center>
        </FormContainer>
      </form>
    </>
  );
};

export default LoginForm;
