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
  IconButton,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { AddIcon } from "@chakra-ui/icons";

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
  username: z.string().optional(),
  password: z.string().optional(),
  role: z.string().optional(),
  isVaccinated: z.string().optional(),
  email: z
    .string()
    .email({ message: "Este campo no puede estar vacio" })
    .optional(),
});

type ExpenseFormData = z.infer<typeof schema>;

interface EmployeeFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  users: User[];
  setSelectedRow: React.Dispatch<React.SetStateAction<User>>;
  employee: User;
}

const EmployeeForm = ({
  open,
  setOpen,
  setUsers,
  users,
  setSelectedRow,
  employee,
}: EmployeeFormProps) => {
  const defaultValues = {
    id: employee?.id,
    cedula: employee?.cedula,
    nombres: employee?.nombres,
    lastnames: employee?.lastnames,
    email: employee?.email,
    username: employee?.username,
    password: employee?.password,
    isVaccinated: employee?.isVaccinated,
    role: employee?.role,
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

  const { storeUser, editUser } = useUserService();
  useEffect(() => {
    if (employee) {
      for (const key in defaultValues) {
        const value = defaultValues[key as keyof ExpenseFormData];
        if (value !== null) {
          setValue(key as keyof ExpenseFormData, String(value));
        }
      }
    }
  }, [employee]);

  const onSubmit = (data: ExpenseFormData) => {
    const updatedUser = { ...employee, ...data };
    if (employee?.id) {
      editUser(updatedUser as unknown as User)
        .then((response) => {
          handleClose();
          setUsers(users.map((u) => (u.id === response.id ? response : u)));
          messageService.success("Success", "Usuario actualizado con éxito.");
        })
        .catch((err) => {
          messageService.error(err);
        });
    } else {
      const repeatedCedula = users.find(
        (user: User) => user.cedula === data.cedula
      );
      if (repeatedCedula) {
        messageService.error("Ya existe un usuario con esa cédula");
        return;
      }

      data.username = data.email;
      data.password = "123456";
      data.isVaccinated = "false";
      data.role = "employee";
      console.log(data);
      storeUser(data as unknown as User)
        .then((response) => {
          messageService.success(
            "Success",
            `Usuario creado con éxito. New username: ${response.username}, New password: ${response.password}`
          );
          handleClose();
          setUsers([...users, response]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
    reset();
  };
  return (
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
          <form>
            <Grid>
              <GridItem sx={{ mt: 2 }}>
                <IconButton
                  aria-label="Close"
                  icon={<SmallCloseIcon />}
                  onClick={handleClose}
                />
              </GridItem>

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
              <GridItem sx={{ mt: 2 }}>
                <label htmlFor="Apellidos" className="form-label">
                  Apellidos
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
              </GridItem>
            </Grid>
          </form>
        </Card>
      </Modal>
    </>
  );
};

export default EmployeeForm;
