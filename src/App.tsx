import ConfigContextProvider from "./context/ConfigContextProvider";
import MainView from "./MainView";

function App() {
  return (
    <div>
      <ConfigContextProvider theme="dark" appName="Code Diary">
        <MainView />
      </ConfigContextProvider>
    </div>
  );
}

export default App;
