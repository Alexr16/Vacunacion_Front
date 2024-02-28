import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useUserService from "../../hooks/useUserService";
import { messageService } from "../../services/messageService";
import useAuthService from "../../services/useAuthService";
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
  CardHeader,
  Box,
  Heading,
  FormLabel,
  GridItem,
} from "@chakra-ui/react";
import FormContainer from "./FormContainer";
import { AddIcon } from "@chakra-ui/icons";
import { SingleDatepicker } from "chakra-dayzed-datepicker";

const namesRegex = /^[a-zA-Z\s]*$/;
const numbersRegex = /^[0-9]*$/;

const schema = z.object({
  id: z.string(),
  cedula: z
    .string()
    .min(10)
    .max(10)
    .regex(numbersRegex, "Solo se permiten números"),
  names: z.string().regex(namesRegex),
  lastnames: z.string().regex(namesRegex),
  email: z.string().email({ message: "Este campo no puede estar vacio" }),
  birthdate: z.date(),
  address: z.string(),
  phone: z.string(),
  password: z.string(),
  username: z.string().email(),
});

type ExpenseFormData = z.infer<typeof schema>;

const InfoView = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: "",
      cedula: "",
      names: "",
      lastnames: "",
      email: "",
      birthdate: new Date(),
      address: "",
      phone: "",
      username: "",
    },
  });

  //const { getUser, editUser } = useUserService();
  //const { getUser: loggedUser } = useAuthService();
  const [date, setDate] = useState(new Date());

  //useEffect(() => {
  //  getUser(loggedUser().id)
  //    .then((res) => {
  //      for (const key in res) {
  //        setValue(key as keyof ExpenseFormData, res[key]);
  //      }
  //      res.birthdate && setDate(res.birthdate);
  //    })
  //    .catch((err) => {
  //      messageService.error(err);
  //    });
  // }, []);

  const onSubmit = (data: ExpenseFormData) => {
    //editUser(user)
    //  .then((user) => {
    //    messageService.success("Success", "Usuario actualizado");
    //    for (const key in user) {
    //      setValue(key as keyof ExpenseFormData, user[key]);
    //    }
    //  })
    //  .catch((err) => {
    //    messageService.error(err);
    //  });
    console.log(data);
  };

  return (
    <>
      <Card marginTop={0}>
        <CardHeader>
          <Heading size="md">Mi información</Heading>
        </CardHeader>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
            onSubmit(data);
            reset();
          })}
        >
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
                  onDateChange={(newValue) => {
                    setDate(newValue);
                    setValue("birthdate", newValue);
                  }}
                />
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem ms={6}>
                <FormLabel>Nombres</FormLabel>

                <Input
                  type="text"
                  placeholder="Juan"
                  {...register("names")}
                  aria-invalid={errors.names ? "true" : "false"}
                />
                {errors.names?.message && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>{errors.names?.message}</AlertTitle>
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
                  type="text"
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
