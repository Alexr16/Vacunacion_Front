import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useUserService from "../../hooks/useUserService";
import { messageService } from "../../services/messageService";
import { User } from "../../services/useAuthService";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  Grid,
  Card,
  VStack,
  CardHeader,
  Box,
  Heading,
  FormLabel,
  GridItem,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";

const namesRegex = /^[a-zA-Z\s]*$/;
const numbersRegex = /^[0-9]*$/;

const schema = z.object({
  id: z.string().optional(),
  cedula: z
    .string()
    .min(10)
    .max(10)
    .regex(numbersRegex, "Solo se permiten números")
    .optional(),
  nombres: z.string().regex(namesRegex).optional(),
  lastnames: z.string().regex(namesRegex).optional(),
  email: z
    .string()
    .email({ message: "Este campo no puede estar vacio" })
    .optional(),
  birthdate: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  password: z.string().optional(),
  username: z.string().optional(),
});

type ExpenseFormData = z.infer<typeof schema>;

const InfoView = () => {
  const { getUser, editUser } = useUserService();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userFromStorage = localStorage.getItem("user");
        if (userFromStorage) {
          const fetchedUser = await getUser(JSON.parse(userFromStorage).id);
          setUserData(fetchedUser);
          setCedula(fetchedUser.cedula);
          setNombres(fetchedUser.nombres);
          setLastnames(fetchedUser.lastnames);
          setEmail(fetchedUser.email);
          setAddress(fetchedUser.address);
          setPhone(fetchedUser.phone);
          setUsername(fetchedUser.username);
          setDate(new Date(fetchedUser.birthdate));
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    loadUserData();
  }, []);
  const user = JSON.parse(localStorage.getItem("user")) as unknown as User;

  const fetchUserValues = async () => {
    return await getUser(user.id);
  };

  const userValues = fetchUserValues() as unknown as User;

  const [userData, setUserData] = useState<User>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: userValues.id,
      cedula: userValues.cedula,
      nombres: userValues.nombres,
      lastnames: userValues.lastnames,
      email: userValues.email,
      birthdate: userValues.birthdate,
      address: userValues.address,
      phone: userValues.phone,
      password: userValues.password,
      username: userValues.username,
    },
  });

  const [date, setDate] = useState(new Date());
  const [cedula, setCedula] = useState(userValues?.cedula || "");
  const [nombres, setNombres] = useState(userValues?.nombres || "");
  const [lastnames, setLastnames] = useState(userValues?.lastnames || "");
  const [email, setEmail] = useState(userValues?.email || "");
  const [address, setAddress] = useState(userValues?.address || "");
  const [phone, setPhone] = useState(userValues?.phone || "");
  const [username, setUsername] = useState(userValues?.username || "");

  const storedUser = localStorage.getItem("user");

  const onSubmit = (data: ExpenseFormData) => {
    const user = data as unknown as User;
    user.id = JSON.parse(storedUser as string).id;
    editUser(user)
      .then((res) => {
        messageService.success("Success", "Información actualizada");
      })
      .catch((error) => {
        messageService.error(error);
      });
  };

  const onDateChange = (newValue: Date) => {
    console.log(newValue);
    setDate(new Date(newValue));
    setValue("birthdate", new Date(newValue).toISOString());
    if (!register("birthdate")) {
      register("birthdate");
    }
  };

  if (!userData) {
    return <div></div>;
  }
  return (
    <>
      <VStack justifyContent={"center"} marginBottom="30px" spacing="24px">
        <Heading as="h1" size="xl">
          Sistema de Empleados
        </Heading>
      </VStack>
      <Card marginTop={0}>
        <CardHeader>
          <Heading size="md">Mi información</Heading>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            borderRadius={10}
            borderWidth="2px"
            overflow="hidden"
            borderColor={"teal"}
            padding={10}
          >
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem ms={6}>
                <FormLabel>Cédula</FormLabel>

                <Input
                  type="string"
                  defaultValue={cedula}
                  placeholder="1724034184"
                  {...register("cedula")}
                  aria-invalid={errors.cedula ? "true" : "false"}
                />
                {errors.cedula?.message && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>{errors.cedula?.message}</AlertTitle>
                  </Alert>
                )}
              </GridItem>
              <GridItem ms={6}>
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <SingleDatepicker
                  {...register("birthdate")}
                  name="Fecha de Nacimiento"
                  date={date}
                  onDateChange={onDateChange}
                />
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem ms={6}>
                <FormLabel>Nombres</FormLabel>

                <Input
                  type="string"
                  defaultValue={nombres}
                  placeholder="Juan"
                  {...register("nombres")}
                  aria-invalid={errors.nombres ? "true" : "false"}
                />
                {errors.nombres?.message && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>{errors.nombres?.message}</AlertTitle>
                  </Alert>
                )}
              </GridItem>
              <GridItem ms={6}>
                <FormLabel>Dirección de Domicilio</FormLabel>

                <Input
                  type="string"
                  defaultValue={address}
                  placeholder="San José"
                  {...register("address")}
                  aria-invalid={errors.address ? "true" : "false"}
                />
                {errors.address?.message && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>{errors.address?.message}</AlertTitle>
                  </Alert>
                )}
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem ms={6}>
                <FormLabel> Apellidos</FormLabel>
                <Input
                  defaultValue={lastnames}
                  type="string"
                  placeholder="Pérez"
                  {...register("lastnames")}
                  aria-invalid={errors.lastnames ? "true" : "false"}
                />
                {errors.lastnames?.message && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>{errors.lastnames?.message}</AlertTitle>
                  </Alert>
                )}
              </GridItem>
              <GridItem ms={6}>
                <FormLabel>teléfono Celular</FormLabel>
                <Input
                  type="string"
                  defaultValue={phone}
                  placeholder="0999999999"
                  {...register("phone")}
                  aria-invalid={errors.phone ? "true" : "false"}
                />
                {errors.phone?.message && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>{errors.phone?.message}</AlertTitle>
                  </Alert>
                )}
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem ms={6}>
                <FormLabel>Correo</FormLabel>
                <Input
                  defaultValue={email}
                  type="string"
                  placeholder="juan@mail.com"
                  {...register("email")}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email?.message && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>{errors.email?.message}</AlertTitle>
                  </Alert>
                )}
              </GridItem>
              <GridItem ms={6}>
                <FormLabel>Usuario</FormLabel>
                <Input
                  defaultValue={username}
                  type="string"
                  placeholder="ban@gmail.com"
                  {...register("username")}
                  aria-invalid={errors.username ? "true" : "false"}
                />
                {errors.username?.message && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>{errors.username?.message}</AlertTitle>
                  </Alert>
                )}
              </GridItem>
            </Grid>

            <Grid gap={6} ms={6}>
              <Button
                type="submit"
                mt={4}
                colorScheme="teal"
                whiteSpace="normal"
                textAlign="left"
              >
                Actualizar
              </Button>
            </Grid>
          </Box>
        </form>
      </Card>
    </>
  );
};

export default InfoView;
