
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ show, handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});
    setSuccessMessage('');
  };

  const handleLogin = async () => {
    setErrors({});
    setSuccessMessage('');
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) setErrors(data.errors);
        else setErrors({ general: data.message || 'Login failed' });
        return;
      }

      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("user", JSON.stringify(data.user));
      handleClose();
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setErrors({ general: 'Something went wrong. Please try again.' });
    }
  };

  const handleRegister = async () => {
    setErrors({});
    setSuccessMessage('');
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) setErrors(data.errors);
        else setErrors({ general: data.message || 'Registration failed' });
        return;
      }

      setSuccessMessage('Successfully registered! Please log in.');
      setTimeout(() => setSuccessMessage(''), 5000);

      setIsLogin(true);
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setErrors({});
    } catch (err) {
      console.error('Registration error:', err);
      setErrors({ general: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isLogin ? 'Login to Your Account' : 'Create a New Account'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {successMessage && (
          <div className="alert alert-success text-center" role="alert">
            {successMessage}
          </div>
        )}
        <Form>
          {!isLogin && (
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>

          {!isLogin && (
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
            </Form.Group>
          )}

          {errors.general && (
            <div className="text-danger mb-2">{errors.general}</div>
          )}

          <Button
            variant={isLogin ? 'danger' : 'success'}
            onClick={isLogin ? handleLogin : handleRegister}
            className="w-100"
          >
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </Form>
        <div className="mt-3 text-center">
          <Button variant="link" onClick={toggleForm}>
            {isLogin ? 'New here? Create an account' : 'Already have an account? Login'}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
