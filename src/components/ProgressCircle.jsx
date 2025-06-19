import React from "react";

import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme";

const ProgressCircle = ({ progress = "0.75 ", size = "40" }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
                     conic-gradient(${colors.blueAccent[500]} 0deg ${angle}deg,  ${colors.greenAccent[500]} ${angle}deg 360deg)`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
      }}
    />
  );
};

export default ProgressCircle;
