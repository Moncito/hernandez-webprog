import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../services/UserService';
import Button from '../../components/Button';

const inputClasses =
    'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await loginUser({ email, password });
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('firstName', data.firstName);
            localStorage.setItem('type', data.type);

            if (data.type === 'admin' || data.type === 'editor') {
                navigate('/dashboard');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Login</h1>
            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
            <p className="mt-3 text-sm leading-6 text-zinc-600">
                Welcome back! Please enter your credentials to access your dashboard.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email" className="text-sm font-medium text-zinc-700">
                        Email
                    </label>
                    <input 
                        id="email"
                        type="email" 
                        placeholder="Email Address"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className={inputClasses}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="password" className="text-sm font-medium text-zinc-700">
                        Password
                    </label>
                    <input 
                        id="password"
                        type="password" 
                        placeholder="••••••••"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className={inputClasses}
                        required 
                    />
                </div>
                <Button type="submit" variant="primary" className={actionButtonClassName}>
                    Login
                </Button>
            </form>
            
            <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
                If you do not have an account, register here. {' '}
                <Link to="/auth/signup" className="font-semibold text-zinc-900 transition hover:text-zinc-600">
                    SignUp
                </Link>
            </div>
        </>
    );
}

export default Login;
