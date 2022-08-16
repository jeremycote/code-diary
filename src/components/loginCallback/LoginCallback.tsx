import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { apiClient } from '../../services';

function LoginCallback() {
  const params: URLSearchParams = useSearchParams()[0];

  const navigate = useNavigate();

  const code = params.get('code') ?? ""
  const state = params.get('state') ?? ""

  useEffect(() => {
    apiClient.setupClient(code, state).then(success => {
      if (success) {
        console.log("Setup passed. Going home.")
        navigate('/')
      } else {
        console.log("Setup failed")
      }
    })
  }, [apiClient, code, state])


  return (
    <div>
      <p>{code}</p>
      <p>{state}</p>
    </div>
  );
}

export default LoginCallback;
