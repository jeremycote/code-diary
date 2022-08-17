import { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ApiContext } from '../../context/ApiContextProvider';

function LoginCallback() {
  
  const api = useContext(ApiContext);

  const params: URLSearchParams = useSearchParams()[0];

  const navigate = useNavigate();

  const code = params.get('code') ?? ""
  const state = params.get('state') ?? ""

  useEffect(() => {
    api.setupClient(code, state).then(success => {
      if (success) {
        console.log("Setup passed. Going home.")
        navigate('/')
      } else {
        console.log("Setup failed")
      }
    })
  }, [code, state])


  return (
    <div>
      <p>{code}</p>
      <p>{state}</p>
    </div>
  );
}

export default LoginCallback;
