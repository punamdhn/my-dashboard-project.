import React from "react";
import { Box, useTheme, IconButton } from "@mui/material";
import { ColormodeContext, tokens } from "../../theme";
import { useContext } from "react";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Styled from "@emotion/styled";

const styledBox = Styled(Box);

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColormodeContext);
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <styledBox
        sx={{
          display: "flex",
          background: `${colors.primary[400]} !important`,
          borderRadius: "3px",
        }}
      >
        <InputBase
          sx={{
            ml: 2,
            flex: 1,
            // border: "1px solid gray",
            text: "black",

            // background: `${colors.primary[400]} !important`,
          }}
          placeholder="Search"
        />

        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </styledBox>

      {/* icon */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsNoneOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
export default Topbar;
