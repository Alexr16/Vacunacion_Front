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
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(schema),
  });
  const formattedDate = (date: Date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  const { getUser, editUser } = useUserService();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      for (const key in userObj) {
        const value = userObj[key as keyof ExpenseFormData];
        if (value !== null) {
          if (String(key) === "birthdate") {
            setValue(
              key as keyof ExpenseFormData,
              new Date(userObj[key]).toISOString()
            );
            setDate(new Date(userObj[key]));
          } else {
            setValue(key as keyof ExpenseFormData, userObj[key]);
          }
        }
      }
    }
  }, []);

  const onSubmit = (data: ExpenseFormData) => {
    editUser(data as unknown as User)
      .then((user) => {
        messageService.success("Success", "Usuario actualizado");
        for (const key in user) {
          setValue(key as keyof ExpenseFormData, user[key]);
        }
      })
      .catch((err) => {
        messageService.error(err);
      });
    console.log(data);
  };

  const onDateChange = (newValue: Date) => {
    console.log(newValue);
    setDate(new Date(newValue));
    setValue("birthdate", formattedDate(new Date(newValue)));
    if (!register("birthdate")) {
      register("birthdate");
    }
  };

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
        <form>
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
                onClick={handleSubmit(onSubmit)}
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
