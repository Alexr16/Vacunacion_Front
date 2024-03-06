import { useEffect, useState } from "react";
import { get, useForm } from "react-hook-form";
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
  Spinner,
  GridItem,
  Select,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import useUserService from "../../hooks/useUserService";
import { User } from "../../services/useAuthService";
import { messageService } from "../../services/messageService";
import { set } from "date-fns";

const schema = z.object({
  isVaccinated: z.boolean(),
  vaccineType: z.string().optional(),
  vaccineDate: z.string().optional(),
  doseNumber: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export const VaccineView = () => {
  const { getUser, editUser } = useUserService();
  const user = JSON.parse(localStorage.getItem("user")) as unknown as User;

  const fetchUserValues = async () => {
    return await getUser(user.id);
  };

  const userValues = fetchUserValues() as unknown as User;

  const [userData, setUserData] = useState<User>();
  const [type, setType] = useState(userValues?.vaccineType || "");
  const [doseNumber, setDoseNumber] = useState(userValues?.doseNumber || "");
  const [date, setDate] = useState(
    userValues?.vaccineDate ? new Date(userValues.vaccineDate) : new Date()
  );
  const [state, setState] = useState(
    doseNumber ? true : userValues?.isVaccinated
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      isVaccinated: userValues.isVaccinated,
      vaccineType: userValues.vaccineType,
      vaccineDate: userValues.vaccineDate,
      doseNumber: userValues.doseNumber,
    },
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userFromStorage = localStorage.getItem("user");
        if (userFromStorage && !userData) {
          const fetchedUser = await getUser(JSON.parse(userFromStorage).id);
          setUserData(fetchedUser);
          setType(fetchedUser.vaccineType);
          setDoseNumber(fetchedUser.doseNumber);
          setDate(new Date(fetchedUser.vaccineDate));
          setState(fetchedUser.doseNumber ? true : fetchedUser.isVaccinated);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    loadUserData();
  }, []);

  const onSubmit = (data: FormData) => {
    const updatedUser = { ...userData, ...data };
    console.log(data);
    console.log(updatedUser);

    editUser(updatedUser as unknown as User)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        messageService.success("Success", "Información actualizada");
      })
      .catch((error) => {
        messageService.error(error);
      });
  };

  const onDateChange = (newValue: Date) => {
    setDate(newValue);
    setValue("vaccineDate", newValue.toISOString());
  };
  if (!userData) {
    return <Spinner />;
  }
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Vacunación</Heading>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          borderRadius={10}
          borderWidth="2px"
          overflow="hidden"
          borderColor="teal"
          padding={10}
        >
          <Grid
            templateColumns={
              state === true ? "repeat(2, 1fr)" : "repeat(1, 1fr)"
            }
            gap={6}
          >
            <GridItem>
              <FormControl>
                <FormLabel>¿Está vacunado?</FormLabel>
                <Switch
                  {...register("isVaccinated")}
                  onChange={() => setState(!state)}
                  isChecked={state}
                />
                {errors.isVaccinated && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>Debe indicar si está vacunado o no.</AlertTitle>
                  </Alert>
                )}
              </FormControl>
            </GridItem>
            {state && (
              <>
                <GridItem>
                  <FormControl>
                    <FormLabel>Tipo de Vacuna</FormLabel>
                    <Select
                      id="type-select"
                      value={type}
                      {...register("vaccineType")}
                      onChange={(event) => {
                        setType(event.target.value);
                      }}
                    >
                      {[
                        "",
                        "Sputnik",
                        "AstraZeneca",
                        "Pfizer",
                        "Johnson&Johnson",
                      ].map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormLabel>Fecha de Vacunación</FormLabel>
                  <SingleDatepicker
                    name="vaccineDate"
                    date={date}
                    onDateChange={onDateChange}
                  />
                </GridItem>
                <GridItem>
                  <FormLabel>Número de Dosis</FormLabel>
                  <Input
                    {...register("doseNumber")}
                    type="text"
                    placeholder="Número de dosis"
                    defaultValue={doseNumber}
                  />
                </GridItem>
              </>
            )}
          </Grid>
          <Button type="submit" mt={4} colorScheme="teal">
            Guardar
          </Button>
        </Box>
      </form>
    </Card>
  );
};
