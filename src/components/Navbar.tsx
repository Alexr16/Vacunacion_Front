import { IconButton } from "@chakra-ui/button";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { AddIcon, SmallCloseIcon, SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { List, ListItem, HStack, Button, Card } from "@chakra-ui/react";

interface Props {
  userRole: string;
  isMobile?: boolean;
}

const Navbar = ({ userRole, isMobile }: Props) => {
  const navigate = useNavigate();

  const onLogout = () => {
    console.log("logout");
    navigate("/");
  };

  return (
    <>
      <Card maxW="md" width={"100%"} align="center" padding={"15px"}>
        {isMobile ? (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              {userRole === "Admin" && (
                <>
                  <MenuItem icon={<AddIcon />} command="⌘N">
                    Admin Page
                  </MenuItem>
                </>
              )}
              <MenuItem
                icon={<SmallCloseIcon />}
                command="⌘O"
                onClick={onLogout}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <List>
            {userRole === "Admin" && (
              <>
                <ListItem key={1} paddingY="5px">
                  <HStack>
                    <IconButton aria-label="Admin Page" icon={<SearchIcon />} />
                    <Button
                      whiteSpace="normal"
                      textAlign="left"
                      fontSize="lg"
                      variant="link"
                    >
                      Admin Page
                    </Button>
                  </HStack>
                </ListItem>
              </>
            )}
            <ListItem key={2} paddingY="5px">
              <HStack>
                <IconButton
                  aria-label="Logout"
                  icon={<SmallCloseIcon />}
                  onClick={onLogout}
                />
                <Button
                  onClick={onLogout}
                  whiteSpace="normal"
                  textAlign="left"
                  fontSize="lg"
                  variant="link"
                >
                  Salir
                </Button>
              </HStack>
            </ListItem>
          </List>
        )}
      </Card>
    </>
  );
};

export default Navbar;
