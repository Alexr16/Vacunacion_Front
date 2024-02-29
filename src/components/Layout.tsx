import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
import { ReactNode } from "react";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
  userRole: string;
}

export const Layout = ({ children, userRole }: Props) => {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <Show below="lg">
        <GridItem area="nav">
          <Navbar userRole={userRole} isMobile={true} />
        </GridItem>
      </Show>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <Navbar userRole={userRole} isMobile={false} />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box>{children}</Box>
      </GridItem>
    </Grid>
  );
};
