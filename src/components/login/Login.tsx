import { Button, Container, Paper } from '@mui/material';
import { useContext } from 'react';
import { ApiContext } from '../../context/ApiContextProvider';
import { sizing } from '@mui/system';

function Login() {
  const api = useContext(ApiContext);

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
      }}
    >
      <Paper
        sx={{
          width: '24em',
          height: '16em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <h1>Welcome to Code Diary</h1>
        <Button onClick={api.login}>Login</Button>
      </Paper>
    </Container>
  );
}

export default Login;
