import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import React, { useRef } from "react";
import {
  mockBarData,
  mockGeographyData,
  mockLineData,
  mockTransactions,
} from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PointOfSaleOutlinedIcon from "@mui/icons-material/PointOfSaleOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import TrafficOutlinedIcon from "@mui/icons-material/TrafficOutlined";
import ProgressCircle from "../../components/ProgressCircle";
import StatBox from "../../components/StatBox";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeoChart";
import BarChart from "../../components/BarChart";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { mockPieData } from "../../data/mockData";
import { toPng } from "html-to-image";

const TYPE_FILE_NAME_MAP = {
  transaction: "Recent_Transaction",
  champion: "Champion",
  revenue: "Revenue_Generated",
  sales: "Sales_Quantity",
  geography: "Geography_Based_Traffic",
};

const handleExportToExcel = (type) => {
  let data = [];

  // Prepare the data you want to export
  if (type === "transaction") {
    data = mockTransactions.map((transaction) => ({
      TransactionID: transaction.txId,
      User: transaction.user,
      Date: transaction.date,
      Cost: transaction.cost,
    }));
  }

  if (type === "champion") {
    data = mockPieData.map((champion) => ({
      id: champion.id,
      label: champion.label,
      value: champion.value,
      color: champion.color,
    }));
  }

  if (type === "revenue") {
    data = mockLineData.map((revenue) => ({
      id: revenue.id,
      color: revenue.color,
      data: JSON.stringify(revenue.data, null, 2)
        .replace(/"/g, "'")
        .replace(/:/g, ": "),
    }));
  }

  if (type === "sales") {
    data = mockBarData.map((sales) => ({
      Country: sales.country,
      burger: sales.burger,
      burgerColor: sales.burgerColor,
      kebab: sales.kebab,
      kebabColor: sales.kebabColor,
      donut: sales.donut,
      donutColor: sales.donutColor,
    }));
  }
  if (type === "geography") {
    data = mockGeographyData.map((geography) => ({
      id: geography.id,
      value: geography.value,
    }));
    console.log(data);
  }

  //   // Create a worksheet from the data
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, TYPE_FILE_NAME_MAP[type]);
  // If you want to add another worksheet, you can do so like this:
  // XLSX.utils.book_append_sheet(workbook, worksheet1, "champion");

  // Generate a buffer
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // Create a Blob from the buffer
  const dataBlob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  // Save the file using FileSaver
  saveAs(dataBlob, `${TYPE_FILE_NAME_MAP[type]}.xlsx`);
};

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const geographyChartRef = useRef(null);
  const progressCircleRef = useRef(null);

  // Function to download a component as PNG
  const downloadAsPng = (ref, fileName) => {
    if (ref.current) {
      ref.current.classList.add("fullscreen-capture");

      setTimeout(() => {
        toPng(ref.current, { cacheBust: true })
          .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = `${fileName}.png`;
            link.href = dataUrl;
            link.click();
          })
          .catch((err) => {
            console.error("Failed to download image", err);
          })
          .finally(() => {
            // Remove the full-screen class after capturing
            ref.current.classList.remove("fullscreen-capture");
          });
      }, 100);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your Dashboard" />

        <Box
          display="flex"
          alignItems="center"
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          <Box>
            <IconButton>
              <DownloadOutlinedIcon
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ color: colors.greenAccent[500], fontSize: "26px" }}
              />
            </IconButton>
          </Box>

          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            Report Download
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                "aria-labelledby": "basic-button",
              },
            }}
          >
            <MenuItem
              onClick={() => {
                handleExportToExcel("transaction");
              }}
            >
              Recent Transaction
            </MenuItem>
            <MenuItem onClick={() => handleExportToExcel("champion")}>
              Champion
            </MenuItem>
            <MenuItem onClick={() => handleExportToExcel("sales")}>
              Sales Quantity
            </MenuItem>
            <MenuItem onClick={() => handleExportToExcel("geography")}>
              Geography Based Traffic
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* grid and chart */}

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* {row1} */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <StatBox
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <StatBox
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.5"
            increase="+21%"
            icon={
              <PointOfSaleOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <StatBox
            title="32,441"
            subtitle="new Clients"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddAlt1OutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Inbound"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* row2 */}

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          ref={lineChartRef}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[600]}
              >
                $59,342,32
              </Typography>
            </Box>

            <Box>
              <IconButton
                onClick={() => downloadAsPng(lineChartRef, "line_chart")}
              >
                <DownloadOutlinedIcon
                  sx={{ color: colors.greenAccent[500], fontSize: "26px" }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" ml="-20px">
            <LineChart isDashBoard={true} />
          </Box>
        </Box>
        {/* TRANSACTIONS */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transaction
            </Typography>
            <Box>
              <IconButton onClick={() => handleExportToExcel("transaction")}>
                <DownloadOutlinedIcon
                  sx={{ color: colors.greenAccent[500], fontSize: "26px" }}
                />
              </IconButton>
            </Box>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>
        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="20px"
          ref={progressCircleRef}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Champion
            </Typography>
            <Box>
              <IconButton
                onClick={() =>
                  downloadAsPng(progressCircleRef, "progressCircle_chart")
                }
              >
                <DownloadOutlinedIcon
                  sx={{ color: colors.greenAccent[500], fontSize: "26px" }}
                />
              </IconButton>
            </Box>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          ref={barChartRef}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              color={colors.grey[100]}
              variant="h5"
              fontWeight="600"
              sx={{ p: "30px 30px 0px 30px" }}
            >
              Sales Quantity
            </Typography>

            <IconButton onClick={() => downloadAsPng(barChartRef, "bar_chart")}>
              <DownloadOutlinedIcon
                sx={{
                  color: colors.greenAccent[500],
                  fontSize: "26px",
                  marginTop: "20px",
                }}
              />
            </IconButton>
          </Box>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          ref={geographyChartRef}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              color={colors.grey[100]}
              variant="h5"
              fontWeight="600"
              sx={{ mb: "15px" }}
            >
              Geography Based Traffic
            </Typography>

            <IconButton
              onClick={() =>
                downloadAsPng(geographyChartRef, "geography_chart")
              }
            >
              <DownloadOutlinedIcon
                sx={{
                  color: colors.greenAccent[500],
                  fontSize: "26px",
                  marginBottom: "15px",
                }}
              />
            </IconButton>
          </Box>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
