import { Button } from "@mui/material";
import { useContext } from "react";
import { ApiContext } from "../../context/ApiContextProvider";

function Login() {

  const api = useContext(ApiContext);

  return (
    <div>
      <h1>Login</h1>
      <Button onClick={api.login}>Login</Button>
    </div>
  );
}

export default Login;
