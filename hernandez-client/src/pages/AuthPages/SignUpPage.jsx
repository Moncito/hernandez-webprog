import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { createUser } from '../../services/UserService';

const inputClasses =
    'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        age: 18,
        gender: 'other',
        contactNumber: '09123456789',
        username: '',
        address: 'N/A',
        type: 'viewer' // Default to viewer
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const signupData = { ...formData, username: formData.email.split('@')[0] };
            await createUser(signupData);
            navigate('/auth/signin');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed.');
        }
    };

    return (
        <>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Sign Up</h1>
            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
            <p className="mt-3 text-sm leading-6 text-zinc-600">
                Create your account to get started.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label htmlFor="firstName" className="text-sm font-medium text-zinc-700">
                            First Name
                        </label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                            className={inputClasses}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="text-sm font-medium text-zinc-700">
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                            className={inputClasses}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="text-sm font-medium text-zinc-700">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        className={inputClasses}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password" className="text-sm font-medium text-zinc-700">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        className={inputClasses}
                        onChange={handleChange}
                        required
                    />
                </div>

                <Button type="submit" variant="primary" className={actionButtonClassName}>
                    Create Account
                </Button>
            </form>

            <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
                Already have an account?{' '}
                <Link to="/auth/signin" className="font-semibold text-zinc-900 transition hover:text-zinc-600">
                    Log In
                </Link>
            </div>
        </>
    );
};

export default SignUpPage;
