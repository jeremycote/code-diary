import React, { createContext } from "react";

export type ConfigContextType = {
  appName: string;
  setAppName: (appName: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
};

export const ConfigContext = createContext<ConfigContextType | null>(null);

type ConfigContextProviderProps = {
  children: React.ReactNode;
  theme: string;
  appName: string;
};

type ConfigContextProviderState = {
  theme: string;
  appName: string;
};

class ConfigContextProvider extends React.Component<
  ConfigContextProviderProps,
  ConfigContextProviderState
> {
  constructor(props: ConfigContextProviderProps) {
    super(props);
    this.state = {
      theme: props.theme,
      appName: props.appName,
    };
  }

  setTheme(theme: string) {
    this.setState({ theme: theme });
  }

  setAppName(appName: string) {
    this.setState({ appName: appName });
  }

  render() {
    return (
      <ConfigContext.Provider
        value={{
          appName: this.state.appName,
          setAppName: this.setAppName,
          theme: this.state.theme,
          setTheme: this.setTheme,
        }}
      >
        {this.props.children}
      </ConfigContext.Provider>
    );
  }
}

export default ConfigContextProvider;
