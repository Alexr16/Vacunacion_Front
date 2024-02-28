import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const FormContainer = ({ children }: Props) => {
  return (
    <Box
      borderRadius={10}
      borderWidth="2px"
      overflow="hidden"
      borderColor={"teal"}
      padding={10}
    >
      {children}
    </Box>
  );
};

export default FormContainer;
