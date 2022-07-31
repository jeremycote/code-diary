import React from "react";
import { FaBars } from "react-icons/fa";

type AppBarProps = {};

type AppBarState = {};

class AppBar extends React.Component<AppBarProps, AppBarState> {
  state: AppBarState = {};

  render() {
    return (
      <div className="container mx-auto bg-gray-200 dark:bg-red-100 rounded-xl shadow border p-8 m-10">
        <FaBars />
      </div>
    );
  }
}

export default AppBar;
