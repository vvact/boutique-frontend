import { useState } from 'react';
import { loginUser, registerUser } from '../services/api';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // 🔁 Toggle state

  const [form, setForm] = useState({
    email: '',
    password: '',
    password2: '', // Only used for signup
  });

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      if (isLogin) {
        const res = await loginUser({ email: form.email, password: form.password });
        dispatch(loginSuccess(res.data.token));
        navigate('/'); // ✅ Redirect after login
      } else {
        if (form.password !== form.password2) {
          setError('Passwords do not match');
          return;
        }
        await registerUser(form);
        setMessage('Account created! You can now log in.');
        setIsLogin(true); // Switch to login after signup
      }
    } catch {
      setError('Something went wrong. Check your credentials.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4 text-center">{isLogin ? 'Login' : 'Sign Up'}</h2>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {!isLogin && (
          <div className="mb-3">
            <input
              type="password"
              name="password2"
              className="form-control"
              placeholder="Confirm Password"
              value={form.password2}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <p className="mt-3 text-center">
        {isLogin ? (
          <>
            Don't have an account?{' '}
            <button className="btn btn-link p-0" onClick={() => setIsLogin(false)}>
              Sign Up
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button className="btn btn-link p-0" onClick={() => setIsLogin(true)}>
              Login
            </button>
          </>
        )}
      </p>
    </div>
  );
}

export default AuthPage;
