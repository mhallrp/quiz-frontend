import { useState } from 'react';
import useAuth from '../../Model/useAuth';
import PasswordInput from './PasswordInput';

export default function Register(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);

  const handleRegister = async () => {
    const { data, status } = await register(username, password);
    status
      ? alert('Registration successful:' + data)
      : alert('Registration failed:' + data.error);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error, status } = await login(username, password);
    if (status) {
      props.setIsLoggedIn([true, '']);
      props.setUserData(data.username + ' ' + data.score);
      return;
    }
    alert('Login failed: ' + error);
  };

  return (
    <div>
      <h2 className="font-oswald w-full text-center text-2xl">
        {isRegister ? '🖊️ Create an account' : '🔓 Login to access'}
      </h2>
      <form onSubmit={handleLogin}>
        <div className="flex flex-col items-center">
          <label className="w-full py-4" htmlFor="username">
            Username:
          </label>
          <input
            placeholder="Type your username..."
            className="w-full rounded border p-2 md:w-96"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="w-full py-4" htmlFor="password">
            Password:
          </label>
          <PasswordInput password={password} setPassword={setPassword} />
          {isRegister && (
            <PasswordInput
              confirm={true}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
            />
          )}
          <button
            onClick={
              isRegister
                ? (e) => {
                    e.preventDefault;
                    password !== confirmPassword
                      ? alert('Password mismatch')
                      : handleRegister();
                  }
                : (e) => handleLogin(e)
            }
            className="bg-darkYellow my-4 rounded px-6 py-3"
            type="submit">
            {isRegister ? 'Create account' : 'Login and Play'}
          </button>
        </div>
      </form>
      <div className="bg-grey h-px w-full"></div>
      <p className="pt-4 text-center">
        {isRegister ? 'Already have an account?' : 'Dont have an account?'}{' '}
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="text-mustard font-bold underline">
          {isRegister ? 'Login here' : 'Sign up here'}
        </button>
      </p>
    </div>
  );
}
