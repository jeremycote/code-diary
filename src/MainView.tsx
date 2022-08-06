import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import EntryViewer from "./components/EntryViewer/EntryViewer";
import LoginCallback from "./components/loginCallback/LoginCallback";
import ResponsiveAppBar from "./components/responsiveAppBar/ResponsiveAppBar";
import {
  ConfigContext,
  ConfigContextType
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
            <CssBaseline enableColorScheme />
            <ResponsiveAppBar />
            <Router>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login/callback" element={<LoginCallback/>} />
                <Route path="/:entryId/*" element={<EntryViewer />} />
                <Route path="*" element={<h1>404 not found</h1>} />
              </Routes>
            </Router>
          </ThemeProvider>
        )}
      </ConfigContext.Consumer>
    );
  }
}
