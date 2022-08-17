import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Router, Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import EntryViewer from './components/EntryViewer/EntryViewer';
import LoginCallback from './components/loginCallback/LoginCallback';
import ResponsiveAppBar from './components/diaryAppBar/DiaryAppBar';
import ConfigContextProvider, { ConfigContext, ConfigContextType } from './context/ConfigContextProvider';
import { ApiContext } from './context/ApiContextProvider';
import { useContext } from 'react';
import Login from './components/login/Login';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  });

  const lightTheme = createTheme({
    palette: {
      mode: 'light'
    }
  });

  const api = useContext(ApiContext);

  return (
    <ConfigContext.Consumer>
      {(config: ConfigContextType | null) => (
        <ThemeProvider theme={config?.theme === 'dark' ? darkTheme : lightTheme}>
          <CssBaseline enableColorScheme />
          <ResponsiveAppBar />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/:entryId/*" element={<EntryViewer />} />
              <Route path="*" element={<h1>404 not found</h1>} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      )}
    </ConfigContext.Consumer>
  );
}

export default App;
