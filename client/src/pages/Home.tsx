import * as React from "react";
import { Box, Grid, PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import AppAppBar from "../components/AppAppBar";
import getLPTheme from "../utils/getLPTheme";
import Layout from "./Layout";
import LeftNavigation from "../components/LeftNavigtion";
import RightNavigation from "../components/RightNavigation";
import ChartComponent from "../components/ChartComponent";
import DashBoard from "./DashBoard";
import { Outlet } from "react-router-dom";

interface ToggleCustomThemeProps {
  showCustomTheme: Boolean;
  toggleCustomTheme: () => void;
}

export default function LandingPage() {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const LPtheme = createTheme(getLPTheme(mode));

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <Layout mode={mode}>
      <Box
        sx={{
          height: "100dvh",
          display: "grid",
          gridTemplateRows: "auto 1fr",
          alignContent: "flex-start",
          position: { xs: "", md: "fixed" },
          inset: 0,
        }}
      >
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { sm: "auto", md: "minmax(auto, 200px) auto minmax(auto, 200px)" },
            overflow: { xs: "", md: "hidden" },
          }}
        >
          <Box
            sx={{
              display: { xs: "none", md: "initial" },
              borderColor: "divider",
              borderStyle: "solid",
              borderWidth: 0,
              borderRightWidth: 1,
            }}
          >
            <LeftNavigation />
          </Box>
          <Box
            sx={{ display: "grid", gap: 1, overflowY: { xs: "", md: "auto" }, p: 1 }}
            id="scrollComponent"
          >
            <Outlet />
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "initial" },
              borderColor: "divider",
              borderStyle: "solid",
              borderWidth: 0,
              borderLeftWidth: 1,
            }}
          >
            <RightNavigation />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
