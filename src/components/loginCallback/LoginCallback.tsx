import { useSearchParams } from 'react-router-dom';

function LoginCallback() {
  const params = useSearchParams();

  return (
    <div>
      {params.map((k, v) => (
        <div>
        <p>{k.toString()}</p>
        <p>{v.toString()}</p>
        </div>
      ))}
    </div>
  );
}

export default LoginCallback;
