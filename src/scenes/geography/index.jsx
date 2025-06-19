import React from "react";
import { Box, colors } from "@mui/material";
import Header from "../../components/Header";
import GeographyChart from "../../components/GeoChart";

const Geography = () => {
  return (
    <Box m="20px">
      <Header title="Geo Chart" subtitle="Simple Geo Chart" />
      <Box
        height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
        overflow="hidden"
      >
        <GeographyChart />
      </Box>
    </Box>
  );
};
export default Geography;
