import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useUserService from "../../hooks/useUserService";
import { messageService } from "../../services/messageService";
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
import { User } from "../../services/useAuthService";

const schema = z.object({
  id: z.string().optional(),
  isVaccinated: z.boolean().optional(),
  vaccineType: z.string().optional(),
  vaccineDate: z.date().optional(),
  doseNumber: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export const VaccineView = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [type, setType] = useState("");
  const [date, setDate] = useState<Date>();
  const [state, setState] = useState(false);

  const { getUser, editUser } = useUserService();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      for (const key in userObj) {
        const value = [key as keyof FormData];
        if (value !== null) {
          setValue(key as keyof FormData, userObj[key]);
        }
      }
    }
  }, []);

  const onSubmit = (data: FormData) => {
    editUser(data as unknown as User)
      .then((res) => {
        messageService.success("Success", "Información actualizada");
        for (const key in res) {
          setValue(key as keyof FormData, res[key]);
        }
      })
      .catch((error) => {
        messageService.error(error);
      });
  };

  const onDateChange = (newValue: Date) => {
    setDate(newValue);
    setValue("vaccineDate", newValue);
    if (!register("vaccineDate")) {
      register("vaccineDate");
    }
  };

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Vacunación</Heading>
      </CardHeader>
      <form>
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
                <FormControl
                  onChange={() => {
                    setState(!state);
                  }}
                >
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
                      onChange={(
                        event: React.ChangeEvent<HTMLSelectElement>
                      ) => {
                        const selectedValue = event.target.value;
                        setType(selectedValue);
                        setValue("vaccineType", selectedValue);
                      }}
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
                    onDateChange={onDateChange}
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
              onClick={handleSubmit(onSubmit)}
            >
              Guardar
            </Button>
          </Grid>
        </Box>
      </form>
    </Card>
  );
};
