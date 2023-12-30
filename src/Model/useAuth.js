const useAuth = () => {

    const sessionCheck = async () => {
        try {
            const response = await fetch(`https://request.matt-hall.dev/check`, {
                credentials: 'include',
            });
            return response.status
        } catch (networkError) {
            return(500)
        }
    };

    const login = async (username, password) => {
        try {
            const response = await fetch(`https://request.matt-hall.dev/user/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: { username, password } }),
            });
            const data = await response.json();
            console.log("Here's the data: " + data)
            if (!response.ok) {
                const errorMessage = data.errorMessage || 'Login failed for an unknown reason';
                return { data: data, error: errorMessage, status: false };
            }
            return { data: data, status: true };
        } catch (networkError) {
            console.error('Network error:', networkError);
            return { data: null, error: 'Network error occurred', status: false };
        }
    };

    const register = async (username, password) => {
        try {
            const response = await fetch(`https://request.matt-hall.dev/user/register`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: { username, password } }),
            });
            const data = await response.json();
            return { data, status: response.ok };
        } catch (error) {
            console.error('Registration error:', error);
            return { error };
        }
    };

    const logout = async () => {
        try {
            const response = await fetch(`https://request.matt-hall.dev/user/logout`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
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
