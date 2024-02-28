import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useUserService from "../../hooks/useUserService";
import { messageService } from "../../services/messageService";
import useAuthService from "../../services/useAuthService";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Switch,
  Alert,
  AlertIcon,
  AlertTitle,
  Grid,
  Heading,
  Box,
  Card,
  CardHeader,
  GridItem,
  Select,
} from "@chakra-ui/react";
import FormContainer from "./FormContainer";
import { AddIcon } from "@chakra-ui/icons";
import { SingleDatepicker } from "chakra-dayzed-datepicker";

const schema = z.object({
  id: z.string(),
  isVaccinated: z.boolean(),
  vaccineType: z.string(),
  vaccineDate: z.date(),
  doseNumber: z.string(),
});

type ExpenseFormData = z.infer<typeof schema>;

export const VaccineView = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: " ",
      isVaccinated: false,
      vaccineType: " ",
      vaccineDate: new Date(), // Update the value to be of type Date
      doseNumber: "0",
    },
  });

  const [type, setType] = useState("");
  const [date, setDate] = useState(new Date());
  const [state, setState] = useState(false);

  //  const { getUser, editUser } = useUserService();

  //const { getUser: loggedUser } = useAuthService();

  //useEffect(() => {
  //  getUser(loggedUser().id)
  //    .then((user) => {
  //      for (const key in user) {
  //        setValue(key as keyof ExpenseFormData, user[key]);
  //     }
  //     user.vaccineDate && setDate(user.vaccineDate);
  //     setState(user.isVaccinated);
  //     user.vaccineType && setType(user.vaccineType);
  //   })
  //   .catch((err) => {
  //     messageService.error(err);
  //   });
  //}, []);

  const onSubmit = (data: ExpenseFormData) => {
    //editUser(data)
    //  .then((res) => {
    //   messageService.success("Success", "Información actualizada");
    //   for (const key in res) {
    //     setValue(key as keyof ExpenseFormData, res[key]);
    //   }
    // })
    // .catch((error) => {
    //   messageService.error(error);
    // });
    console.log(data);
  };

  const handleType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
    setValue("vaccineType", event.target.value);
  };

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Vacunación</Heading>
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
          <Grid>
            <Grid
              templateColumns={
                state === true ? "repeat(2, 1fr)" : "repeat(1, 1fr)"
              }
              gap={6}
            >
              <GridItem ms={6}>
                <FormControl onChange={() => setState(!state)}>
                  <FormLabel>¿Está vacunado?</FormLabel>
                  <Switch checked={state} {...register("isVaccinated")} />
                </FormControl>
                {errors.isVaccinated?.message && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>{errors.isVaccinated?.message}</AlertTitle>
                  </Alert>
                )}
              </GridItem>
              {state === true && (
                <GridItem ms={6}>
                  <FormControl>
                    <FormLabel>Tipo de Vacuna</FormLabel>
                    <Select
                      id="type-select"
                      value={type}
                      onChange={(e) => handleType(e)}
                      defaultValue={type}
                    >
                      {[
                        "",
                        "Sputnik",
                        "AstraZeneca",
                        "Pfizer",
                        "Jhonson&Jhonson",
                      ].map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
              )}
            </Grid>
            {state === true && (
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <GridItem ms={6}>
                  <FormLabel>Fecha de Vacunacion</FormLabel>

                  <SingleDatepicker
                    name="Fecha de Vacunacion"
                    date={date}
                    onDateChange={(newValue) => {
                      setDate(newValue);
                      setValue("vaccineDate", newValue);
                    }}
                  />
                </GridItem>
                <GridItem ms={6}>
                  <FormLabel>Número de Dosis</FormLabel>

                  <Input
                    type="string"
                    placeholder="1724034184"
                    {...register("doseNumber")}
                    aria-invalid={errors.doseNumber ? "true" : "false"}
                  />
                  {errors.doseNumber?.message && (
                    <Alert status="error">
                      <AlertIcon />
                      <AlertTitle>{errors.doseNumber?.message}</AlertTitle>
                    </Alert>
                  )}
                </GridItem>
              </Grid>
            )}
          </Grid>
          <Grid sx={{ mt: 2 }}>
            <Button
              type="submit"
              mt={4}
              colorScheme="teal"
              whiteSpace="normal"
              textAlign="left"
            >
              Guardar
            </Button>
          </Grid>
        </Box>
      </form>
    </Card>
  );
};
