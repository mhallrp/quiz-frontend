const apiKey = process.env.REACT_APP_APP_API_KEY;

const useAuth = () => {
  const sessionCheck = async () => {
    try {
      const response = await fetch(`https://request.matt-hall.dev/check`, {
        credentials: 'include',
        headers: {
          'X-API-Key': apiKey,
        },
      });
      const data = await response.json();
      return { data: data, status: response.status };
    } catch (networkError) {
      return 500;
    }
  };

  const login = async (username, password) => {
    try {
      const response = await fetch(`https://request.matt-hall.dev/user/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({ user: { username, password } }),
      });
      const data = await response.json();
      if (!response.ok) {
        const errorMessage =
          data.errorMessage || 'Login failed for an unknown reason';
        return { error: errorMessage, status: false };
      }
      return { data: data, status: true };
    } catch (networkError) {
      console.error('Network error:', networkError);
      return { data: null, error: 'Network error occurred', status: false };
    }
  };

  const register = async (username, password) => {
    try {
      const response = await fetch(
        `https://request.matt-hall.dev/user/register`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey,
          },
          body: JSON.stringify({ user: { username, password } }),
        },
      );
      const data = await response.json();
      return { data, status: response.ok };
    } catch (error) {
      console.error('Registration error:', error);
      return { error };
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(
        `https://request.matt-hall.dev/user/logout`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey,
          },
        },
      );
      const data = await response.json();
      return { data, status: response.ok };
    } catch (networkError) {
      console.error('Network error:', networkError);
      return { data: null, error: 'Network error occurred', status: false };
    }
  };

  return { sessionCheck, register, login, logout };
};

export default useAuth;
