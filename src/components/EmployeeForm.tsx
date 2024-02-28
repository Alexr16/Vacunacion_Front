import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useUserService from "../hooks/useUserService";
import { messageService } from "../services/messageService";
import { User } from "../services/useAuthService";
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
  Modal,
  GridItem,
} from "@chakra-ui/react";
import FormContainer from "./FormContainer";
import { AddIcon } from "@chakra-ui/icons";

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
});

type ExpenseFormData = z.infer<typeof schema>;

const EmployeeForm = (
  open: boolean,
  setOpen: (open: boolean) => void,
  setUsers: (users: User[]) => void,
  users: User[],
  setSelectedRow: (row: User) => void,
  employee: User
) => {
  const defaultValues = {
    id: employee?.id,
    cedula: employee?.cedula,
    names: employee?.names,
    lastnames: employee?.lastnames,
    email: employee?.email,
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(schema),
  });

  //const { storeUser, editUser } = useUserService();
  //useEffect(() => {
  //if (employee) {
  //  for (const key in defaultValues) {
  //  setValue(
  //   key as keyof ExpenseFormData,
  //   defaultValues[key as keyof ExpenseFormData]
  //    );
  //    }
  //    }
  // }, [employee]);

  const onSubmit = (data: User) => {
    // if (employee?.id) {
    //   editUser(data)
    //    .then((user) => {
    //       setUsers(users.map((u) => (u.id === user.id ? user : u)));
    //       handleClose();
    //       messageService.success("Success", "Usuario actualizado con éxito");
    //     })
    //     .catch((err) => {
    //       messageService.error(err);
    //     });
    // } else {
    //   const repeatedCedula = users.find(
    //     (user: User) => user.cedula === data.cedula
    //   );
    //   if (repeatedCedula) {
    //     messageService.error("Ya existe un usuario con esa cédula");
    //     return;
    //  }

    data.username = data.email;
    data.password = data.cedula;
    data.isVaccinated = false;
    data.role = "Employee";

    // storeUser(data)
    // .then((response) => {
    // messageService.success("Success", "Usuario creado con éxito");
    // handleClose();
    // setUsers([...users, response]);
    // })
    //  .catch((error) => {
    //    console.log(error);
    //  });
    // }
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    // setOpen(false);
    // setSelectedRow(null);
    // reset();
  };
  return (
    <>
      <>
        <Button onClick={handleOpen} leftIcon={<AddIcon />}>
          Nuevo Empleado
        </Button>
        <Modal
          isOpen={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Card
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
            }}
          >
            <CardHeader title={employee ? "Editar" : "Crear"} />
            <form
              onSubmit={handleSubmit((data: ExpenseFormData) => {
                console.log(data);
                //onSubmit(data: User);
                reset();
              })}
            >
              <Grid>
                <GridItem sx={{ mt: 2 }}>
                  <label htmlFor="Cédula" className="form-label">
                    Cédula
                  </label>
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
                <GridItem sx={{ mt: 2 }}>
                  <label htmlFor="Nombres" className="form-label">
                    Nombres
                  </label>
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
                <GridItem sx={{ mt: 2 }}>
                  <label htmlFor="Last Names" className="form-label">
                    Last names
                  </label>
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
                <GridItem sx={{ mt: 2 }}>
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <Input
                    type="email"
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

                <GridItem sx={{ mt: 2 }}>
                  <Button variant="contained" type="submit">
                    Guardar
                  </Button>
                </GridItem>
              </Grid>
            </form>
          </Card>
        </Modal>
      </>
    </>
  );
};

export default EmployeeForm;
