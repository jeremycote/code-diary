import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import Dashboard from "./components/dashboard/Dashboard";
import ResponsiveAppBar from "./components/responsiveAppBar/ResponsiveAppBar";
import {
  ConfigContext,
  ConfigContextType,
} from "./context/ConfigContextProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EntryViewer from "./components/EntryViewer/EntryViewer";

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
              theme={
                config?.theme === "dark" ? this.darkTheme : this.lightTheme
              }
            >
              <CssBaseline enableColorScheme />
              <ResponsiveAppBar />
              {/* <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/entry/:entryId" element={<EntryViewer />} />
                  <Route path="*" element={<h1>404 not found</h1>} />
                </Routes>
              </BrowserRouter> */}
              <EntryViewer/>
            </ThemeProvider>
          )}
        </ConfigContext.Consumer>
    );
  }
}
