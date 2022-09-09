import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Router, Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import EntryViewer from './components/EntryViewer/EntryViewer';
import ResponsiveAppBar from './components/diaryAppBar/DiaryAppBar';
import { ConfigContext, ConfigContextType } from './context/ConfigContextProvider';
import ApiContextProvider, { ApiContext } from './context/ApiContextProvider';
import { useContext } from 'react';
import { apiConfiguration } from './services';

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
          <ApiContextProvider apiConfiguration={apiConfiguration}>
            <>
              <ResponsiveAppBar />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/:entryId/*" element={<EntryViewer />} />
                  <Route path="*" element={<h1>404 not found</h1>} />
                </Routes>
              </BrowserRouter>
            </>
          </ApiContextProvider>
        </ThemeProvider>
      )}
    </ConfigContext.Consumer>
  );
}

export default App;
