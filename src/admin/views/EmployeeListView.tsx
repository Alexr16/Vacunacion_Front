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
  Grid,
  IconButton,
  Td,
  Th,
  Thead,
  Tbody,
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
  //const { getUsers } = useUserService();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    config.setValue(event.target.value);
    //getUsers(event.target.value).then((data) => {
    //config.setUsers(data);
    //});
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
  //const { getUsers, deleteUser } = useUserService();
  const [users, setUsers] = useState<User[]>();
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [open, setOpen] = useState(false);

  const [startedDate, setStartedDate] = useState(new Date());
  const [endedDate, setEndedDate] = useState(new Date());
  const [state, setState] = useState("");
  const [type, setType] = useState("");

  //useEffect(() => {
  //loadUsers();
  //}, []);

  const editRow = (row) => {
    setOpen(true);
  };

  const deleteRow = (row: User) => {
    // deleteUser(row.id)
    // .then((user) => {
    // setUsers(users.filter((u) => u.id !== user.id));
    // })
    //.catch((e) => {
    // messageService.error(e);
    //});
    console.log(row);
  };

  const selectRow = (row) => {
    setSelectedRow(row);
  };

  const loadUsers = (search = "", startedDate = "", endedDate = "") => {
    //setLoading(true);
    //getUsers(search, startedDate, endedDate)
    //.then((data) => {
    //setUsers(data);
    //setLoading(false);
    //  })
    // .catch((error) => {
    //   setLoading(false);
    // });
    console.log(search);
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <TableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          gap: 1,
        }}
      >
        <Grid justifyContent="space-between" alignItems="center" padding={20}>
          <SingleDatepicker
            name="Fecha inicial Vacunación"
            date={startedDate}
            onDateChange={(newValue) => {
              setStartedDate(newValue);
              // getUsers(
              //  "",
              //  newValue.toLocaleDateString(),
              //  endedDate.toLocaleDateString()
              // )
              //   .then((data) => {
              //     setUsers(data);
              //   })
              //   .catch((error) => {
              //     console.log(error);
              //   });
            }}
          />
          <SingleDatepicker
            name="Fecha final Vacunación"
            date={endedDate}
            onDateChange={(newValue) => {
              setEndedDate(newValue);
              getUsers(
                "",
                startedDate.toLocaleDateString(),
                newValue.toLocaleDateString()
              )
                .then((data) => {
                  setUsers(data);
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          />
          <SelectFilter
            config={{
              data: ["Vacunado", "No vacunado"],
              label: "Estado de vacunación",
              value: state,
              setValue: setState,
              users: users,
              setUsers: setUsers,
            }}
          />
          <SelectFilter
            config={{
              data: ["", "Sputnik", "AstraZeneca", "Pfizer", "Jhonson&Jhonson"],
              label: "Tipo Vacuna",
              value: type,
              setValue: setType,
              users: users,
              setUsers: setUsers,
            }}
          />
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
            {users.map((row: User) => (
              <Tr
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => selectRow(row)}
              >
                <Td align="right">{row.cedula}</Td>
                <Td align="right">{row.names}</Td>
                <Td align="right">{row.lastnames}</Td>
                <Td align="right">{row.email}</Td>
                <Td align="right">
                  {row.vaccineDate ? row.vaccineDate : "No Aplica"}
                </Td>
                <Td align="right">
                  {row.vaccineType ? row.vaccineType : "No Aplica"}
                </Td>
                <Td align="right">
                  <IconButton
                    aria-label="Ledit"
                    icon={<EditIcon />}
                    onClick={() => editRow(row)}
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
  );
};
