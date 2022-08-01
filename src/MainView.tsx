import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import Dashboard from "./components/dashboard/Dashboard";
import ResponsiveAppBar from "./components/responsiveAppBar/ResponsiveAppBar";
import {
  ConfigContext,
  ConfigContextType,
} from "./context/ConfigContextProvider";

export default class MainView extends React.Component {
  darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  render() {
    return (
      <ConfigContext.Consumer>
        {(config: ConfigContextType | null) => (
          <ThemeProvider
            theme={config?.theme === "dark" ? this.darkTheme : this.lightTheme}
          >
            <CssBaseline />
            <ResponsiveAppBar />
            <Dashboard />
          </ThemeProvider>
        )}
      </ConfigContext.Consumer>
    );
  }
}
