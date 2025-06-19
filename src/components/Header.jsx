import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //  {theme.palette.mode === "dark"
  //         ? { title: "black" }
  //         : { title: "white" }}

  return (
    <Box m="5px">
      <Typography
        variant="h2"
        // color={colors.grey[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        sx={{ mb: "5px" }}
        color={colors.greenAccent[400]}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
