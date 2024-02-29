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
  GridItem,
  Select,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import useUserService from "../../hooks/useUserService";
import { User } from "../../services/useAuthService";
import { messageService } from "../../services/messageService";

const schema = z.object({
  id: z.string().optional(),
  isVaccinated: z.boolean(),
  vaccineType: z.string().optional(),
  vaccineDate: z.date().optional(),
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
  const [type, setType] = useState(userData?.vaccineType || "");
  const [date, setDate] = useState<Date>(userData?.vaccineDate || new Date());
  const [state, setState] = useState(userData?.isVaccinated || false);
  const [doseNumber, setDoseNumber] = useState(userData?.doseNumber || "");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: userValues.id,
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
        if (userFromStorage) {
          const fetchedUser = await getUser(JSON.parse(userFromStorage).id);
          setUserData(fetchedUser);
          setState(fetchedUser.isVaccinated);
          setType(fetchedUser.vaccineType);
          setDate(new Date(fetchedUser.vaccineDate));
          setDoseNumber(fetchedUser.doseNumber);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    loadUserData();
  }, []);

  const storedUser = localStorage.getItem("user");

  const onSubmit = (data: FormData) => {
    const user = data as unknown as User;
    user.id = JSON.parse(storedUser as string).id;
    editUser({
      id: user.id,
      vaccineDate: date,
      vaccineType: type,
      isVaccinated: state,
      doseNumber: doseNumber,
    })
      .then((res) => {
        messageService.success("Success", "Información actualizada");
      })
      .catch((error) => {
        messageService.error(error);
      });
  };

  const onDateChange = (newValue: Date) => {
    setDate(newValue);
  };
  if (!userData) {
    return <div>Loading...</div>;
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
                      onChange={(event) => {
                        setType(event.target.value);
                        register("vaccineType").onChange(event); // Manually trigger the form register's onChange event
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
                    type="text"
                    placeholder="Número de dosis"
                    defaultValue={doseNumber}
                    {...register("doseNumber")}
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
