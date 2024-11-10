import React, { useState } from 'react';
import { Button, Input, Typography, Form, message } from 'antd';
import 'antd/dist/reset.css';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;



const LoginForm = () => {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      // const role='user'
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
  
      const { token, role } = data;
  
      sessionStorage.setItem('token', token);
      
      const handleRedirect = () => {
        navigate('/home'); // Redirects to facial recognition page
      };

      if (role === 'user') {
        navigate('/home');
      } else if (role === 'admin') {
        navigate('/home');
      } else {
        message.error('Unknown role');
      }
    } catch (error) {
      message.error(`Error: ${error.message}`);
    }
  };
  
  const handleRegister = async (values) => {
    console.log('Register values received:', values);
    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
  
      console.log('Register response:', response);
  
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      message.success('Registration successful');
      setActiveTab('login');
    } catch (error) {
      message.error(`Error: ${error.message}`);
    }
  };
  

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(240, 244, 249)' }}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
          <Title level={2} className="text-center mb-6 text-gray-800 font-bold text-3xl">ElectChain</Title>
          
          <div className="flex justify-center mb-6">
            <Button 
              onClick={() => setActiveTab('login')} 
              className={`w-1/2 ${activeTab === 'login' ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-800 border-gray-800'} rounded-none border-2 border-r-0 rounded-l-md`}
            >
              Login
            </Button>
            <Button 
              onClick={() => setActiveTab('register')} 
              className={`w-1/2 ${activeTab === 'register' ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-800 border-gray-800'} rounded-none border-2 rounded-r-md`}
            >
              Register
            </Button>
          </div>

          <Form
            layout="vertical"
            onFinish={activeTab === 'login' ? handleLogin : handleRegister}
          >
            {activeTab === 'register' ? (
              <>
                <div className="flex gap-4">
                  <Form.Item
                    label={<span className="text-gray-700 font-semibold">Address</span>}
                    name="address"
                    rules={[{ required: true, message: 'Please enter your address!' }]}
                    className="w-1/2"
                  >
                    <Input placeholder="Address" className="border-gray-600 rounded-md text-gray-700 bg-gray-200" />
                  </Form.Item>
                  <Form.Item
                    label={<span className="text-gray-700 font-semibold">Name</span>}
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name!' }]}
                    className="w-1/2"
                  >
                    <Input placeholder="Name" className="border-gray-600 rounded-md text-gray-700 bg-gray-200" />
                  </Form.Item>
                </div>

                <div className="flex gap-4">
                  <Form.Item
                    label={<span className="text-gray-700 font-semibold">Age</span>}
                    name="age"
                    rules={[{ required: true, message: 'Please enter your age!' }]}
                    className="w-1/2"
                  >
                    <Input placeholder="Age" className="border-gray-600 rounded-md text-gray-700 bg-gray-200" />
                  </Form.Item>
                  <Form.Item
                    label={<span className="text-gray-700 font-semibold">Gender</span>}
                    name="gender"
                    rules={[{ required: true, message: 'Please enter your gender!' }]}
                    className="w-1/2"
                  >
                    <Input placeholder="Gender" className="border-gray-600 rounded-md text-gray-700 bg-gray-200" />
                  </Form.Item>
                </div>

                <Form.Item
                  label={<span className="text-gray-700 font-semibold">Contact</span>}
                  name="contact"
                  rules={[{ required: true, message: 'Please enter your contact!' }]}
                >
                  <Input placeholder="Contact" className="border-gray-600 rounded-md text-gray-700 bg-gray-200" />
                </Form.Item>

                <div className="flex justify-center mt-4">
                  <Button type="primary" shape="round" size="large" htmlType="submit" className="bg-blue-600 text-white rounded-md font-semibold">
                    Submit
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Form.Item
                  label={<span className="text-gray-700 font-semibold">Ethereum Address</span>}
                  name="address"
                  rules={[{ required: true, message: 'Please enter your Ethereum address!' }]}
                >
                  <Input placeholder="Ethereum Address" className="border-gray-600 rounded-md text-gray-700 bg-gray-200" />
                </Form.Item>
                <Form.Item
                  label={<span className="text-gray-700 font-semibold">Password</span>}
                  name="password"
                  rules={[{ required: true, message: 'Please enter your password!' }]}
                >
                  <Input.Password placeholder="Password" className="border-gray-600 rounded-md text-gray-700 bg-gray-200" />
                </Form.Item>
                <div className="flex justify-center mt-4">
                  <Button type="primary" shape="round" size="large" htmlType="submit" className="bg-blue-600 text-white rounded-md font-semibold">
                    Submit
                  </Button>
                </div>
              </>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
