const useAuth = () => {

    const login = async (username, password) => {
        try {
            const response = await fetch('https://quiz-backend-production-ae82.up.railway.app/user/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: { username, password } }),
            });
            const data = await response.json();
            if (!response.ok) {
                const errorMessage = data.errorMessage || 'Login failed for an unknown reason';
                return { data: null, error: errorMessage, status: false };
            }
            return { data, status: true };
        } catch (networkError) {
            console.error('Network error:', networkError);
            return { data: null, error: 'Network error occurred', status: false };
        }
    };
    
    const register = async (username, password) => {
        try {
            const response = await fetch('https://quiz-backend-production-ae82.up.railway.app/user/register', {
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
        const response = await fetch('https://quiz-backend-production-ae82.up.railway.app/user/logout', {
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
    return { register, login, logout };
};
export default useAuth;
