import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5001/api/admin/login', {
                email: username,
                password
            });
    
            localStorage.setItem('adminToken', res.data.token);
            navigate('admin');
        } catch (err) {
            alert('Invalid username or password');
        }
    };
    

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <Card style={{ width: '26rem' }} className="shadow">
                <Card.Header className="text-muted">
                    <i className="bi bi-lock-fill me-2"></i>
                    Please enter your login details.
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <InputGroup>
                                <InputGroup.Text><i className="bi bi-person-fill"></i></InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                                <InputGroup.Text><i className="bi bi-lock-fill"></i></InputGroup.Text>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </InputGroup>
                        </Form.Group>

                        <Link to="/forgot-password" className="text-primary">
                            Forgotten Password
                        </Link>

                        <Button type="submit" variant="primary" className="w-100">
                            <i className="bi bi-key-fill me-2"></i>Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}
