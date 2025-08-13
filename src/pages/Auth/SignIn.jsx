import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import './Auth.css';

export default function SignIn() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(''); setBusy(true);
    try {
      const payload = await signIn(formData);
      setUser(payload);
      navigate('/');
    } catch (error) {
      setErr(error.message || 'Failed to sign in.');
    } finally { setBusy(false); }
  };

  return (
    <main className="auth">
      <h1 className="auth__title">Sign In</h1>
      {err && <p className="auth__error" role="alert">{err}</p>}
      <form className="auth__form" onSubmit={handleSubmit} noValidate>
        <label>Username
          <input name="username" value={formData.username} onChange={handleChange} autoComplete="username" required />
        </label>
        <label>Password
          <input name="password" type="password" value={formData.password} onChange={handleChange} autoComplete="current-password" required minLength={4} />
        </label>
        <button className="auth__btn" type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign In'}</button>
        <p className="auth__hint">Don’t have an account? <Link to="/sign-up">Sign Up</Link></p>
      </form>
    </main>
  );
}