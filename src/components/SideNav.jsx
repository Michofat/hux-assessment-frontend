import { Avatar, Box, Typography, useTheme } from "@mui/material";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";

import { Link } from "react-router-dom";

function SideNav() {
  const { collapsed } = useProSidebar();
  const theme = useTheme();

  return (
    <Sidebar
      style={{ height: "100%", top: "auto" }}
      breakPoint="md"
      backgroundColor={theme.palette.neutral.light}
    >
      <Box sx={styles.avatarContainer}>
        <Avatar
          sx={styles.avatar}
          alt="Masoud"
          src="src/assets/avatar/ava.jpeg"
        />
        {!collapsed ? (
          <Typography variant="body2" sx={styles.yourChannel}>
            Administrator
          </Typography>
        ) : null}
        {!collapsed ? (
          <Typography variant="overline">X ELECTIONS</Typography>
        ) : null}
      </Box>

      <Menu
        menuItemStyles={{
          button: ({ active }) => {
            return {
              backgroundColor: active
                ? theme.palette.neutral.medium
                : undefined,
            };
          },
        }}
      >
        <MenuItem
          active={window.location.pathname === "/dashboard"}
          component={<Link to="/dashboard" />}
          icon={<DashboardOutlinedIcon />}
        >
          {" "}
          <Typography variant="body2">Dashboard</Typography>{" "}
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default SideNav;

/**
 * @type {import("@mui/material").SxProps}
 */
const styles = {
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    my: 5,
  },
  avatar: {
    width: "40%",
    height: "auto",
  },
  yourChannel: {
    mt: 1,
  },
};
