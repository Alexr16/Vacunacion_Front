import EmployeeForm from "../../components/EmployeeForm";
import useUserService from "../../hooks/useUserService";
import { useEffect, useState } from "react";
import { messageService } from "../../services/messageService";
import { User } from "../../services/useAuthService";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Input,
  Table,
  TableContainer,
  GridItem,
  Grid,
  IconButton,
  Td,
  Th,
  Thead,
  Tbody,
  VStack,
  Heading,
  Tr,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { SmallCloseIcon, EditIcon } from "@chakra-ui/icons";

interface Config {
  data: ["Vacunado", "No vacunado"];
  label: "Estado de vacunación";
  value: string;
  setValue: (value: string) => void;
  users: User[] | null;
  setUsers: (users: User) => void;
}

const SelectFilter = (config: Config) => {
  const { getUsers } = useUserService();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    config.setValue(event.target.value);
    getUsers(event.target.value).then((data) => {
      config.setUsers(data);
    });
  };

  return (
    <Box sx={{ minWidth: 180 }}>
      <FormControl
        style={{
          margin: 10,
        }}
      >
        <Input id="demo-simple-select-label">{config.label}</Input>
        <Select
          id="demo-simple-select"
          value={config.value}
          onChange={(e) => handleChange(e)}
        >
          {config.data.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export const EmployeeListView = () => {
  const { getUsers, deleteUser, getAllUsers } = useUserService();
  const [users, setUsers] = useState<User[]>();
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [open, setOpen] = useState(false);

  const [startedDate, setStartedDate] = useState(new Date());
  const [endedDate, setEndedDate] = useState(new Date());
  const [state, setState] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    async function fetchData() {
      setUsers(await getAllUsers());
    }
    fetchData();
  }, []);

  const editRow = (row) => {
    setOpen(true);
  };

  const deleteRow = (row: User) => {
    deleteUser(row.id)
      .then((user) => {
        setUsers(users?.filter((u) => u.id !== row.id));
      })
      .catch((e) => {
        messageService.error(e);
      });
  };

  const selectRow = (row) => {
    setSelectedRow(row);
  };

  const loadUsers = (search = "", startedDate = "", endedDate = "") => {
    setLoading(true);
    getUsers(search, startedDate, endedDate)
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
    console.log(search);
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <>
      <VStack justifyContent={"center"} marginBottom="30px" spacing="24px">
        <Heading as="h1" size="xl">
          Sistema de Administradores
        </Heading>
        <Heading fontSize="4xl">LISTA DE EMPLEADOS</Heading>
      </VStack>
      <TableContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            gap: 1,
          }}
        >
          <EmployeeForm
            open={open}
            setOpen={setOpen}
            setUsers={setUsers}
            users={users}
            setSelectedRow={setSelectedRow}
            employee={selectedRow}
          />
          <Grid
            templateColumns="repeat(3, 1fr)"
            gap={6}
            justifyContent="space-between"
            alignItems="center"
            padding={20}
          >
            <GridItem ms={6}></GridItem>

            <GridItem ms={6}>
              <SingleDatepicker
                name="Fecha inicial Vacunación"
                date={startedDate}
                onDateChange={(newValue) => {
                  const newStartedDate = new Date(newValue);
                  setStartedDate(newStartedDate);

                  const filteredUsers = users?.filter((u) => {
                    const vaccineDate = new Date(u.vaccineDate);
                    return (
                      vaccineDate >= newStartedDate && vaccineDate <= endedDate
                    );
                  });

                  setUsers(filteredUsers);
                }}
              />
            </GridItem>

            <GridItem ms={6}>
              <SingleDatepicker
                name="Fecha final Vacunación"
                date={endedDate}
                onDateChange={(newValue) => {
                  const newEndDate = new Date(newValue);
                  setEndedDate(newEndDate);

                  const filteredUsers = users?.filter((u) => {
                    const vaccineDate = new Date(u.vaccineDate);
                    return (
                      vaccineDate >= startedDate && vaccineDate <= newEndDate
                    );
                  });

                  setUsers(filteredUsers);
                }}
              />
            </GridItem>
          </Grid>
        </Box>
        <Box
          borderWidth="2px"
          overflow="hidden"
          borderColor={"teal"}
          padding={10}
        >
          <Table aria-label="simple table" size="sm">
            <Thead>
              <Tr>
                <Th align="right">Cédula</Th>
                <Th align="right">Nombres</Th>
                <Th align="right">Apellidos</Th>
                <Th align="right">Correo</Th>
                <Th align="right">Fecha de Vacunación</Th>
                <Th align="right">Tipo de Vacuna</Th>
                <Th align="right">Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users?.map((row: User) => (
                <Tr
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => selectRow(row)}
                >
                  <Td align="right">{row.cedula}</Td>
                  <Td align="right">{row.nombres}</Td>
                  <Td align="right">{row.lastnames}</Td>
                  <Td align="right">{row.email}</Td>
                  <Td align="right">
                    {row.vaccineDate ? row.vaccineDate.toString() : "No Aplica"}
                  </Td>
                  <Td align="right">
                    {row.vaccineType ? row.vaccineType : "No Aplica"}
                  </Td>
                  <Td align="right">
                    <IconButton
                      aria-label="Ledit"
                      icon={<EditIcon />}
                      onClick={() => editRow(row)}
                      marginRight={1}
                    />
                    <IconButton
                      aria-label="delete"
                      icon={<SmallCloseIcon />}
                      onClick={() => deleteRow(row)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </TableContainer>
    </>
  );
};
