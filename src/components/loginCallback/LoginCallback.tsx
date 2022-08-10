import { useSearchParams } from 'react-router-dom';
import { apiClient } from '../../services';

function LoginCallback() {
  const params: URLSearchParams = useSearchParams()[0];

  const code = params.get('code') ?? ""
  const state = params.get('state') ?? ""

  apiClient.setupClient(code, state)

  return (
    <div>
      <p>{code}</p>
      <p>{state}</p>
    </div>
  );
}

export default LoginCallback;
